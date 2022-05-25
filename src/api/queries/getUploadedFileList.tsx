import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { Schema, StoryErrorApi, MediaSchema } from '@api/schema/story-api';

export const fetchUploadedFile = async (
  _: QueryFunctionContext<QueryKey, any>,
) => {
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.FILE.LIST,
  });
  return response.data;
};

export const useUploadedFileListQuery = () => {
  const queryKey = useMemo(() => [API_ENDPOINTS.LOCAL.FILE.LIST], []);
  const { data, ...fields } = useQuery<Schema<MediaSchema[]>, StoryErrorApi>(
    queryKey,
    fetchUploadedFile,
    {
      retry: false,
      enabled: true,
      staleTime: 60 * 60 * 1000,
      useErrorBoundary: true,
    },
  );
  return {
    data: data?.result,
    originData: data,
    fetchUploadedFile,
    queryKey,
    ...fields,
  };
};
