import React, { useCallback, useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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

// no components
import { signUpSchema } from '@libs/yup/schema';
import { generateKey, isAxiosError } from '@utils/utils';
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from '@constants/constant';

import { GenderEnum } from 'types/enum';
import type { GenderType } from 'types/story-api';

// hooks
import { useAlert } from '@hooks/useAlert';

// api
import { useMutationSignUp } from '@api/story/auth';
import { useStore } from '@store/store';
import shallow from 'zustand/shallow';

interface FormFieldValues {
  profileUrl?: string | null;
  nickname: string;
  email: string;
  walletAddress: string;
  gender: GenderType;
  signatureToken: string;
}

const key = generateKey();

const initState = {
  profileUrl: null,
  nickname: '',
  email: '',
  walletAddress: '',
  signatureToken: '',
  gender: GenderEnum.M,
};

const SignupPage: React.FC = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { showAlert, Alert } = useAlert();

  const { mutateAsync, isLoading } = useMutationSignUp();
  const { signatureToken, walletAddress, setTokenNAddress } = useStore(
    (store) => ({
      signatureToken: store.signatureToken,
      walletAddress: store.walletAddress,
      setTokenNAddress: store.actions?.setTokenNAddress,
    }),
    shallow,
  );

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<FormFieldValues>({
    mode: 'onSubmit',
    resolver: yupResolver(signUpSchema as any),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    defaultValues: {
      ...initState,
    },
  });

  const watchProfuleUrl = watch('profileUrl');
  console.log(errors);
  // 회원가입
  const onSubmit: SubmitHandler<FormFieldValues> = async (input) => {
    try {
      const body = {
        ...input,
        avatarSvg: generateKey(),
        profileUrl: '',
        defaultProfile: true,
      };
      const {
        data: { resultCode, message },
      } = await mutateAsync(body);

      switch (resultCode) {
        case RESULT_CODE.OK: {
          // set token & address
          setTokenNAddress?.({
            signatureToken: '',
            walletAddress: '',
          });

          router.replace(PAGE_ENDPOINTS.INDEX);
          return;
        }
        // 이메일, 닉네임, 지갑주소가 이미 존재하는 경우
        case RESULT_CODE.INVALID:
          showAlert({
            content: {
              text: message,
            },
          });
          break;
        default:
          break;
      }
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

  // set init form validation
  useEffect(() => {
    if (!signatureToken || !walletAddress) return;
    reset({
      ...initState,
      walletAddress,
      signatureToken,
    });
  }, [reset, signatureToken, walletAddress]);

  // 회원가입
  const onClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
  }, []);

  return (
    <>
      <AuthLayout>
        <Box
          sx={{
            marginTop: 8,
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
            className="space-y-3"
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            sx={{ mt: 1 }}
          >
            <UserProfile
              avatarkey={key}
              defaultThumbnail={true}
              thumbnail={watchProfuleUrl ?? null}
              disabledActions={true}
            />
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
                  error={!!errors?.nickname?.message}
                  helperText={
                    !!errors?.nickname?.message ? errors?.nickname?.message : ''
                  }
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="walletAddress"
              render={({ field }) => (
                <TextField
                  required
                  aria-readonly
                  label="지갑 주소"
                  placeholder="지갑 주소"
                  autoComplete="off"
                  color="info"
                  variant="standard"
                  fullWidth
                  className="cursor-none"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors?.walletAddress?.message}
                  helperText={
                    !!errors?.walletAddress?.message
                      ? errors.walletAddress.message
                      : ''
                  }
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
                  helperText={
                    !!errors?.email?.message ? errors?.email?.message : ''
                  }
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
              onClick={onClickSubmit}
              loading={isLoading}
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
    </>
  );
};

export default SignupPage;
