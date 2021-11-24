import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { generateAvatar } from '@utils/utils';

export type UserProfileProps = {
  defaultThumbnail: boolean;
  thumbnail: string | null;
  avatarkey: string;
  onUpload?: () => void;
  onClearThumbnail?: () => void;
  disabledActions?: boolean;
};

const UserProfile: React.FC<UserProfileProps> = ({
  defaultThumbnail,
  thumbnail,
  avatarkey,
  onUpload,
  onClearThumbnail,
  disabledActions,
}) => {
  return (
    <div className="user-profile">
      <div className="thumbnail-area">
        {defaultThumbnail ? (
          <div
            className="w-24 h-24 mb-4"
            dangerouslySetInnerHTML={{ __html: generateAvatar(avatarkey) }}
          />
        ) : (
          <Avatar
            className="w-24 h-24 mb-4"
            src={thumbnail || '/broken-image.jpg'}
            imgProps={{
              alt: 'profile image',
              loading: 'lazy',
            }}
          />
        )}
        {disabledActions ? null : (
          <div className="space-y-2">
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
        )}
      </div>
      <style jsx>{`
        .user-profile {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .thumbnail-area {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
