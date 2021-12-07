import React, { useEffect } from 'react';

// hooks
import { useRouter } from 'next/router';
import { useUserProfileQuery } from '@api/story/user';
import { useAlert } from '@hooks/useAlert';

// component
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

// custom components
import AppLayout from '@components/ui/layouts/AppLayout';
import ProfileEditTitle from '@components/profile/edit/ProfileEditTitle';
import SettingUserProfile from '@components/profile/edit/SettingUserProfile';
import SettingRow from '@components/profile/edit/SettingRow';

const ProfileEditPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data, isError, error } = useUserProfileQuery(id);
  const { showAlert, Alert } = useAlert();

  useEffect(() => {
    if (isError && error) {
      showAlert({
        content: {
          text: error.response?.data.message,
        },
        okHandler: () => router.back(),
        closeHandler: () => router.back(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <>
      <div className="w-full box-border pt-8 px-8 pb-10 h-full">
        <div className="p-0 m-auto relative h-full">
          <div className="py-8 relative m-auto constrained-content h-full">
            <ProfileEditTitle nikcname={data?.profile?.nickname} />
            <SettingUserProfile profile={data?.profile} />
            <div className="mt-20 space-y-5">
              <SettingRow title="성별">
                <FormGroup>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio />}
                      label="여성"
                    />
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="남성"
                    />
                  </RadioGroup>
                </FormGroup>
              </SettingRow>
              <Divider />
              <SettingRow
                title="이메일 주소"
                editButton
                description="회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다."
              >
                {data?.email}
              </SettingRow>
              <Divider />
              <SettingRow title="알림 수신 설정">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="알림 수신 설정"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="알림 수신 설정"
                  />
                </FormGroup>
              </SettingRow>
              <Divider />
              <SettingRow
                title="회원탈퇴"
                description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
              >
                <Button variant="outlined">회원탈퇴</Button>
              </SettingRow>
            </div>
          </div>
        </div>
      </div>
      <Alert />
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
