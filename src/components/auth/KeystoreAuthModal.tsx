import React, { useCallback, useEffect, useRef } from "react";

import { usePrevious } from "react-use";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

// no component
import caver from "@klaytn/caver";
import { validKeystore } from "@utils/utils";
import useUpload from "@hooks/useUpload";

interface FormFieldValus {
  keystore?: File;
  password: string;
}

interface KeystoreAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const KeystoreAuthModal: React.FC<KeystoreAuthModalProps> = (
  { isOpen, onClose },
) => {
  const accept = "application/JSON";
  const prevIsOpen = usePrevious(isOpen);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, upload, clear] = useUpload(accept);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormFieldValus>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      keystore: undefined,
      password: "",
    },
  });

  // Keystore file upload set change hook form value
  useEffect(() => {
    if (!file) {
      setValue("keystore", undefined, { shouldValidate: true });
      return;
    }
    setValue("keystore", file, { shouldValidate: true });
  }, [file]);

  // keystore file upload
  const onClick = useCallback(() => {
    upload();
  }, []);

  // Keystore file login
  const onLogin = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  }, []);

  // read keystore file
  const readKeystoreFile = (keystore?: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      if (!keystore) {
        const error = new Error();
        error.name = "KeystoreFileNotFound";
        error.message = "Keystore file is required";
        return reject(error);
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (validKeystore(reader.result)) {
          resolve(reader.result);
        } else {
          const error = new Error();
          error.name = "InvalidKeystore";
          error.message = "Invalid keystore file";
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
      const accountKey = caver?.klay.accounts.decrypt(
        keystore,
        input.password,
      );

      const { privateKey } = accountKey;
      console.log("accountKey", accountKey);
      console.log("privateKey", privateKey);
    } catch (error) {
      console.error(error);
    }
  };

  // close modal reset hook form
  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      clear();
      reset({
        keystore: undefined,
        password: "",
      });
    }

    // open set keystore file validation
    if (isOpen) {
      register("keystore", { required: true });
    }
  }, [isOpen, prevIsOpen]);

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Keystore 로그인
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          sx={{ mt: 1 }}
        >
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
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={file?.name ?? ""}
            error={!!(errors?.keystore?.type)}
            helperText={!!(errors?.keystore?.type)
              ? "keystore 파일을 선택해주세요."
              : ""}
            {...register("keystore", { required: true })}
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
                error={!!(errors?.password?.type)}
                helperText={!!(errors?.password?.type) ? "비밀번호를 입력해주세요." : ""}
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

export default KeystoreAuthModal;
