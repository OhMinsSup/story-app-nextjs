// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, QUERIES_KEY } from '@constants/constant';

// hooks
import { useQuery } from '@tanstack/react-query';

// utils
import { isEmpty } from '@utils/assertion';

// query
import { globalClient } from '@api/client';

// types
import type { ErrorApi } from '@api/schema/story-api';
import type { FileListResp } from '@api/schema/resp';

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
        return undefined;
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
