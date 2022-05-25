import React, { useCallback } from 'react';

// components
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  Group,
  Modal,
  Drawer,
  Container,
  Text,
  Divider,
  Space,
  Image,
} from '@mantine/core';

// api
import { api } from '@api/module';

// hooks
import { useMantineTheme } from '@mantine/core';
import { useModuleContext } from '@components/nft/context/context';
import { useMediaQuery } from '@mantine/hooks';

// utils
import { isEmpty } from '@utils/assertion';

// enum
import { StoryUploadTypeEnum } from '@api/schema/enum';

// types
import type { MantineTheme } from '@mantine/core';
import type { DropzoneStatus } from '@mantine/dropzone';
import { useUploadedFileListQuery } from '@api/queries';
import { useQueryClient } from 'react-query';
import classNames from 'classnames';

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
  onClose: (...args: any[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ opened, onClose }) => {
  const { data, queryKey } = useUploadedFileListQuery();
  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const { upload, setUploadedImage } = useModuleContext();
  const isMobile = useMediaQuery('(max-width: 768px)', false);

  const onUploadStart = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file || isEmpty(file)) return;

      const response = await api.upload({
        file,
        storyType: StoryUploadTypeEnum.STORY,
      });

      const {
        data: { ok, result },
      } = response;

      if (ok) {
        const payload = {
          idx: result.id,
          name: result.name,
          contentUrl: result.path,
        };
        setUploadedImage(payload);
        await queryClient.invalidateQueries(queryKey);
      }
    },
    [setUploadedImage, queryClient, queryKey],
  );

  const onCloseModal = useCallback(() => {
    onClose(upload);
  }, [onClose, upload]);

  const onClickSeleteItem = useCallback(
    (image: Record<string, any>) => {
      const payload = {
        idx: image.id,
        name: image.publidId,
        contentUrl: image.contentUrl,
      };
      setUploadedImage(payload);
    },
    [setUploadedImage],
  );

  const Wapper = isMobile ? Drawer : Modal;

  return (
    <Wapper
      opened={opened}
      onClose={onCloseModal}
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
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
        <Space h="md" />
        {!isEmpty(data) && <Divider />}
      </Container>
      {isEmpty(data) || !data ? null : (
        <div className="flex flex-row flex-wrap items-center justify-center px-1 pb-4 mt-4 overflow-auto h-72">
          {data.map((image) => (
            <div
              role="button"
              aria-label="select image"
              key={`uploaded-image-key-${image.id}`}
              className={classNames(
                'w-64 min-h-[180px] mx-auto mb-12 rounded-lg cursor-pointer md:mx-2',
                {
                  'border border-indigo-500/100 border-solid':
                    image.id === upload.image?.idx,
                },
              )}
              onClick={() => onClickSeleteItem(image)}
            >
              <Image
                className="w-full h-full bg-cover"
                src={image.contentUrl}
                alt={`nft content ${image.publidId}`}
                withPlaceholder
                radius="md"
                caption={image.publidId}
              />
            </div>
          ))}
        </div>
      )}
    </Wapper>
  );
};

export default UploadModal;
