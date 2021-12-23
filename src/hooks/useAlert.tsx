import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

interface AlertOptions {
  key?: number;
  customComponent?:
    | string
    | React.FunctionComponent<any>
    | React.ComponentClass<any, any>;
  content?: Record<string, string | number | React.ReactNode>;
  okHandler?: (...args: any[]) => any;
  cancelHandler?: (...args: any[]) => any;
  closeHandler?: (...args: any[]) => any;
  showCancel?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const defaultOptions: AlertOptions = {
  key: 0,
  content: {},
  customComponent: undefined,
  okHandler: noop,
  cancelHandler: noop,
  closeHandler: noop,
  showCancel: false,
};

let key = 1;
const alertManager = new Map<number, AlertOptions>();

function getKeyThenIncreaseKey() {
  return key++;
}

export function useAlert() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const keyRef = useRef<number | null>(key);

  const alertInstance = useMemo(() => {
    return (visible: boolean, options: AlertOptions) => {
      console.log('current alert info:', alertManager);

      if (keyRef.current) {
        visible
          ? alertManager.set(keyRef.current, options)
          : alertManager.delete(keyRef.current);
      }

      setAlertOpen(visible);
    };
  }, []);

  // show
  const showAlert = useCallback((options?: AlertOptions) => {
    const key = getKeyThenIncreaseKey();

    if (!options?.content) {
      options = {
        ...options,
        content: {
          title: '',
          text: '',
          cancelText: '취소',
          confirmText: '확인',
        },
      };
    }

    if (!options?.cancelHandler) {
      options = {
        ...options,
        cancelHandler: () => {
          alertInstance(false, defaultOptions);
        },
      };
    }

    if (!options?.okHandler) {
      options = {
        ...options,
        okHandler: () => {
          alertInstance(false, defaultOptions);
        },
      };
    }

    if (!options?.closeHandler) {
      options = {
        ...options,
        closeHandler: () => {
          alertInstance(false, defaultOptions);
        },
      };
    }

    keyRef.current = key;

    const alertOptions = {
      ...options,
      key,
    };

    alertInstance(true, alertOptions);
  }, []);

  // close
  const closeAlert = useCallback(() => {
    alertInstance(false, defaultOptions);
    keyRef.current = null;
  }, []);

  // current instance
  const getInstance = () =>
    keyRef.current ? alertManager.get(keyRef.current) : null;

  // current key
  const getKey = () => keyRef.current;

  // alert component
  const Alert = () => {
    const alert = getInstance();
    if (!alert) return null;

    const {
      okHandler,
      cancelHandler,
      closeHandler,
      content,
      showCancel,
      customComponent,
    } = alert;

    // custom alert component
    if (customComponent) {
      return React.createElement(customComponent, {
        okHandler,
        cancelHandler,
        content,
        showCancel,
        isAlertOpen,
        getInstance,
        getKey,
      });
    }

    return (
      <Dialog onClose={closeHandler} open={isAlertOpen}>
        <Box
          sx={{
            width: 300,
          }}
        >
          {content?.title && <DialogTitle>{content.title}</DialogTitle>}
          <DialogContent className="font-bold text-sm">
            {content?.text}
          </DialogContent>
          <DialogActions>
            {showCancel && (
              <Button
                autoFocus
                size="small"
                onClick={cancelHandler}
                variant="contained"
                color="primary"
              >
                {content?.cancelText ?? '취소'}
              </Button>
            )}
            <Button
              autoFocus
              size="small"
              onClick={okHandler}
              variant="contained"
              color="info"
            >
              {content?.confirmText ?? '확인'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  };

  // clear
  useEffect(() => {
    return () => {
      console.log('clear start....');
      if (keyRef.current && alertManager.size > 0) {
        alertManager.delete(keyRef.current);
        keyRef.current = null;
        console.log('success clear: ', alertManager);
      }
    };
  }, []);

  return {
    isAlertOpen,
    getInstance,
    getKey,
    closeAlert,
    showAlert,
    Alert,
  };
}
