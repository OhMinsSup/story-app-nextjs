import React, { useState } from 'react';
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
import { CloudUpload, Tags, X } from 'tabler-icons-react';
import { Button } from '@components/ui/Button';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useModuleContext } from '@components/nft/context/context';

const UploadModal = dynamic(() => import('@components/ui/Modal/UploadModal'), {
  ssr: false,
});

const NftForm = () => {
  const { editor, setVisibleTags, setVisibleUpload } = useModuleContext();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [value, setValue] = useState('');

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

  return (
    <>
      <div className="container grid grid-cols-12 px-4 mx-auto 2xl:grid-cols-10 2xl:px-5">
        <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
          <div className="w-full pt-5">
            <form className="form-area h-full">
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
                    placeholder="제목"
                    id="title"
                    size="lg"
                    autosize={true}
                    spellCheck="false"
                    aria-label="title"
                    className="w-full mt-2 mb-5"
                    maxRows={7}
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
              {/* <div className="md:px-4"> */}
              <InputWrapper
                id="description"
                required
                label="NFT 설명"
                description="Please enter your credit card information, we need some money"
                error="Your credit card expired"
              >
                <Textarea
                  id="description"
                  autosize={true}
                  maxRows={7}
                  spellCheck="false"
                />
              </InputWrapper>
              <Space h="md" />
              <InputWrapper
                id="backgroundColor"
                label="배경색"
                description="Please enter your credit card information, we need some money"
                error="Your credit card expired"
              >
                <ColorInput
                  id="backgroundColor"
                  value={value}
                  onChange={setValue}
                />
              </InputWrapper>

              <Space h="md" />
              <InputWrapper
                id="externalUrl"
                label="연관 사이트"
                description="Please enter your credit card information, we need some money"
                error="Your credit card expired"
              >
                <Input id="externalUrl" />
              </InputWrapper>
              <Space h="md" />
              <InputWrapper
                required
                label="판매기간"
                description="Please enter your credit card information, we need some money"
                error="Your credit card expired"
              >
                <DateRangePicker
                  locale="ko"
                  dropdownType={isMobile ? 'modal' : 'popover'}
                  value={[new Date(2021, 11, 1), new Date(2021, 11, 5)]}
                />
              </InputWrapper>
              <Space h="md" />
              <InputWrapper
                id="price"
                label="판매가격"
                description="Please enter your credit card information, we need some money"
                error="Your credit card expired"
              >
                <Input id="price" />
              </InputWrapper>
              <Space h="md" />
              <InputWrapper id="private" label="공개여부">
                <Switch size="lg" />
              </InputWrapper>
              <Space h="xl" />
              {/* </div> */}
            </form>
          </div>
        </div>
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
        <Button text="등록하기" />
        <Button text="등록하기" />
      </Group>

      <UploadModal opened={editor.upload} onClose={onClickForCloseUpload} />
    </>
  );
};

export default NftForm;
