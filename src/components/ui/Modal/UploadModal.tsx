import React from 'react';

// components
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import {
  Group,
  Modal,
  Container,
  Text,
  Divider,
  Space,
  Image,
} from '@mantine/core';

// hooks
import { useMantineTheme } from '@mantine/core';

// types
import type { MantineTheme } from '@mantine/core';
import type { DropzoneStatus } from '@mantine/dropzone';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />
    <div>
      <Text size="xl" inline>
        Story에 추가 할 NFT를 드래그하거나 클릭하여 파일 선택
      </Text>
    </div>
    <Text size="sm" color="dimmed" inline mt={7}>
      Recommended dimension is 1600 x 840
    </Text>
  </Group>
);

interface UploadModalProps {
  opened: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ opened, onClose }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size={'lg'}
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.95}
    >
      <Container>
        <Dropzone
          onDrop={(files) => console.log('accepted files', files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
        <Space h="md" />
        <Divider />
      </Container>
      <div className="flex flex-row flex-wrap items-center justify-center px-1 pb-4 mt-4 overflow-auto h-72">
        <div className="w-64 h-44 mx-auto mb-12 rounded-lg cursor-pointer md:mx-2">
          <Image
            className="w-full h-full bg-cover"
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwyNjEwMzZ8MHwxfHNlYXJjaHwxfHxibG9nfGVufDB8MHx8fDE2NTAzOTc4NjQ&amp;ixlib=rb-1.2.1&amp;w=200&amp;q=80&amp;fit=crop"
            alt="MacBook Pro, white ceramic mug,and black smartphone on table"
            withPlaceholder
            radius="md"
            caption="My dog begging for treats"
          />
        </div>
        <div className="w-64 h-44 mx-auto mb-12 rounded-lg cursor-pointer md:mx-2">
          <Image
            className="w-full h-full bg-cover"
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwyNjEwMzZ8MHwxfHNlYXJjaHwxfHxibG9nfGVufDB8MHx8fDE2NTAzOTc4NjQ&amp;ixlib=rb-1.2.1&amp;w=200&amp;q=80&amp;fit=crop"
            alt="MacBook Pro, white ceramic mug,and black smartphone on table"
            withPlaceholder
            radius="md"
            caption="My dog begging for treats"
          />
        </div>
        <div className="w-64 h-44 mx-auto mb-12 rounded-lg cursor-pointer md:mx-2">
          <Image
            className="w-full h-full bg-cover"
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwyNjEwMzZ8MHwxfHNlYXJjaHwxfHxibG9nfGVufDB8MHx8fDE2NTAzOTc4NjQ&amp;ixlib=rb-1.2.1&amp;w=200&amp;q=80&amp;fit=crop"
            alt="MacBook Pro, white ceramic mug,and black smartphone on table"
            withPlaceholder
            radius="md"
            caption="My dog begging for treats"
          />
        </div>
        <div className="w-64 h-44 mx-auto mb-12 rounded-lg cursor-pointer md:mx-2">
          <Image
            className="w-full h-full bg-cover"
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwyNjEwMzZ8MHwxfHNlYXJjaHwxfHxibG9nfGVufDB8MHx8fDE2NTAzOTc4NjQ&amp;ixlib=rb-1.2.1&amp;w=200&amp;q=80&amp;fit=crop"
            alt="MacBook Pro, white ceramic mug,and black smartphone on table"
            withPlaceholder
            radius="md"
            caption="My dog begging for treats"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
