import React, { useEffect } from 'react';

// api
import { fetchMe } from '@api/queries';

// hooks
import { useUserHook } from '@store/hook';
import {
  useAsyncFn,
  useIsomorphicLayoutEffect,
  usePermission,
} from 'react-use';
import { useQueryClient } from 'react-query';
import { useFireBaseManager } from '@libs/firebase-manager/firebase-manager';

// storage
import { StoryStorage } from '@libs/storage';

// constants
import { API_ENDPOINTS, STORAGE_KEY } from '@constants/constant';

import type { UserSchema } from '@api/schema/story-api';
import { isEmpty } from '@utils/assertion';

interface CoreProps {}

const Core: React.FC<React.PropsWithChildren<CoreProps>> = ({ children }) => {
  const { isLoggedIn, setLoggedIn, setAuth } = useUserHook();
  const queryClient = useQueryClient();

  const firebase = useFireBaseManager();
  const permission = usePermission({ name: 'notifications' });

  const [state, doFetch] = useAsyncFn(async () => {
    const loggedIn: boolean = await StoryStorage.getItem(
      STORAGE_KEY.IS_LOGGED_IN_KEY,
    );
    const isLoggedIn = !!loggedIn;
    if (!isLoggedIn) {
      const token: string = await StoryStorage.getItem(STORAGE_KEY.TOKEN_KEY);
      if (!token) return null;
    }
    const queryKey = [API_ENDPOINTS.LOCAL.USER.ME];
    await queryClient.prefetchQuery(queryKey, fetchMe);
    const user = queryClient.getQueryData<UserSchema>(queryKey);
    if (user) setAuth?.(user);
    setLoggedIn?.(isLoggedIn);
    return user;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isLoggedIn) doFetch();
  }, [isLoggedIn]);

  useEffect(() => {
    if (permission === 'granted' && state.value) {
      if (isEmpty(firebase?.messaging)) {
        firebase?.setMessaging();
        const messaging = firebase?.messaging;
        if (messaging) {
          firebase?.forgroundMessaging(messaging);
          firebase?.intializeMessaging(messaging);
        }
      }
    }
  }, [permission, state, firebase]);

  return <>{children}</>;
};

export default Core;
