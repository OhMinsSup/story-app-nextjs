import React, { useCallback, useRef, useEffect } from 'react';
import shallow from 'zustand/shallow';

// validation
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

// utils
import caver from '@libs/klaytn/caver';
import { isAxiosError, signatureMessage, validKeystore } from '@utils/utils';
import { PAGE_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// hooks
import useUpload from '@hooks/useUpload';
import { useRouter } from 'next/router';
import { useMutationLogin } from '@api/story/auth';

// store
import { useStore } from '@store/store';

interface FormFieldValus {
  keystore?: File;
  password: string;
}

const initState = {
  keystore: undefined,
  password: '',
};

const KeystoreLoginDialog: React.FC = () => {
  const accept = 'application/json';
  const formRef = useRef<HTMLFormElement | null>(null);

  const router = useRouter();
  const [_, upload, clear] = useUpload(accept);

  const { isKeystoreLogin, setIsKeystoreLogin, setSignup } = useStore(
    (store) => ({
      isKeystoreLogin: store.isKeystoreLogin,
      setIsKeystoreLogin: store.actions?.setIsKeystoreLogin,
      setSignup: store.actions?.setSignup,
    }),
    shallow,
  );

  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormFieldValus>({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues: {
      ...initState,
    },
  });

  const { mutateAsync } = useMutationLogin();

  const onClose = useCallback(() => {
    reset(initState);
    setIsKeystoreLogin?.(false);
    clear();
  }, [reset, setIsKeystoreLogin, clear]);

  // keystore file upload
  const onClick = useCallback(async () => {
    const file = await upload();
    if (!file) return;
    setValue('keystore', file, { shouldValidate: true });
  }, [setValue, upload]);

  // Keystore file login
  const onLogin = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
  }, []);

  // read keystore file
  const readKeystoreFile = (keystore?: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      if (!(keystore instanceof File)) {
        const error = new Error();
        error.name = 'FileError';
        error.message = 'keystore file is not found';
        return reject(error);
      }

      if (!keystore) {
        const error = new Error();
        error.name = 'KeystoreFileNotFound';
        error.message = 'Keystore file is required';
        return reject(error);
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (validKeystore(reader.result)) {
          resolve(reader.result);
        } else {
          const error = new Error();
          error.name = 'InvalidKeystore';
          error.message = 'Invalid keystore file';
          reject(error);
        }
      };

      reader.readAsText(keystore);
    });
  };

  // onsubmit handler
  const onSubmit: SubmitHandler<FormFieldValus> = async (input) => {
    try {
      const keystore = await readKeystoreFile(input.keystore);
      const accountKey = caver?.klay.accounts.decrypt(keystore, input.password);
      if (!accountKey) {
        throw new Error('Invalid AccountKey');
      }

      const { privateKey, address, sign } = accountKey;

      const timestamp = Date.now();
      const requestType = 'LoginRequest';
      const signedMessage = await sign(
        signatureMessage(address, timestamp, requestType),
      );

      if (!signedMessage) {
        throw new Error('signature error');
      }

      const body = {
        walletAddress: address,
        signature: signedMessage.signature,
      };

      const {
        data: { ok, result, resultCode },
      } = await mutateAsync(body);

      switch (resultCode) {
        case RESULT_CODE.OK:
          router.replace(PAGE_ENDPOINTS.INDEX);
          break;
        case RESULT_CODE.NOT_EXIST:
          setSignup?.(true);
          setIsKeystoreLogin?.(false);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      // 서버 에러
      if (isAxiosError(error)) {
        const {
          response: { data },
        } = error;
        if (!data.ok) setSignup?.(true);
      }
    }
  };

  return (
    <Dialog open={isKeystoreLogin} maxWidth="sm" fullWidth>
      <DialogTitle>Keystore 로그인</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          sx={{ mt: 1 }}
        >
          <Controller
            control={control}
            name="keystore"
            rules={{ required: true }}
            render={({ field: { value, ref, ...field } }) => (
              <TextField
                required
                aria-readonly
                label="Keystore 파일"
                placeholder="Keystore File"
                autoComplete="off"
                color="info"
                variant="standard"
                fullWidth
                className="cursor-pointer"
                onClick={onClick}
                InputProps={{
                  readOnly: true,
                  inputRef: ref,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors?.keystore?.type}
                helperText={
                  !!errors?.keystore?.type
                    ? 'keystore 파일을 선택해주세요.'
                    : ''
                }
                value={value ? value.name : ''}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                required
                type="password"
                label="비밀번호"
                fullWidth
                placeholder="비밀번호"
                autoComplete="on"
                variant="standard"
                color="info"
                error={!!errors?.password?.type}
                helperText={
                  !!errors?.password?.type ? '비밀번호를 입력해주세요.' : ''
                }
                {...field}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          size="medium"
          variant="outlined"
          color="secondary"
          autoFocus
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          type="button"
          size="medium"
          variant="contained"
          color="info"
          onClick={onLogin}
        >
          로그인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KeystoreLoginDialog;
