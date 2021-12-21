import React, { useState } from 'react';

// hooks
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';
import { useMeQuery } from '@api/story/user';

// components
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';

// utils
import { getShortAddress, getUserThumbnail } from '@utils/utils';
import { PAGE_ENDPOINTS } from '@constants/constant';

import type { UserModel } from '@api/schema/story-api';

interface ProfileMastheadProps {
  userInfo?: UserModel;
}
const ProfileMasthead: React.FC<ProfileMastheadProps> = ({ userInfo }) => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { userInfo: me } = useMeQuery();

  const [snackbar, setSnackbar] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  const onProfileEdit = () => {
    if (!id) return;
    router.push(PAGE_ENDPOINTS.PROFILE.EDIT(id));
  };

  const onAddressCopy = () => {
    if (!userInfo) return;
    copyToClipboard(userInfo.account.address);
    setSnackbar(true);
  };

  const onCloseSnackbar = () => {
    setSnackbar(false);
  };

  const renderActions = () => {
    if (me?.id !== userInfo?.id) return;
    return (
      <div className="masthead-actions mt-3 flex flex-wrap transition-opacity opacity-100">
        <Button variant="outlined" color="secondary" onClick={onProfileEdit}>
          프로필 수정
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className="profile-masthead relative pt-7 md:pt-14 md:pb-7">
        <div className="px-5 m-auto w-full container-large box-border md:flex md:justify-center">
          <div className="masthead-avatar w-20 h-20 md:w-28 md:h-28 relative flex-shrink-0 mb-8 rounded-full overflow-hidden">
            <Avatar
              className="flex w-full h-auto"
              src={getUserThumbnail({
                defaultProfile: !!userInfo?.profile.defaultProfile,
                avatarSvg: userInfo?.profile.avatarSvg,
                profileUrl: userInfo?.profile.profileUrl,
                nickname: userInfo?.profile.nickname,
              })}
              alt={userInfo?.profile.nickname}
            />
          </div>
          <div className="masthead-content md:ml-10">
            <h1 className="masthead-profile-name mb-2 font-bold text-gray-900 text-2xl md:mt-1 md:text-3xl">
              {userInfo?.profile.nickname}
            </h1>
            <p className="mb-2 font-normal text-base text-gray-400 space-x-3">
              <span>{getShortAddress(userInfo?.account.address)}</span>
              <ContentCopyIcon
                className="cursor-pointer"
                onClick={onAddressCopy}
              />
            </p>
            {renderActions()}
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar}
        onClose={onCloseSnackbar}
        autoHideDuration={1000}
        message="클립보드에 복사 되었습니다."
        key={'copy-address'}
      />
    </>
  );
};

export default ProfileMasthead;
