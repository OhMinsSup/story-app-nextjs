import React from 'react';

// api
// import { fetchMe } from '@api/queries';

// hooks
import { useQueryClient } from '@tanstack/react-query';
// import { useUserHook } from '@store/hook';
import {
  useAsyncFn,
  useIsomorphicLayoutEffect,
  usePermission,
} from 'react-use';

// messages
import { hydrateFirebase } from '@libs/state/firebase';

// utils
import { isEmpty } from '@utils/assertion';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type { UserSchema } from '@api/schema/story-api';

interface CoreProps {}
const Core: React.FC<React.PropsWithChildren<CoreProps>> = ({
  children,
  ...props
}) => {
  // const { setAuth } = useUserHook();
  // const queryClient = useQueryClient();

  // const permission = usePermission({ name: 'notifications' });

  // const [stateForUser, doFetchForUser] = useAsyncFn(async () => {
  //   let user: UserSchema | undefined = undefined;

  //   try {
  //     const queryKey = [API_ENDPOINTS.LOCAL.USER.ME];
  //     await queryClient.prefetchQuery(queryKey, fetchMe);
  //     user = queryClient.getQueryData<UserSchema>(queryKey);
  //     if (user) setAuth?.(user);
  //   } catch (error) {
  //     return null;
  //   }

  //   return user ?? null;
  // }, []);

  // const [, doFetchForDevice] = useAsyncFn(
  //   async (permission: PermissionState) => {
  //     if (permission !== 'granted') return false;
  //     if (isEmpty(stateForUser.value)) return false;

  //     const firebase = await hydrateFirebase();

  //     await firebase.refreshMessaging();

  //     return true;
  //   },
  //   [stateForUser.value],
  // );

  // useIsomorphicLayoutEffect(() => {
  //   doFetchForUser();
  // }, []);

  // useIsomorphicLayoutEffect(() => {
  //   if (!permission) return;
  //   doFetchForDevice(permission);
  // }, [permission, doFetchForDevice]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...props,
          });
        }
        return child;
      })}
    </>
  );
};

export default Core;
