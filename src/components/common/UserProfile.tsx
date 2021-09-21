import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { generateAvatar } from "@utils/utils";

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
    <Section>
      <div className="thumbnail-area">
        {defaultThumbnail
          ? <div
            dangerouslySetInnerHTML={{ __html: generateAvatar(avatarkey) }}
          />
          : thumbnail
          ? <img
            src={thumbnail}
            alt="profile"
          />
          : (
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
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  height: 13.75rem;
  margin-bottom: 1rem;

  .thumbnail-area {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img,svg {
      object-fit: cover;
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      display: block;
      margin-bottom: 1.25rem;
    }
    button + button {
      margin-top: 0.5rem;
    }
  }
`;

export default UserProfile;
