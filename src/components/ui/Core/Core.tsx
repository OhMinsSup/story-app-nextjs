import React from 'react';

// hooks
import { useUserHook } from '@store/hook';
import { useMeQuery } from '@api/queries';
import { useAsyncFn, useIsomorphicLayoutEffect } from 'react-use';

// storage
import { StoryStorage } from '@libs/storage';

// constants
import { STORAGE_KEY } from '@constants/constant';

interface CoreProps {}

const Core: React.FC<React.PropsWithChildren<CoreProps>> = ({ children }) => {
  const { isLoggedIn, setLoggedIn } = useUserHook();

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
