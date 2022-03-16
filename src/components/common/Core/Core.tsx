import React from 'react';
import shallow from 'zustand/shallow';

// hooks
import { useStore } from '@store/store';
import { useMeQuery } from '@api/story/user';
import { useAsyncFn, useIsomorphicLayoutEffect } from 'react-use';

// storage
import { StoryStorage } from '@libs/storage';

// constants
import { STORAGE_KEY } from '@constants/constant';

const Core: React.FC = ({ children }) => {
  const { isLoggedIn, setLoggedIn } = useStore(
    (store) => ({
      isLoggedIn: store.isLoggedIn,
      setLoggedIn: store.actions?.setLoggedIn,
    }),
    shallow,
  );

  const _ = useMeQuery();

  const [__, fetch] = useAsyncFn(async () => {
    const loggedIn: boolean = await StoryStorage.getItem(
      STORAGE_KEY.IS_LOGGED_IN_KEY,
    );
    setLoggedIn?.(!!loggedIn);
    return loggedIn;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isLoggedIn) fetch();
  }, [isLoggedIn]);

  return <>{children}</>;
};

export default Core;
