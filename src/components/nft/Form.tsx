import React, { useCallback, useMemo, useState } from 'react';

// components
import {
  Textarea,
  NumberInput,
  MultiSelect,
  ColorInput,
  TextInput,
  Text,
  Switch,
  Input,
  useMantineTheme,
  Group,
  Button,
  SimpleGrid,
  Divider,
  Image,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { openModal, closeAllModals } from '@mantine/modals';
import { DateRangePicker } from '@mantine/dates';
import { Paint, Upload, Network, X, Hash, Calendar } from 'tabler-icons-react';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useUploadMutation } from '@api/mutations';
import { useWorker } from '@koale/useworker';

// utils
import { isEmpty } from '@utils/assertion';
import parseByBytes from 'magic-bytes.js';

// types
import type { mp4box } from 'global';

// enum
import { StoryUploadTypeEnum } from '@api/schema/enum';
import { KlaytnIcon } from '@components/ui/Icon';

interface MediaFieldValue {
  idx: number;
  name?: string;
  contentUrl: string;
}

interface FormFieldValues {
  title: string;
  media: MediaFieldValue | null;
  externalSite: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  price: number;
  supply: number;
  rangeDate: [Date | null, Date | null];
  isPublic: boolean;
}

function getmimeFn(file: File) {
  return new Promise<string | null>((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      if (!e.target) return resolve(null);
      const bytes = new Uint8Array(e.target.result as ArrayBuffer);
      // https://en.wikipedia.org/wiki/List_of_file_signatures.
      // https://github.com/sindresorhus/file-type
      // https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
      // https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
      const result = parseByBytes(bytes);
      const guessedFile = result[0];
      if (!guessedFile) return resolve(null);
      if (!guessedFile.mime) return resolve(null);
      resolve(guessedFile.mime);
    };
    fileReader.onerror = () => {
      return resolve(null);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

// web worker env
const webcodecsFn = (blob: File) => {
  return new Promise<mp4box.MP4Info>((resolve, reject) => {
    const objectURL = URL.createObjectURL(blob);
    self.fetch(objectURL).then((resp) => {
      const file = self.MP4Box.createFile();
      file.onError = (e: unknown) => {
        URL.revokeObjectURL(objectURL);
        return reject(e);
      };

      file.onReady = (info: any) => {
        URL.revokeObjectURL(objectURL);
        return resolve(info);
      };

      const reader = resp.body?.getReader();
      let offset = 0;
      // eslint-disable-next-line prefer-const
      let mp4File = file;

      function appendBuffers({ done, value }: Record<string, any>): any {
        if (done) {
          mp4File.flush();
          return;
        }

        // eslint-disable-next-line prefer-const
        let buf = value.buffer;
        buf.fileStart = offset;

        offset += buf.byteLength;

        mp4File.appendBuffer(buf);

        return reader?.read().then(appendBuffers);
      }

      reader?.read().then(appendBuffers);
    });
  });
};

// browser env
const Form = () => {
  const theme = useMantineTheme();
  const [isUploading, setUploading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const initialValues: FormFieldValues = useMemo(() => {
    return {
      title: '',
      description: '',
      tags: [],
      media: null,
      backgroundColor: '#ffffff',
      externalSite: '',
      rangeDate: [null, null],
      isPublic: false,
      supply: 1,
      price: 0,
    };
  }, []);

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.story),
    initialValues,
  });

  const onSubmit = async (values: typeof form.values) => {
    const { rangeDate } = values;
    const body = {
      title: values.title,
      description: values.description,
      backgroundColor: values.backgroundColor,
      externalSite: values.externalSite,
      isPublic: values.isPublic,
      price: values.price,
      beginDate: rangeDate[0] ? rangeDate[0].getTime() : null,
      endDate: rangeDate[1] ? rangeDate[1].getTime() : null,
      tags: values.tags,
      mediaId: values.media?.idx,
    };
    console.log('body', body);
  };

  const { mutateAsync, isLoading } = useUploadMutation({
    onSuccess: (data) => {
      form.setFieldValue('media', {
        idx: data.id,
        name: data.name,
        contentUrl: data.path,
      });
    },
  });

  const [worker] = useWorker(webcodecsFn, {
    autoTerminate: true,
    remoteDependencies: [
      'https://cdn.jsdelivr.net/npm/mp4box@0.5.2/dist/mp4box.all.min.js',
    ],
  });

  const openUploadErrorModal = useCallback(
    (message: string) =>
      openModal({
        title: '업로드 에러',
        centered: true,
        children: (
          <>
            <Text size="sm">{message}</Text>
            <Button
              onClick={() => closeAllModals()}
              mt="md"
              className="float-right"
            >
              확인
            </Button>
          </>
        ),
      }),
    [],
  );

  const onUploadStart = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file || isEmpty(file)) return;
      setUploading(true);
      const mimeType = await getmimeFn(file);
      if (!mimeType) {
        return openUploadErrorModal(
          '올바른 업로드 형식의 파일을 등록해주세요.',
        );
      }

      const body = {
        file,
        storyType: StoryUploadTypeEnum.STORY,
      };

      if (mimeType.includes('image')) {
        await mutateAsync(body);
      } else if (mimeType.includes('video') || mimeType.includes('audio')) {
        // https://caniuse.com/mdn-api_mediasource_istypesupported
        // https://developer.mozilla.org/ko/docs/Web/Media/Formats/Video_codecs
        // https://developer.mozilla.org/ko/docs/Web/Media/Formats/codecs_parameter
        const webcodecs = await worker(file);
        const tracks = webcodecs.tracks
          .filter((t) => ['video', 'audio'].includes(t.type))
          .map((t) => ({
            type: t.type,
            codec: t.codec,
          }));
        // 'video/mp4; codecs="avc1.4d400c,mp4a.40.2,mp4a.40.2"'
        const mimeCodec = `${file.type}; codecs="${tracks
          .map((t) => t.codec)
          .join(',')}"`;
        if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
          console.log('supported MIME type or codec:', mimeCodec);
          await mutateAsync(body);
        } else {
          console.error('Unsupported MIME type or codec: ', mimeCodec);
          return openUploadErrorModal(
            '브라우저에서 지원하지 않는 코덱 형식입니다.',
          );
        }
      } else {
        return openUploadErrorModal(
          '올바른 업로드 형식의 파일을 등록해주세요.',
        );
      }
    },
    [mutateAsync, openUploadErrorModal, worker],
  );

  return (
    <>
      <Input.Wrapper
        required
        classNames={{
          root: 'w-full md:w-96 max-h-96',
          label: 'font-bold',
        }}
        label="Image, Video, Audio, or 3D Model"
        description={`File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                  GLB, GLTF. Max size: 20 MB`}
      >
        <Dropzone
          className="w-full h-80 flex justify-center items-center"
          loading={isLoading}
          onDrop={onUploadStart}
          multiple={false}
          onReject={(files) => {
            console.log('rejected files', files);
            setUploading(false);
          }}
          maxFiles={1}
          maxSize={1 * 1024 ** 2}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: 'none' }}
          >
            <Dropzone.Reject>
              <X
                size={50}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Upload
                size={50}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === 'dark' ? 4 : 6
                  ]
                }
              />
            </Dropzone.Idle>
            <Dropzone.Accept>
              <Image
                src={
                  'https://velog.velcdn.com/images/taehyunkim/post/567e29e1-7442-4dc8-9b5e-32a2bfd13737/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-12-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.52.12.png'
                }
              />
            </Dropzone.Accept>
          </Group>
        </Dropzone>
      </Input.Wrapper>
      <form
        className="form-area mt-4 space-y-4"
        onSubmit={form.onSubmit(onSubmit)}
      >
        <TextInput
          id="title"
          required
          label="제목"
          classNames={{
            label: 'font-bold',
          }}
          placeholder="Item name"
          spellCheck="false"
          aria-label="title"
          {...form.getInputProps('title')}
        />

        <TextInput
          label="연관 사이트"
          id="externalSite"
          classNames={{
            label: 'font-bold',
          }}
          icon={<Network />}
          placeholder="https://yoursite.io/item/123"
          description="Story는 이 항목의 세부 사항 페이지에 이 URL에 대한 링크를 포함하므로 사용자가 클릭하여 자세히 알아볼 수 있습니다. 자세한 내용은 자신의 웹페이지에 링크할 수 있습니다."
          {...form.getInputProps('externalSite')}
        />

        <Textarea
          label="설명"
          id="description"
          autosize
          classNames={{
            label: 'font-bold',
          }}
          minRows={5}
          description="설명은 이미지 아래 항목의 세부 정보 페이지에 포함됩니다."
          placeholder="Provide a detailed description of your item."
          spellCheck="false"
          {...form.getInputProps('description')}
        />

        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          <MultiSelect
            id="tags"
            label="태그"
            description="NFT에 연관된 키워드를 등록해주세요."
            data={form.values.tags}
            placeholder="태그 (옵션)"
            searchable
            icon={<Hash size={16} />}
            limit={5}
            classNames={{ label: 'font-bold' }}
            nothingFound="Nothing found"
            withinPortal
            creatable
            error={form.errors.tags}
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              form.setFieldValue('tags', [...form.values.tags, query]);
              return item;
            }}
          />

          <ColorInput
            label="배경색"
            classNames={{
              label: 'font-bold',
            }}
            description="컬러 코드(6자리 HEX값)를 직접 입력할 수 있습니다."
            icon={<Paint size={16} />}
            {...form.getInputProps('backgroundColor')}
          />
        </SimpleGrid>

        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          <NumberInput
            label="가격"
            required
            hideControls
            icon={<KlaytnIcon className="w-4 h-4 fill-current" />}
            description="실제 사용자에게 판매되는 가격입니다."
            classNames={{
              label: 'font-bold',
            }}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            {...form.getInputProps('price')}
            formatter={(value: any) =>
              Number.isNaN(parseFloat(value))
                ? ''
                : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />

          <NumberInput
            label="발행수"
            required
            hideControls
            description="발행할 수 있는 항목의 수입니다."
            classNames={{
              label: 'font-bold',
            }}
            {...form.getInputProps('supply')}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value: any) =>
              Number.isNaN(parseFloat(value))
                ? ''
                : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />

          <DateRangePicker
            locale="ko"
            required
            label="판매기간"
            icon={<Calendar size={16} />}
            description="NFT가 판매되는 기간입니다."
            classNames={{
              label: 'font-bold',
            }}
            dropdownType={isMobile ? 'modal' : 'popover'}
            {...form.getInputProps('rangeDate')}
          />
        </SimpleGrid>

        <Divider />

        <div
          className={`MySwitch flex fle justify-between items-center space-x-2`}
        >
          <div>
            <Text>공개여부</Text>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs m-0">
              발행시 화면에 공개할지 안할지 선택해주세요.
            </p>
          </div>
          <Switch size="lg" {...form.getInputProps('isPublic')} />
        </div>

        <Button className="float-right top-[-5px]" type="submit">
          등록하기
        </Button>
      </form>
    </>
  );
};

export default Form;
