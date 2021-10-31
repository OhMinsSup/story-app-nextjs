import React, { useCallback, useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// components
import UserProfile from '@components/common/UserProfile';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

// icons
import ArrowBack from '@mui/icons-material/ArrowBack';

// no components
import { signUpSchema } from '@libs/yup/schema';
import { generateKey } from '@utils/utils';
import { PAGE_ENDPOINTS } from '@constants/constant';
import type { GenderType } from 'types/story-api';

// api
import { useMutationSignUp } from '@api/story/auth';
import { useStore } from '@store/store';
import shallow from 'zustand/shallow';
import { GenderEnum } from 'types/enum';

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

interface SignupProps {}
const SignupPage: React.FC<SignupProps> = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<any | null>(null);

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
    setValue,
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
        data: { ok },
      } = await mutateAsync(body);
      if (ok) {
        // set token & address
        setTokenNAddress?.({
          signatureToken: '',
          walletAddress: '',
        });
        await router.replace(PAGE_ENDPOINTS.INDEX);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(watch());
  // set init form validation
  useEffect(() => {
    if (!signatureToken || !walletAddress) return;
    reset({
      ...initState,
      walletAddress,
      signatureToken,
    });
  }, [reset, signatureToken, walletAddress]);

  // set preview image
  useEffect(() => {
    if (!file) return;
    const url = window.URL.createObjectURL(file);
    setValue('profileUrl', url, { shouldValidate: true });
    return () => window.URL.revokeObjectURL(url);
  }, [file]);

  // 프리뷰 삭제
  const onRemovePreview = useCallback(() => {
    setValue('profileUrl', null, { shouldValidate: true });
    setFile(null);
  }, []);

  // 회원가입
  const onClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
  }, []);

  return (
    <>
      <AppBar position="static" className=" shadow-none" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="back press button"
            aria-haspopup="false"
            color="inherit"
            onClick={() => router.replace(PAGE_ENDPOINTS.LOGIN)}
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
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
              onClearThumbnail={() => {}}
              onUpload={() => {}}
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
              loadingPosition="start"
              variant="contained"
              className="w-full"
              fullWidth
            >
              회원가입
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignupPage;
