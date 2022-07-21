import React, { useCallback } from 'react';

// components
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Modal, Drawer, Container, Divider, Space } from '@mantine/core';
import { FileImage, DropzoneChildren } from './_internal';

// hooks
import { useSetAtom, useAtomValue } from 'jotai';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useUploadMutation } from '@api/mutations';
import { imageAtom, editorAtom } from '@atoms/editorAtom';

// utils
import { isEmpty } from '@utils/assertion';

// enum
import { StoryUploadTypeEnum } from '@api/schema/enum';

// types
import { useFileListQuery } from '@api/queries';

interface UploadModalProps {
  onClose: (...args: any[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = (props) => {
  const theme = useMantineTheme();
  const editor = useAtomValue(editorAtom);
  const isMobile = useMediaQuery('(max-width: 768px)', false);
  const setImage = useSetAtom(imageAtom);

  const { list, refetch } = useFileListQuery({
    enabled: editor.upload,
  });

  const { mutateAsync } = useUploadMutation({
    onSuccess: async (data) => {
      setImage({
        idx: data.id,
        name: data.name,
        contentUrl: data.path,
      });
      refetch();
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

  const onClose = useCallback(() => {
    props.onClose();
  }, [props]);

  const Wapper = isMobile ? Drawer : Modal;

  return (
    <Wapper
      opened={editor.upload}
      onClose={onClose}
      {...(isMobile
        ? {
            position: 'bottom',
            size: '100%',
          }
        : {
            size: 'lg',
            centered: true,
            overlayColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            overlayOpacity: 0.95,
          })}
    >
      <Container>
        <Dropzone
          onDrop={onUploadStart}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          {(status) => DropzoneChildren(status, theme)}
        </Dropzone>
        <Space h="md" />
        {!isEmpty(list) && <Divider />}
      </Container>
      {isEmpty(list) || !list ? null : (
        <div className="flex flex-row flex-wrap items-center justify-center px-1 pb-4 mt-4 overflow-auto h-72">
          {list.map((item) => (
            <FileImage item={item} key={`uploaded-image-key-${item.id}`} />
          ))}
        </div>
      )}
    </Wapper>
  );
};

export default UploadModal;
