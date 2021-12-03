import React from 'react';

import AppLayout from '@components/layouts/AppLayout';
import ProfileEditTitle from '@components/profile/edit/ProfileEditTitle';
import SettingUserProfile from '@components/profile/edit/SettingUserProfile';

const ProfileEditPage = () => {
  return (
    <>
      <div className="w-full box-border pt-8 px-8 pb-10 h-full">
        <div className="p-0 m-auto relative h-full">
          <div className="overflow-auto py-8 relative m-auto constrained-content h-full">
            <ProfileEditTitle />
            <SettingUserProfile />
          </div>
        </div>
      </div>
      <style jsx>{`
        .constrained-content {
          max-width: 878px;
        }
      `}</style>
    </>
  );
};

export default ProfileEditPage;

ProfileEditPage.Layout = AppLayout;
