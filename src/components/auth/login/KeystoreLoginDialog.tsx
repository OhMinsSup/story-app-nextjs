import React, { useState } from 'react';

// components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

// utils
import { validKeystore } from '@utils/utils';

// hooks
import useUpload from '@hooks/useUpload';
import { schema } from '@libs/validation/schema';

interface KeystoreLoginDialogProps {
  visible: boolean;
  close: () => void;
}

const initialState = {
  file: null,
  password: '',
};

const KeystoreLoginDialog: React.FC<KeystoreLoginDialogProps> = ({
  visible,
  close,
}) => {
  const accept = 'application/json';
  const [_, upload, clear] = useUpload(accept);
  const [form, setForm] = useState<Record<string, any>>(initialState);

  const onClose = () => {
    clear();
    setForm(initialState);
    close();
  };

  // keystore file upload
  const onClick = async () => {
    const file = await upload();
    if (!file) return;
    setForm({
      ...form,
      file,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const input = await schema.keystore.validate(form);
      if (!input) return;
      const keystore = await readKeystoreFile(input.file);
      console.log(keystore);
    } catch (e) {
      throw e;
    }
  };

  // read keystore file
  const readKeystoreFile = (keystore?: File) => {
    return new Promise<any>((resolve, reject) => {
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
          // @ts-ignore
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

  return (
    <Dialog open={visible} maxWidth="sm" fullWidth>
      <DialogTitle>Keystore</DialogTitle>
      <DialogContent>
        <Box component="div" className="space-y-3" sx={{ mt: 1 }}>
          <TextField
            required
            aria-readonly
            name="file"
            label="Keystore 파일"
            placeholder="Keystore File"
            autoComplete="off"
            color="info"
            variant="standard"
            fullWidth
            className="cursor-pointer"
            onClick={onClick}
            value={form.file?.name || ''}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            type="password"
            name="password"
            label="비밀번호"
            fullWidth
            placeholder="비밀번호"
            autoComplete="on"
            variant="standard"
            color="info"
            value={form.password}
            onChange={onChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          size="medium"
          variant="contained"
          color="primary"
          onClick={onClose}
          fullWidth
        >
          취소
        </Button>
        <Button
          type="button"
          size="medium"
          variant="contained"
          color="info"
          fullWidth
          onClick={onSubmit}
        >
          인증
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KeystoreLoginDialog;
