import React, { useMemo } from 'react';

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
import { DateRangePicker } from '@mantine/dates';
import { Paint, Upload, Network, X, Hash, Calendar } from 'tabler-icons-react';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useItemMediaWorker } from '@hooks/useItemMediaWorker';

// enum
// import { StoryUploadTypeEnum } from '@api/schema/enum';
import { KlaytnIcon } from '@components/ui/Icon';
import type { UploadRespSchema } from '@api/schema/resp';

interface MediaFieldValue extends UploadRespSchema {}

interface FormFieldValues {
  title: string;
  media: MediaFieldValue | null;
  externalSite: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  price: number;
  rangeDate: [Date | null, Date | null];
  isPublic: boolean;
}

// browser env
const NFTsForm = () => {
  const theme = useMantineTheme();
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
      price: 0,
    };
  }, []);

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.item),
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
      mediaId: values.media?.id,
    };
    console.log('body', body);
  };

  const { isLoading, onUpload } = useItemMediaWorker({
    onSuccess: (data) => form.setFieldValue('media', data),
  });

  console.log('form.values', form.values.media);

  // {"result":{"id":2,"publicId":"media/1/nft/image/2022_9_17/s3pqipbu3sfdg5bmujvm","secureUrl":"https://res.cloudinary.com/planeshare/image/upload/v1663410100/media/1/nft/image/2022_9_17/s3pqipbu3sfdg5bmujvm.jpg","mediaType":"IMAGE"},"resultCode":0,"message":null,"error":null}

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
          onDrop={onUpload}
          multiple={false}
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

export default NFTsForm;
