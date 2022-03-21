import React from 'react';
import { Button, Avatar } from '@mantine/core';
import { generateAvatar } from '@utils/utils';

export type UserProfileProps = {
  defaultThumbnail?: boolean;
  thumbnail?: string;
  avatarkey?: string;
  onUpload?: () => void;
  onClearThumbnail?: () => void;
  disabledActions?: boolean;
};

const UserProfile: React.FC<UserProfileProps> = ({
  thumbnail,
  avatarkey,
  onUpload,
  onClearThumbnail,
  disabledActions,
}) => {
  return (
    <div className="flex mb-4">
      <div className="flex flex-col justify-start items-start w-40">
        <Avatar
          className="w-24 h-24"
          radius="xl"
          src={avatarkey ? generateAvatar(avatarkey) : null}
        />
      </div>
      {!disabledActions && (
        <div className="space-y-2 self-center">
          <Button
            color="primary"
            fullWidth
            variant="outline"
            onClick={onUpload}
          >
            이미지 업로드
          </Button>
          <Button
            color="primary"
            fullWidth
            variant="default"
            onClick={onClearThumbnail}
          >
            이미지 제거
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
