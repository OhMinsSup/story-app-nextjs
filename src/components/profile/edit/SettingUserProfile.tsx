import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface SettingUserProfileProps {}
const SettingUserProfile: React.FC<SettingUserProfileProps> = () => {
  return (
    <>
      <section className="flex setting-user-profile">
        <div className="thumbnail-area pr-6 flex flex-col">
          <img
            className="w-32 h-32 rounded-full block object-cover mb-5"
            alt="OhMinSeop"
            src="https://cdn.dribbble.com/users/4714321/avatars/small/open-uri20200123-26444-dmet7r?1579773018"
          />
          <Stack spacing={2}>
            <Button variant="contained">이미지 업로드</Button>
            <Button>이미지 제거</Button>
          </Stack>
        </div>
        <div className="info-area">
          <h2>Veloss</h2>
          <p>Bio</p>
          {/* <SettingEditButton onClick={onToggleEdit} /> */}
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
