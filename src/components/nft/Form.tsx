import React, { useCallback, useMemo } from 'react';

// components
import {
  Textarea,
  NumberInput,
  MultiSelect,
  ColorInput,
  TextInput,
  Switch,
  InputWrapper,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { DateRangePicker } from '@mantine/dates';
import { Paint } from 'tabler-icons-react';
import { Button } from '@components/ui/Button';
import { DropzoneChildren } from './_internal';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useImageAtom } from '@atoms/editorAtom';
import { useUploadMutation } from '@api/mutations';

// utils
import { isEmpty } from '@utils/assertion';

// enum
import { StoryUploadTypeEnum } from '@api/schema/enum';

// types
import type { StoryInput } from '@api/schema/story-api';

const Form = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [image, setImage] = useImageAtom();

  const initialValues: StoryInput = useMemo(() => {
    return {
      title: '',
      description: '',
      tags: [],
      media: null,
      backgroundColor: '#ffffff',
      externalSite: '',
      rangeDate: [],
      isPublic: false,
      price: '',
    };
  }, []);

  const form = useForm<StoryInput>({
    schema: yupResolver(schema.story),
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
      mediaId: image?.idx,
    };
    console.log('body', body);
  };

  const { mutateAsync, isLoading } = useUploadMutation({
    onSuccess: (data) => {
      setImage({
        idx: data.id,
        name: data.name,
        contentUrl: data.path,
      });
    },
  });

  const onUploadStart = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file || isEmpty(file)) return;

      await mutateAsync({
        file,
        storyType: StoryUploadTypeEnum.STORY,
      });
    },
    [mutateAsync],
  );

  return (
    <>
      <InputWrapper
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
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          {(status) => DropzoneChildren(status, theme)}
        </Dropzone>
      </InputWrapper>
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
          onCreate={(query) => {
            form.setFieldValue('tags', [...form.values.tags, query]);
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

        <InputWrapper
          required
          classNames={{
            label: 'font-bold',
          }}
          label="공개여부"
          description="발행시 화면에 공개할지 안할지 선택해주세요."
        >
          <Switch size="lg" {...form.getInputProps('isPublic')} />
        </InputWrapper>
        <Button type="submit" text="등록하기" />
      </form>
    </>
  );
};

export default Form;
