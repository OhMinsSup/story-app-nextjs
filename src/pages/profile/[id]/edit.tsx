import React, { useEffect, useState } from 'react';

// hooks
import { useRouter } from 'next/router';
import {
  useMutationProfileModify,
  useMutationUnRegister,
  useUserProfileQuery,
} from '@api/story/user';
import { useAlert } from '@hooks/useAlert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// component
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// custom components
import AppLayout from '@components/ui/layouts/AppLayout';
import ProfileEditTitle from '@components/profile/edit/ProfileEditTitle';
import SettingUserProfile from '@components/profile/edit/SettingUserProfile';
import SettingRow from '@components/profile/edit/SettingRow';

import { PAGE_ENDPOINTS } from '@constants/constant';
import { isAxiosError, isBrowser } from '@utils/utils';

const ProfileEditPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { data, refetch } = useUserProfileQuery(id);
  const { showAlert, Alert } = useAlert();
  const { mutateAsync: modifyMutate } = useMutationProfileModify();
  const { mutateAsync: unRegisterMutate } = useMutationUnRegister();

  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [canNotification, setCanNotification] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    setGender(data.profile.gender);
    setCanNotification(data.profile.canNotification);
  }, [data]);

  const onChangeNotification = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    Notification.requestPermission(async (status) => {
      if (status === 'granted') {
        try {
          const canNotification = e.target.checked;
          const { data } = await modifyMutate({
            dataId: Number(id),
            canNotification,
          });

          if (!data.ok) {
            const error = new Error();
            error.name = 'ApiError';
            error.message = JSON.stringify({
              resultCode: data.resultCode,
              message: data.message,
            });
            throw error;
          }

          if (canNotification) {
            // await Promise.all([notification.refreshNotification(), refetch()]);
          } else {
            // notification.unsubscribe();
          }
          setCanNotification(canNotification);
        } catch (error) {
          if (isAxiosError(error)) {
            const { response } = error;
            console.log(response);
            let message = '에러가 발생했습니다.\n다시 시도해 주세요.';
            message = response.data.message || message;
            showAlert({
              content: {
                text: message,
              },
            });
            throw error;
          }

          if (error instanceof Error && error.name === 'ApiError') {
            const { message } = JSON.parse(error.message);
            showAlert({
              content: {
                text: message ?? '에러가 발생했습니다.\n다시 시도해 주세요.',
              },
            });
          }
        }
      }
    });
  };

  const onChangeGender = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!id) return;
    const value = e.target.value as 'M' | 'F';

    try {
      const { data } = await modifyMutate({
        dataId: Number(id),
        gender: value,
      });

      if (!data.ok) {
        const error = new Error();
        error.name = 'ApiError';
        error.message = JSON.stringify({
          resultCode: data.resultCode,
          message: data.message,
        });
        throw error;
      }

      await refetch();
      setGender(value);
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;
        console.log(response);
        let message = '에러가 발생했습니다.\n다시 시도해 주세요.';
        message = response.data.message || message;
        showAlert({
          content: {
            text: message,
          },
        });
        throw error;
      }

      if (error instanceof Error && error.name === 'ApiError') {
        const { message } = JSON.parse(error.message);
        showAlert({
          content: {
            text: message ?? '에러가 발생했습니다.\n다시 시도해 주세요.',
          },
        });
      }
    }
  };

  const onUnRegister = async () => {
    if (!id) return;
    try {
      await unRegisterMutate(id);
      router.replace(PAGE_ENDPOINTS.LOGIN);
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;
        console.log(response);
        let message = '에러가 발생했습니다.\n다시 시도해 주세요.';
        message = response.data.message || message;
        showAlert({
          content: {
            text: message,
          },
        });
        throw error;
      }
    }
  };

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <>
      <div className="w-full box-border pt-8 px-8 pb-10 h-full">
        <div className="p-0 m-auto relative h-full">
          <div className="py-8 relative m-auto constrained-content h-full">
            <ProfileEditTitle nikcname={data?.profile?.nickname} />
            <SettingUserProfile profile={data?.profile} onRefresh={refetch} />
            <div className="mt-20 space-y-5">
              <SettingRow
                title="이메일 주소"
                description="회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다."
              >
                {data?.email}
              </SettingRow>
              <Divider />
              <SettingRow title="성별">
                <FormGroup>
                  <RadioGroup
                    row
                    value={gender}
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    onChange={onChangeGender}
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
              <SettingRow title="알림 수신 설정">
                <FormGroup>
                  <FormControlLabel
                    disabled={!isBrowser || !('Notification' in window)}
                    control={
                      <Switch
                        checked={canNotification}
                        onChange={onChangeNotification}
                      />
                    }
                    label=""
                  />
                </FormGroup>
              </SettingRow>
              <Divider />
              <SettingRow
                title="회원탈퇴"
                description="탈퇴 시 모두 삭제되며 복구되지 않습니다."
              >
                <Button variant="outlined" onClick={onOpen}>
                  회원탈퇴
                </Button>
              </SettingRow>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">회원탈퇴</DialogTitle>
        <DialogContent>
          <DialogContentText>
            회원을 탈퇴 하시겠습니까? 회원 탈퇴 후 3개월간 데이터 유지 후 완전한
            탈퇴 처리 됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onUnRegister}>
            확인
          </Button>
          <Button onClick={onClose} autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
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
