import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

// components
import {
  Group,
  Textarea,
  ActionIcon,
  Space,
  MultiSelect,
  ColorInput,
  InputWrapper,
  Input,
  Switch,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { CloudUpload, Paint, Tags, X } from 'tabler-icons-react';
import { Button } from '@components/ui/Button';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useModuleContext } from '@components/nft/context/context';

// types
import type { StoryInput } from '@api/schema/story-api';

const UploadModal = dynamic(() => import('@components/ui/Modal/UploadModal'), {
  ssr: false,
});

const NftForm = () => {
  const { editor, setVisibleTags, setVisibleUpload } = useModuleContext();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const initialValues: StoryInput = useMemo(() => {
    return {
      title: '',
      description: '',
      backgroundColor: '#ffffff',
      externalSite: undefined,
      rangeDate: [],
      isPublic: false,
      price: '',
    };
  }, []);

  const form = useForm<StoryInput>({
    schema: yupResolver(schema.story),
    initialValues,
  });

  const onClickForOpenTags = () => {
    setVisibleTags(!editor.tags);
  };

  const onClickForCloseTags = () => {
    setVisibleTags(false);
  };

  const onClickForOpenUpload = () => {
    setVisibleUpload(true);
  };

  const onClickForCloseUpload = () => {
    setVisibleUpload(false);
  };

  const onSubmit = async (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <>
      <div className="container grid grid-cols-12 mx-auto 2xl:grid-cols-10 2xl:px-5 h-full">
        <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
          <div className="w-full pt-5">
            <form
              className="form-area h-full"
              onSubmit={form.onSubmit(onSubmit)}
            >
              <div className="px-4">
                <Group className="mb-10" grow={isMobile}>
                  <Button
                    leftIcon={<CloudUpload />}
                    onClick={onClickForOpenUpload}
                    text="파일 업로드"
                  />
                  <Button
                    onClick={onClickForOpenTags}
                    leftIcon={<Tags />}
                    text="태그 추가"
                  />
                </Group>
                <div className="relative mb-4 mt-5">
                  <InputWrapper id="title" required label="제목">
                    <Textarea
                      id="title"
                      autosize={true}
                      spellCheck="false"
                      aria-label="title"
                      className="w-full mt-2 mb-5"
                      maxRows={7}
                      {...form.getInputProps('title')}
                    />
                  </InputWrapper>
                </div>
                {editor.tags && (
                  <div className="relative mb-4 mt-5">
                    <InputWrapper id="tags" required label="태그">
                      <MultiSelect
                        id="tags"
                        data={[
                          'React',
                          'Angular',
                          'Svelte',
                          'Vue',
                          'Riot',
                          'Next.js',
                          'Blitz.js',
                        ]}
                        className="w-full"
                        placeholder="태그 (옵션)"
                        searchable
                        size="md"
                        limit={5}
                        nothingFound="Nothing found"
                        withinPortal
                        rightSection={
                          <ActionIcon
                            className="px-2 text-xl"
                            onClick={onClickForCloseTags}
                          >
                            <X size={30} />
                          </ActionIcon>
                        }
                      />
                    </InputWrapper>
                  </div>
                )}
                <InputWrapper id="description" required label="NFT 설명">
                  <Textarea
                    id="description"
                    autosize={true}
                    maxRows={7}
                    spellCheck="false"
                    {...form.getInputProps('description')}
                  />
                </InputWrapper>
                <Space h="md" />
                <InputWrapper
                  id="backgroundColor"
                  label="배경색"
                  description="NFT 배경색을 선택해주세요. 아래 컬러칩을 눌러 색을 지정하거나, 컬러 코드(6자리 HEX값)를 직접 입력할 수 있습니다."
                >
                  <ColorInput
                    icon={<Paint size={16} />}
                    {...form.getInputProps('backgroundColor')}
                  />
                </InputWrapper>
                <Space h="md" />
                <InputWrapper required label="판매기간">
                  <DateRangePicker
                    locale="ko"
                    dropdownType={isMobile ? 'modal' : 'popover'}
                    {...form.getInputProps('rangeDate')}
                  />
                </InputWrapper>
                <Space h="md" />
                <InputWrapper id="price" label="판매가격" required>
                  <Input id="price" {...form.getInputProps('price')} />
                </InputWrapper>
                <Space h="md" />
                <InputWrapper
                  id="externalSite"
                  label="연관 사이트"
                  description="연관 사이트를 입력해주세여. Story 또는 다른 관련 마켓을 적을 수 있습니다."
                >
                  <Input
                    id="externalSite"
                    {...form.getInputProps('externalSite')}
                  />
                </InputWrapper>
                <Space h="md" />
                <InputWrapper id="private" label="공개여부">
                  <Switch size="lg" {...form.getInputProps('isPublic')} />
                </InputWrapper>
                <Space h="xl" />
              </div>
              <Group
                position="right"
                className="p-5"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                })}
              >
                <Button type="submit" text="등록하기" />
              </Group>
            </form>
          </div>
        </div>
      </div>

      {/* <Group
        position="right"
        className="p-5"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        })}
      >
        <Button type="button" text="등록하기" onClick={onClickForSubmit} />
      </Group> */}

      <UploadModal opened={editor.upload} onClose={onClickForCloseUpload} />
    </>
  );
};

export default NftForm;
