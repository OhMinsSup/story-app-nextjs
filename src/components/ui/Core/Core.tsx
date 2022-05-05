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
import {
  hydrateFirebase,
  useFireBaseManager,
} from '@libs/firebase-manager/firebase-manager';

// utils
import { isEmpty } from '@utils/assertion';

// constants
import { API_ENDPOINTS } from '@constants/constant';

import type { UserSchema } from '@api/schema/story-api';

interface CoreProps {}

const Core: React.FC<React.PropsWithChildren<CoreProps>> = ({ children }) => {
  const { setAuth } = useUserHook();
  const queryClient = useQueryClient();

  const firebase = useFireBaseManager();
  const permission = usePermission({ name: 'notifications' });

  const [state, doFetch] = useAsyncFn(async () => {
    let user: UserSchema | undefined = undefined;

    try {
      const queryKey = [API_ENDPOINTS.LOCAL.USER.ME];
      await queryClient.prefetchQuery(queryKey, fetchMe);
      user = queryClient.getQueryData<UserSchema>(queryKey);
      if (user) setAuth?.(user);
      return user ?? null;
    } catch (error) {
      return null;
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    doFetch();
  }, []);

  useEffect(() => {
    if (permission === 'granted' && state.value) {
      if (isEmpty(firebase?.messaging)) {
        hydrateFirebase();
      } else {
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
