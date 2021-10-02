import { useLocalStorage } from 'react-use';
import { STORAGE_KEY } from '@constants/constant';
import { StorageUserInfo } from 'types/story-api';

export function useUserInfo() {
  return useLocalStorage<StorageUserInfo | undefined>(
    STORAGE_KEY.USER_KEY,
    undefined,
  );
}

export function useToken() {
  return useLocalStorage<string | undefined>(STORAGE_KEY.TOKEN_KEY, undefined, {
    raw: true,
  });
}
