import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// validation
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, useForm } from 'react-hook-form';
import { schema } from '@libs/validation/schema';

// components
import UserProfile from '@components/common/UserProfile';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthLayout from '@components/auth/common/AuthLayout';
import VpnKey from '@mui/icons-material/VpnKey';

// hooks
import { useAlert } from '@hooks/useAlert';

// api
import { useMutationSignUp } from '@api/story/auth';

// no components
import { generateKey, isAxiosError } from '@utils/utils';
import { PAGE_ENDPOINTS, RESULT_CODE } from '@constants/constant';

import { GenderEnum } from 'types/enum';

import type { SubmitHandler } from 'react-hook-form';
import type { GenderType } from 'types/story-api';

const KeystoreLoginDialog = dynamic(
  () => import('@components/auth/login/KeystoreLoginDialog'),
  {
    ssr: false,
  },
);

interface FormFieldValues {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: GenderType;
}

const key = generateKey();

const initialState = {
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: GenderEnum.M,
};

const SignupPage: React.FC = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { showAlert, Alert } = useAlert();
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isLoading } = useMutationSignUp();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormFieldValues>({
    mode: 'onSubmit',
    // @ts-ignore
    resolver: yupResolver(schema.signup),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    defaultValues: {
      ...initialState,
    },
  });

  // 회원가입
  const onSubmit: SubmitHandler<FormFieldValues> = async ({
    confirmPassword,
    ...input
  }) => {
    try {
      const body = {
        ...input,
        avatarSvg: key,
        defaultProfile: true,
      };

      const {
        data: { resultCode, message },
      } = await mutateAsync(body);

      if (resultCode === RESULT_CODE.OK) {
        showAlert({
          content: {
            text: '가입에 성공하였습니다.',
          },
          okHandler: () => {
            router.replace(PAGE_ENDPOINTS.LOGIN);
          },
        });
        return;
      }

      showAlert({
        content: {
          text: message ?? '에러가 발생했습니다.\n다시 시도해주세요.',
        },
      });
    } catch (exception) {
      if (isAxiosError(exception)) {
        const { response } = exception;
        showAlert({
          content: {
            text: response?.data.message ?? '',
          },
        });
      }
    }
  };

  return (
    <>
      <AuthLayout>
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            className="font-bold text-center tracking-tight text-gray-700 mb-3"
            component="h1"
            variant="h5"
          >
            회원가입
          </Typography>
          <Box
            component="form"
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            sx={{ mt: 1 }}
          >
            <UserProfile
              avatarkey={key}
              defaultThumbnail={true}
              thumbnail={null}
              disabledActions={true}
            />
            <LoadingButton
              color="secondary"
              size="large"
              type="button"
              onClick={() => setIsOpen(true)}
              loadingPosition="start"
              startIcon={<VpnKey />}
              variant="outlined"
              fullWidth
              loading={isLoading}
            >
              키스토어로 가입하기
            </LoadingButton>
            <Controller
              control={control}
              name="nickname"
              render={({ field }) => (
                <TextField
                  required
                  label="닉네임"
                  placeholder="닉네임"
                  autoComplete="off"
                  color="info"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={field.ref}
                  error={!!errors?.nickname?.message}
                  helperText={errors?.nickname?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  required
                  label="이메일"
                  placeholder="이메일"
                  autoComplete="off"
                  color="info"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors?.email?.message}
                  helperText={errors?.email?.message}
                  inputRef={field.ref}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  required
                  label="비밀번호"
                  placeholder="비밀번호"
                  autoComplete="off"
                  color="info"
                  variant="standard"
                  fullWidth
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
                  inputRef={field.ref}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <TextField
                  required
                  label="비밀번호 확인"
                  placeholder="비밀번호 확인"
                  autoComplete="off"
                  color="info"
                  variant="standard"
                  fullWidth
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors?.confirmPassword?.message}
                  helperText={errors?.confirmPassword?.message}
                  inputRef={field.ref}
                  {...field}
                />
              )}
            />
            <FormControl component="fieldset" color="info">
              <FormLabel component="legend">성별</FormLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue="M"
                render={({ field }) => (
                  <RadioGroup
                    row
                    {...field}
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value={GenderEnum.M}
                      control={<Radio color="info" />}
                      label="남성"
                    />
                    <FormControlLabel
                      value={GenderEnum.F}
                      control={<Radio color="info" />}
                      label="여성"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <LoadingButton
              color="info"
              size="large"
              onClick={() => {
                formRef.current?.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true }),
                );
              }}
              loading={isLoading}
              disabled={!isValid || !isDirty}
              variant="contained"
              className="w-full"
              fullWidth
            >
              회원가입
            </LoadingButton>
          </Box>
        </Box>
      </AuthLayout>
      <Alert />
      <KeystoreLoginDialog visible={isOpen} close={() => setIsOpen(false)} />
    </>
  );
};

export default SignupPage;
