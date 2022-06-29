import { atom } from 'jotai';
import merge from 'lodash-es/merge';

// atom
import { authAtom } from './authAtom';

// query
import { SharedQueryClient } from '@contexts/provider';
import { keyLoader, staleTimeByMe, getMe } from '@api/queries';

// types
import type { UserSchema } from '@api/schema/story-api';

// user
export type AtomUserState = UserSchema | null;

export const userAtom = atom<AtomUserState>(null);

export const asyncReadOnlyUserAtom = atom(async (get) => {
  const oldAtom = get(userAtom);
  const oldAuthtication = get(authAtom);

  if (!oldAtom && oldAuthtication) {
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
    if (user) {
      set(userAtom, user);
      set(authAtom, true);
    } else {
      set(authAtom, false);
    }
    return;
  }

  const user = SharedQueryClient.setQueryData<UserSchema>(keyLoader, (old) => {
    const optimisticData = merge({ ...(old || {}) }, oldAtom);
    return merge(optimisticData, update);
  });

  if (user) {
    set(userAtom, user);
    set(authAtom, true);
  } else {
    set(authAtom, false);
  }
});
