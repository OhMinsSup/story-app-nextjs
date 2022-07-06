import { atom } from 'jotai';
import merge from 'lodash-es/merge';

// utils
import { isEmpty } from '@utils/assertion';

// atom
import { authAtom } from './authAtom';

// query
import { SharedQueryClient } from '@contexts/provider';
import { keyLoaderByMe, staleTimeByMe, getMe } from '@api/queries';

// types
import type { UserSchema } from '@api/schema/story-api';

// user
export type AtomUserState = UserSchema | null;

export const userAtom = atom<AtomUserState>(null);

export const asyncReadOnlyUserAtom = atom(async (get) => {
  const oldAtom = get(userAtom);
  const oldAuthtication = get(authAtom);

  if (oldAuthtication && isEmpty(oldAtom)) {
    await SharedQueryClient.prefetchQuery(keyLoaderByMe, getMe, {
      staleTime: staleTimeByMe,
      retry: false,
    });
    return SharedQueryClient.getQueryData<UserSchema>(keyLoaderByMe);
  }

  return oldAtom;
});

export const asyncWriteOnlyUserAtom = atom<
  AtomUserState,
  Partial<AtomUserState | undefined>
>(null, async (get, set, update) => {
  const oldAtom = get(userAtom);

  if (!update) {
    await SharedQueryClient.prefetchQuery(keyLoaderByMe, getMe, {
      staleTime: staleTimeByMe,
    });

    const user = SharedQueryClient.getQueryData<UserSchema>(keyLoaderByMe);
    if (user) {
      set(userAtom, user);
      set(authAtom, true);
    } else {
      set(authAtom, false);
    }
    return;
  }

  const user = SharedQueryClient.setQueryData<UserSchema>(
    keyLoaderByMe,
    (old) => {
      const optimisticData = merge({ ...(old || {}) }, oldAtom);
      return merge(optimisticData, update);
    },
  );

  if (user) {
    set(userAtom, user);
    set(authAtom, true);
  } else {
    set(authAtom, false);
  }
});
