import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { generateAvatar } from '@utils/utils';

export type UserProfileProps = {
  defaultThumbnail: boolean;
  thumbnail: string | null;
  avatarkey: string;
  onUpload: () => void;
  onClearThumbnail: () => void;
};

const UserProfile: React.FC<UserProfileProps> = ({
  defaultThumbnail,
  thumbnail,
  avatarkey,
  onUpload,
  onClearThumbnail,
}) => {
  return (
    <div className="user-profle">
      <div className="thumbnail-area">
        {defaultThumbnail ? (
          <div
            dangerouslySetInnerHTML={{ __html: generateAvatar(avatarkey) }}
          />
        ) : thumbnail ? (
          <img src={thumbnail} alt="profile" />
        ) : (
          <Avatar src="/broken-image.jpg" />
        )}
        <Button
          color="info"
          size="medium"
          fullWidth
          variant="outlined"
          onClick={onUpload}
        >
          이미지 업로드
        </Button>
        <Button
          color="secondary"
          size="medium"
          fullWidth
          variant="outlined"
          onClick={onClearThumbnail}
        >
          이미지 제거
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
