import { useQuery } from '@tanstack/react-query';
import { api } from '@api/module';
import { API_ENDPOINTS, QUERIES_KEY } from '@constants/constant';

import type { ErrorApi } from '@api/schema/story-api';
import type { FileListResp } from '@api/schema/resp';
import { useMemo } from 'react';
import { globalClient } from '@api/client';
import { isEmpty } from '@utils/assertion';
import { generateKey, placeholderDataFn } from '@utils/utils';
import { useMeQuery } from './getMe';

export const getFileList = async () => {
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.FILE.LIST,
  });
  return response.data;
};

interface QueryConfig {
  enabled?: boolean;
}

export const useFileListQuery = (config?: QueryConfig) => {
  const { enabled = false } = config ?? {};
  const { userInfo } = useMeQuery();

  const placeholderData = useMemo(
    () =>
      placeholderDataFn(
        Array.from({ length: 5 }).map((_, index) => ({
          id: `placeholder-${index + 1}`,
          contentUrl: undefined,
          publidId: generateKey(),
          version: Date.now(),
          type: 'STORY',
          userId: userInfo?.id,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })),
      ),
    [userInfo],
  );

  const resp = useQuery<FileListResp, ErrorApi>(
    QUERIES_KEY.FILE_LIST,
    getFileList,
    {
      enabled,
      staleTime: 60 * 60 * 1000,
      useErrorBoundary: true,
      placeholderData: () => {
        const cacheData = globalClient.getQueryData<FileListResp>(
          QUERIES_KEY.FILE_LIST,
        );
        if (cacheData && !isEmpty(cacheData)) {
          return cacheData;
        }
        return placeholderData;
      },
    },
  );

  return {
    ...resp,
    get list() {
      return resp.data?.result ?? [];
    },
    get fetcher() {
      return getFileList;
    },
  };
};
