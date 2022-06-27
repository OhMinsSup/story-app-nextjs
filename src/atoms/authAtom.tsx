import { atom } from 'jotai';
import merge from 'lodash-es/merge';
import Cookies from 'js-cookie';

// query
import { SharedQueryClient } from '@contexts/provider';
import { keyLoader, staleTimeByMe, getMe } from '@api/queries';

// constants
import { COOKIE_KEY } from '@constants/constant';

// types
import type { UserSchema } from '@api/schema/story-api';

// user

export type AtomUserState = UserSchema | null;

export const userAtom = atom<AtomUserState>(null);

export const asyncReadOnlyUserAtom = atom(async (get) => {
  const oldAtom = get(userAtom);
  const cookieValue = Cookies.get(COOKIE_KEY.ACCESS_TOKEN);

  // cookie값이 존재하지 않는 경우
  if (!oldAtom && cookieValue) {
    await SharedQueryClient.prefetchQuery(keyLoader, getMe, {
      staleTime: staleTimeByMe,
    });
    return SharedQueryClient.getQueryData<UserSchema>(keyLoader);
  }

  return oldAtom;
});

export const asyncWriteOnlyUserAtom = atom<
  AtomUserState,
  Partial<AtomUserState | undefined>
>(null, async (get, set, update) => {
  const oldAtom = get(userAtom);

  if (!update) {
    await SharedQueryClient.prefetchQuery(keyLoader, getMe, {
      staleTime: staleTimeByMe,
    });

    const user = SharedQueryClient.getQueryData<UserSchema>(keyLoader);
    if (user) set(userAtom, user);
    return;
  }

  const user = SharedQueryClient.setQueryData<UserSchema>(keyLoader, (old) => {
    const optimisticData = merge({ ...(old || {}) }, oldAtom);
    return merge(optimisticData, update);
  });

  if (user) set(userAtom, user);
});
