import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import type { ProfileModel } from 'types/story-api';
import { getUserThumbnail } from '@utils/utils';

interface SettingUserProfileProps {
  profile?: ProfileModel;
}
const SettingUserProfile: React.FC<SettingUserProfileProps> = ({ profile }) => {
  return (
    <>
      <section className="flex setting-user-profile">
        <div className="thumbnail-area pr-6 flex flex-col">
          <img
            className="w-32 h-32 rounded-full block object-cover mb-5"
            alt={profile?.nickname}
            src={getUserThumbnail(profile)}
          />
          <Stack spacing={2}>
            <Button variant="contained">이미지 업로드</Button>
            <Button>이미지 제거</Button>
          </Stack>
        </div>
        <div className="info-area">
          <Button size="small" className="float-right" onClick={() => {}}>
            수정
          </Button>
          <h2>{profile?.nickname}</h2>
          <p>{profile?.bio}</p>
        </div>
      </section>
      <style jsx>{`
        .setting-user-profile {
          height: 13.75rem;
        }

        .info-area {
          flex: 1 1 0%;
          padding-left: 1.5rem;
          border-left-width: 1px;
          border-left-style: solid;
          border-left-color: rgb(233, 236, 239);
        }

        .info-area h2 {
          font-size: 2.25rem;
          margin: 0;
          line-height: 1.5;
          color: rgb(52, 58, 64);
        }

        .info-area p {
          font-size: 1rem;
          margin-top: 0.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
          color: rgb(134, 142, 150);
        }

        @media (max-width: 768px) {
          .setting-user-profile {
            height: auto;
            flex-direction: column;
          }

          .thumbnail-area {
            align-items: center;
            padding-bottom: 1.5rem;
            padding-right: 0;
          }

          .thumbnail-area img {
            width: 6rem;
            height: 6rem;
            margin-bottom: 1rem;
          }

          .thumbnail-area button {
            width: 10rem;
          }

          .info-area {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            border-top: 1px solid rgb(233, 236, 239);
            border-bottom: 1px solid rgb(233, 236, 239);
            border-left: none;
            padding-left: 0;
          }

          .info-area h2 {
            font-size: 1.25rem;
          }
          .info-area p {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default SettingUserProfile;
