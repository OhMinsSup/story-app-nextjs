import React, { useCallback, useMemo, useState } from 'react';

// components
import {
  Textarea,
  NumberInput,
  MultiSelect,
  ColorInput,
  TextInput,
  Switch,
  Input,
  useMantineTheme,
  Loader,
  Center,
  Group,
  Text,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { DateRangePicker } from '@mantine/dates';
import { Paint, Upload, Photo, X } from 'tabler-icons-react';
import { Button } from '@components/ui/Button';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useUploadMutation } from '@api/mutations';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

// utils
import { isEmpty } from '@utils/assertion';
import parseByBytes from 'magic-bytes.js';

import type { mp4box } from 'global';
import { StoryUploadTypeEnum } from '@api/schema/enum';

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
  rangeDate: Date[];
  isPublic: boolean;
}

function getReader(file: File) {
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
      rangeDate: [],
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
    const body = {
      title: values.title,
      description: values.description,
      backgroundColor: values.backgroundColor,
      externalSite: values.externalSite,
      isPublic: values.isPublic,
      price: values.price,
      beginDate: values.rangeDate[0].getTime(),
      endDate: values.rangeDate[1].getTime(),
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

  const [worker, { status: status, kill: killWorker }] = useWorker(
    webcodecsFn,
    {
      autoTerminate: true,
      remoteDependencies: ['http://localhost:3000/js/mp4box.all.min.js'],
    },
  );

  const onUploadStart = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file || isEmpty(file)) return;
      setUploading(true);
      const mimeType = await getReader(file);
      if (!mimeType) {
        throw new Error('file mime type is empty');
      }

      if (mimeType.includes('image')) {
        await mutateAsync({
          file,
          storyType: StoryUploadTypeEnum.STORY,
        });
      } else if (mimeType.includes('video')) {
        const webcodecs = await worker(file);
        const codecs = webcodecs.tracks.map((t) => t.codec);
        // https://developer.mozilla.org/ko/docs/Web/Media/Formats/Video_codecs
        console.log(codecs); // AV1, HEVC (H.265), AVC (H.264), VP9, MPEG-2, MP4V-ES
      }
    },
    [mutateAsync, worker],
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
          className="w-full h-80"
          loading={isLoading}
          onDrop={onUploadStart}
          multiple={false}
          // disabled
          onReject={(files) => {
            console.log('rejected files', files);
            setUploading(false);
          }}
          maxSize={20 * 1024 ** 2}
          accept={[MIME_TYPES.mp4, ...IMAGE_MIME_TYPE]}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <Upload
                size={50}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === 'dark' ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X
                size={50}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Photo size={50} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
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
          minRows={7}
          description="설명은 이미지 아래 항목의 세부 정보 페이지에 포함됩니다."
          placeholder="Provide a detailed description of your item."
          spellCheck="false"
          {...form.getInputProps('description')}
        />

        <MultiSelect
          id="tags"
          label="태그"
          description="NFT에 연관된 키워드를 등록해주세요."
          data={form.values.tags}
          placeholder="태그 (옵션)"
          searchable
          limit={5}
          classNames={{ label: 'font-bold' }}
          nothingFound="Nothing found"
          withinPortal
          creatable
          error={form.errors.tags}
          getCreateLabel={(query) => `+ Create ${query}`}
          // onCreate={(query) => {
          //   form.setFieldValue('tags', [...form.values.tags, query]);
          // }}
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

        <NumberInput
          label="가격"
          required
          hideControls
          description="실제 사용자에게 판매되는 가격입니다. 신중하게 입력해주세요!"
          classNames={{
            label: 'font-bold',
          }}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          {...form.getInputProps('price')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ''
          }
        />

        <NumberInput
          label="Supply"
          hideControls
          description="발행할 수 있는 항목의 수입니다. 가스 비용이 들지 않습니다!"
          classNames={{
            label: 'font-bold',
          }}
          {...form.getInputProps('supply')}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ''
          }
        />

        <DateRangePicker
          locale="ko"
          required
          label="판매기간"
          classNames={{
            label: 'font-bold',
          }}
          dropdownType={isMobile ? 'modal' : 'popover'}
          {...form.getInputProps('rangeDate')}
        />

        <Input.Wrapper
          required
          classNames={{
            label: 'font-bold',
          }}
          label="공개여부"
          description="발행시 화면에 공개할지 안할지 선택해주세요."
        >
          <Switch size="lg" {...form.getInputProps('isPublic')} />
        </Input.Wrapper>
        <Button
          className="float-right top-[-10px]"
          type="submit"
          text="등록하기"
        />
      </form>
    </>
  );
};

export default Form;
