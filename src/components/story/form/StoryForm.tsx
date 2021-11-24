import React, { useRef, useCallback } from 'react';
import { TwitterPicker } from 'react-color';
import { useRouter } from 'next/router';

// validation
import { schema } from '@libs/yup/schema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, useForm, useFieldArray } from 'react-hook-form';

// components
import FileUpload from '@components/common/FileUpload';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// api & hooks
import { api } from '@api/module';
import { useAlert } from '@hooks/useAlert';
import { useMutationStoryRegister } from '@api/story/story';

// common
import { getColorHex } from '@libs/colors';
import { isAxiosError } from '@utils/utils';
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from '@constants/constant';

// types
import type { FileModel, MutationStoriesInput } from 'types/story-api';
import type { FieldArrayWithId, SubmitHandler } from 'react-hook-form';

// enum
import { StoryUploadTypeEnum } from 'types/enum';

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

const filter = createFilterOptions<FieldArrayWithId<FormFieldValues, 'tags'>>();

const serialize = (input: Required<FormFieldValues>): MutationStoriesInput => {
  const { media, tags, externalUrl, ...field } = input;

  return {
    ...field,
    externalUrl: externalUrl || null,
    isPrivate: false,
    mediaId: input.media?.idx!,
    tags: input.tags.map((tag) => tag.name),
  };
};

interface StoryFormProps {}
const StoryForm: React.FC<StoryFormProps> = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormFieldValues>({
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

  const { fields, replace } = useFieldArray({
    control,
    name: 'tags',
  });

  const mutate = useMutationStoryRegister();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  const { Alert, showAlert, closeAlert } = useAlert();

  // 등록
  const onSubmit: SubmitHandler<Required<FormFieldValues>> = async (input) => {
    try {
      const body = serialize(input);

      const {
        data: { result, resultCode },
      } = await mutate.mutateAsync(body);
      if (resultCode !== RESULT_CODE.OK) {
        return;
      }

      showAlert({
        content: {
          title: '스토리가 등록 되었습니다.',
        },
        okHandler: () => {
          closeAlert();
          router.push(PAGE_ENDPOINTS.PUBLISH.DETAIL(result.dataId));
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

  // 발행하기
  const onClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
  }, []);

  const processNFTImage = async (file: File) => {
    const response = await api.uploadResponse({
      file,
      storyType: StoryUploadTypeEnum.STORY,
    });

    const {
      data: { ok, result },
    } = response;

    if (ok) {
      const media = {
        idx: result.id,
        name: result.name,
        contentUrl: result.path,
      };
      setValue('media', media, {
        shouldValidate: true,
      });
    }
  };

  const renderActions = () => {
    return (
      <div className="flex justify-end">
        <LoadingButton
          loading={false}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          color="info"
          size="large"
          variant="contained"
          onClick={onClickSubmit}
        >
          발행하기
        </LoadingButton>
      </div>
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 600 }} component="h2">
            새로운 NFT Story 발행하기
          </Typography>
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
                  <div className="mt-3">
                    <FileUpload
                      imagePreviewHeight={600}
                      onremovefile={() => {
                        setValue('media', null, {
                          shouldValidate: true,
                        });
                      }}
                      onSetUploadFile={(filepond) => {
                        if (!filepond) return;
                        processNFTImage(filepond.file as File);
                      }}
                    />
                    <input type="hidden" {...register('media')} />
                    {(errors as any).media?.message && (
                      <FormHelperText error>
                        {(errors as any).media.message}
                      </FormHelperText>
                    )}
                  </div>
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

              <Autocomplete
                multiple
                onChange={(_, value) => {
                  const filterWithoutId = value.map((v) => {
                    return {
                      name: v.name,
                    };
                  });
                  replace(filterWithoutId);
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.name,
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      name: inputValue,
                      id: `create:${inputValue}`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                filterSelectedOptions
                id="tags-outlined"
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'object') {
                    // Add "xxx" option created dynamically
                    return option.name;
                  }
                  // Regular option
                  return option;
                }}
                options={fields}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="info"
                    label="태그"
                  />
                )}
              />

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
                <div className="mt-3">
                  <Controller
                    control={control}
                    name="backgroundColor"
                    render={({ field }) => (
                      <TwitterPicker
                        triangle="hide"
                        ref={field.ref}
                        colors={getColorHex().map((color) => color.value)}
                        width="100%"
                        color={field.value}
                        onChange={(color) => {
                          field.onChange(color.hex);
                        }}
                      />
                    )}
                  />
                  {errors.backgroundColor?.message && (
                    <FormHelperText error>
                      {errors.backgroundColor.message}
                    </FormHelperText>
                  )}
                </div>
              </FormGroup>
            </Box>
          </div>
        </Grid>
      </Grid>
      {renderActions()}
      <Alert />
    </>
  );
};

export default StoryForm;
