import React from 'react';

// components
import {
  Button,
  Group,
  Textarea,
  ActionIcon,
  MultiSelect,
} from '@mantine/core';
import { CloudUpload, Typography, Tags, X } from 'tabler-icons-react';

// hooks
import { useClientContext } from '@components/nft/context/client';

const NftForm = () => {
  const { editor, setVisibleSubTitle, setVisibleTags } = useClientContext();

  const onClickForOpenSubTitle = () => {
    setVisibleSubTitle(true);
  };

  const onClickForCloseSubTitle = () => {
    setVisibleSubTitle(false);
  };

  const onClickForOpenTags = () => {
    setVisibleTags(true);
  };

  const onClickForCloseTags = () => {
    setVisibleTags(false);
  };

  return (
    <>
      <div className="container grid grid-cols-12 px-2 mx-auto 2xl:grid-cols-10 2xl:px-5">
        <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
          <div className="w-full px-4 pt-5">
            <div className="form-area">
              <Group className="mb-10 px-4">
                <Button
                  leftIcon={<CloudUpload />}
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : 'white',

                    color:
                      theme.colorScheme === 'dark'
                        ? 'white'
                        : theme.colors.dark[9],
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.primaryColor
                          : theme.colors.gray[1],
                    },
                  })}
                >
                  파일 업로드
                </Button>
                <Button
                  leftIcon={<Typography />}
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : 'white',

                    color:
                      theme.colorScheme === 'dark'
                        ? 'white'
                        : theme.colors.dark[9],
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.primaryColor
                          : theme.colors.gray[1],
                    },
                  })}
                  onClick={onClickForOpenSubTitle}
                >
                  부제 추가
                </Button>
                <Button
                  onClick={onClickForOpenTags}
                  leftIcon={<Tags />}
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : 'white',

                    color:
                      theme.colorScheme === 'dark'
                        ? 'white'
                        : theme.colors.dark[9],
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.primaryColor
                          : theme.colors.gray[1],
                    },
                  })}
                >
                  태그 추가
                </Button>
              </Group>
              <div>
                <Textarea
                  placeholder="제목"
                  size="xl"
                  autosize={true}
                  spellCheck="false"
                  aria-label="title"
                  className="w-full px-4 mt-2 mb-5"
                  maxRows={7}
                  styles={{
                    input: {
                      border: 'none',
                    },
                  }}
                />
              </div>
              {editor.subTitle && (
                <div className="relative mb-4 mt-5">
                  <Textarea
                    placeholder="부제 (옵션)"
                    size="md"
                    spellCheck="false"
                    aria-label="subtitle"
                    className="w-full px-4 text-2xl font-medium leading-snug"
                    maxRows={3}
                    styles={{
                      input: {
                        border: 'none',
                      },
                    }}
                  />
                  <ActionIcon
                    className="absolute top-1 right-5 px-2 text-xl"
                    onClick={onClickForCloseSubTitle}
                  >
                    <X size={30} />
                  </ActionIcon>
                </div>
              )}
              {editor.tags && (
                <div className="relative mb-4 mt-5">
                  <MultiSelect
                    data={[
                      'React',
                      'Angular',
                      'Svelte',
                      'Vue',
                      'Riot',
                      'Next.js',
                      'Blitz.js',
                    ]}
                    className="w-full px-4"
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
                    styles={{
                      input: {
                        border: 'none',
                      },
                    }}
                  />
                </div>
              )}
              <div className="px-4">NftForm</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftForm;
