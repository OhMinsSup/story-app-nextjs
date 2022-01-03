import React, { useRef, useEffect } from 'react';

// validation
import { schema } from '@libs/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, useForm, FormProvider } from 'react-hook-form';

// components
import BackgroundPalette from './BackgroundPalette';
import Thumbnail from './Thumbnail';
import TagInput from './TagInput';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';

// hooks
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import {
  useMutationStoryRegister,
  useMutationStoryModifiy,
} from '@api/story/story';

// common
import { isAxiosError, generateKey } from '@utils/utils';
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from '@constants/constant';

// types
import type {
  FileModel,
  PublishInput,
  StorySchema,
} from '@api/schema/story-api';
import type { SubmitHandler } from 'react-hook-form';

interface Tag {
  name: string;
}

interface FormFieldValues {
  name: string;
  description: string;
  media: FileModel | null;
  backgroundColor?: string;
  externalUrl?: string;
  tags: Tag[];
}

const serialize = (
  input: FormFieldValues & { dataId?: number },
): PublishInput => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { media, tags, externalUrl, ...field } = input;
  const safeMediaId = input.media?.idx as number;

  return {
    ...field,
    externalUrl: externalUrl || null,
    isPrivate: false,
    mediaId: safeMediaId,
    tags: input.tags.map((tag) => tag.name),
  };
};

interface StoriesFormProps {
  data?: StorySchema | null;
}
const StoriesForm: React.FC<StoriesFormProps> = ({ data }) => {
  const methods = useForm<FormFieldValues>({
    mode: 'onSubmit',
    // @ts-ignore
    resolver: yupResolver(schema.publish),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      media: null,
      backgroundColor: undefined,
      externalUrl: undefined,
      tags: [],
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const mutateRegister = useMutationStoryRegister();
  const mutateModify = useMutationStoryModifiy();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  const { Alert, showAlert, closeAlert } = useAlert();

  useEffect(() => {
    if (!data) return;

    const { media } = data;
    const name = `${generateKey()}_${Date.now()}`;
    reset({
      name: data.name,
      description: data.description,
      media: {
        idx: media.id,
        name,
        contentUrl: media.contentUrl,
      },
      backgroundColor: data.backgroundColor ?? undefined,
      externalUrl: data.externalUrl ?? undefined,
      tags: data.tags.map((tag) => ({ name: tag.name })),
    });
  }, [data, reset]);

  // 등록
  const onSubmit: SubmitHandler<Required<FormFieldValues>> = async (input) => {
    const mutate = data ? mutateModify : mutateRegister;

    try {
      const body: any = serialize({
        ...input,
        ...(data && { dataId: data.id }),
      });

      const {
        data: { result, resultCode },
      } = await mutate.mutateAsync(body);
      if (resultCode !== RESULT_CODE.OK) {
        return;
      }

      showAlert({
        content: {
          title: `스토리가 ${data ? '수정' : '등록'} 되었습니다.`,
        },
        okHandler: () => {
          closeAlert();
          router.replace(PAGE_ENDPOINTS.STORY.DETAIL(result.dataId));
        },
      });

      return result;
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const { response } = error;
        let message = '에러가 발생했습니다.\n다시 시도해 주세요.';
        switch (response.status) {
          case STATUS_CODE.NOT_FOUND:
          case STATUS_CODE.BAD_REQUEST:
            message = response.data.message || message;
            break;
        }
        showAlert({
          content: {
            text: message,
          },
        });
        return;
      }
    }
  };

  const renderActions = () => {
    return (
      <div className="flex justify-end">
        <LoadingButton
          loading={mutateRegister.isLoading || mutateModify.isLoading}
          loadingPosition="start"
          color="primary"
          size="large"
          variant="outlined"
          onClick={() =>
            formRef.current?.dispatchEvent(
              new Event('submit', { cancelable: true, bubbles: true }),
            )
          }
        >
          발행하기
        </LoadingButton>
      </div>
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <Container className="space-y-5" maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 600 }} component="h2">
            {data ? 'NFT Story 수정하기' : '새로운 NFT Story 발행하기'}
          </Typography>
          {renderActions()}
          <div>
            <Box
              component="form"
              className="space-y-6"
              sx={{ mt: 1 }}
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box component="div" sx={{ mt: '3rem' }}>
                <FormGroup>
                  <FormLabel sx={{ fontWeight: 600 }} component="label">
                    파일 업로드
                  </FormLabel>
                  <FormHelperText color="text.secondary">
                    <p>
                      NFT에 넣을 이미지/영상 파일을 업로드해주세요. 최대
                      10MB까지 업로드할 수 있으며, 지원하는 파일 포맷은 아래와
                      같습니다.{' '}
                    </p>
                    <p>
                      - 이미지: PNG, JPG, JPEG, GIF (가로 세로 사이즈 600px
                      이상)
                    </p>
                  </FormHelperText>
                  <Thumbnail />
                </FormGroup>
              </Box>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="이름"
                    placeholder="이름을 입력해주세요. (최대 50자까지)"
                    autoComplete="off"
                    size="medium"
                    color="info"
                    variant="standard"
                    fullWidth
                    error={!!errors?.name?.message}
                    helperText={
                      !!errors?.name?.message ? errors?.name?.message : ''
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="설명"
                    fullWidth
                    multiline
                    size="medium"
                    color="info"
                    placeholder="설명을 입력하세요."
                    minRows={8}
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors?.description?.message}
                    helperText={
                      !!errors?.description?.message
                        ? errors?.description?.message
                        : ''
                    }
                    {...field}
                  />
                )}
              />

              <TagInput />

              <Controller
                control={control}
                name="externalUrl"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="외부 URL"
                    fullWidth
                    size="medium"
                    color="info"
                    placeholder="외부 URL (https://, http://)을 입력하세요."
                    variant="standard"
                    error={!!errors?.externalUrl?.message}
                    helperText={
                      !!errors?.externalUrl?.message
                        ? errors?.externalUrl?.message
                        : ''
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />

              <FormGroup>
                <FormLabel sx={{ fontWeight: 600 }} component="label">
                  배경색
                </FormLabel>
                <FormHelperText>
                  NFT 배경색을 선택해주세요. 아래 컬러칩을 눌러 색을 지정하거나,
                  컬러 코드를 직접 입력할 수 있습니다.
                </FormHelperText>
                <BackgroundPalette />
              </FormGroup>
            </Box>
          </div>
        </Container>
      </FormProvider>
      <Alert />
    </>
  );
};

export default StoriesForm;
