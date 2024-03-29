import React, { useCallback, useMemo } from 'react';

// components
import {
  Textarea,
  NumberInput,
  MultiSelect,
  ColorInput,
  TextInput,
  Text,
  Switch,
  Button,
  SimpleGrid,
  Divider,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { Paint, Network, Hash, Calendar } from 'tabler-icons-react';
import { MediaUpload } from './_components';
import { KlaytnIcon } from '@components/ui/Icon';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useItemMutation } from '@api/mutations';
import { useRouter } from 'next/router';

import { PAGE_ENDPOINTS } from '@constants/constant';

import type { UploadRespSchema } from '@api/schema/resp';
import type { ItemBody } from '@api/schema/body';

interface MediaFieldValue extends UploadRespSchema {}

interface FormFieldValues {
  title: string;
  media: MediaFieldValue | null;
  thumbnail: MediaFieldValue | null;
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
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const initialValues: FormFieldValues = useMemo(() => {
    return {
      media: null,
      title: '',
      description: '',
      price: 0,
      tags: [],
      thumbnail: null,
      backgroundColor: '#ffffff',
      externalSite: '',
      rangeDate: [null, null],
      isPublic: false,
    };
  }, []);

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.item),
    initialValues,
  });

  const { mutateAsync, isLoading } = useItemMutation({
    onSuccess: (result) => {
      if (result.dataId) {
        router.replace(PAGE_ENDPOINTS.NFT.ID(result.dataId));
      } else {
        router.replace(PAGE_ENDPOINTS.NFT.ROOT);
      }
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    const { rangeDate } = values;
    const body = {
      title: values.title,
      description: values.description,
      price: values.price,
      beginDate: rangeDate[0] ? rangeDate[0].getTime() : null,
      endDate: rangeDate[1] ? rangeDate[1].getTime() : null,
      fileId: values.media?.id,
      thumbnailUrl: values.thumbnail?.secureUrl,
      isPublic: values.isPublic,
      backgroundColor: values.backgroundColor,
      externalSite: values.externalSite,
      tags: values.tags,
    } as unknown as ItemBody;

    mutateAsync(body);
  };

  const onUploaded = useCallback(
    (data: any) => {
      form.setFieldValue('media', data);
    },
    [form],
  );

  const onUploadRemove = useCallback(() => {
    form.setFieldValue('media', null);
  }, [form]);

  const onThumbnailUploaded = useCallback(
    (data: any) => {
      form.setFieldValue('thumbnail', data);
    },
    [form],
  );

  const onThumbnailRemove = useCallback(() => {
    form.setFieldValue('thumbnail', null);
  }, [form]);

  console.log(form.errors);

  return (
    <>
      <MediaUpload
        media={form.values.media}
        onUploaded={onUploaded}
        onUploadRemove={onUploadRemove}
      />
      <MediaUpload
        title="썸네일"
        description="썸네일을 등록해주세요."
        media={form.values.thumbnail}
        onUploaded={onThumbnailUploaded}
        onUploadRemove={onThumbnailRemove}
      />
      <form
        className="form-area mt-4 space-y-4"
        onSubmit={form.onSubmit(onSubmit)}
      >
        <TextInput
          label="제목"
          id="title"
          required
          placeholder="제목을 입력하세요."
          aria-label="title"
          {...form.getInputProps('title')}
        />

        <TextInput
          label="연관 사이트"
          id="externalSite"
          icon={<Network />}
          placeholder="https://yoursite.io/item/123"
          description="Story는 이 항목의 세부 사항 페이지에 이 URL에 대한 링크를 포함하므로 사용자가 클릭하여 자세히 알아볼 수 있습니다. 자세한 내용은 자신의 웹페이지에 링크할 수 있습니다."
          {...form.getInputProps('externalSite')}
        />

        <Textarea
          label="설명"
          id="description"
          autosize
          minRows={5}
          description="설명은 이미지 아래 항목의 세부 정보 페이지에 포함됩니다."
          placeholder="설명은 이미지 아래 항목의 세부 정보 페이지에 포함됩니다."
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
            description="컬러 코드(6자리 HEX값)를 직접 입력할 수 있습니다."
            icon={<Paint size={16} />}
            {...form.getInputProps('backgroundColor')}
          />
        </SimpleGrid>

        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          <NumberInput
            required
            label="가격"
            hideControls
            icon={<KlaytnIcon className="w-4 h-4 fill-current" />}
            description="실제 사용자에게 판매되는 가격입니다."
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            {...form.getInputProps('price')}
            formatter={(value: any) =>
              Number.isNaN(parseFloat(value))
                ? ''
                : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />

          <DateRangePicker
            locale="ko"
            label="판매기간"
            required
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
        <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
          <Button className="flex-1" type="submit" loading={isLoading}>
            등록하기
          </Button>
        </div>
      </form>
    </>
  );
};

export default NFTsForm;
