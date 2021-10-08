import React, { useRef, useCallback, useState } from 'react';
import { TwitterPicker } from 'react-color';

// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { publishSchema } from '@libs/yup/schema';

// components
import AppLayout from '@components/layouts/AppLayout';
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

// api
import { api } from '@api/module';

// common
import { API_ENDPOINTS } from '@constants/constant';

// types
import type { ActualFileObject } from 'filepond';
import type { FileModel } from 'types/story-api';

interface FormFieldValues {
  name: string;
  description: string;
  media: FileModel | null;
  backgroundColor?: string;
  externalUrl?: string;
}

const PublishPage = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormFieldValues>({
    mode: 'onSubmit',
    resolver: yupResolver(publishSchema as any),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      media: null,
      backgroundColor: undefined,
      externalUrl: undefined,
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  // 등록
  const onSubmit: SubmitHandler<FormFieldValues> = async (input) => {
    try {
      const data = await api.postResponse({
        url: API_ENDPOINTS.LOCAL.STORY.ROOT,
        body: input,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 발행하기
  const onClickSubmit = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
  }, []);

  const processNFTImage = async (file: ActualFileObject) => {
    const getDataUrl = () => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve(e.target.result);
        };
        reader.onerror = (e: any) => {
          reject(e);
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      const dataUrl = await getDataUrl();
      const {
        data: { payload },
      } = await api.postResponse<FileModel>({
        url: API_ENDPOINTS.LOCAL.FILE.ROOT,
        body: {
          dataUrl,
          name: file.name,
          storeType: 'NFT_IMAGE',
        },
      });

      setValue('media', payload, {
        shouldValidate: true,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: '3rem', mb: '5rem', px: '2rem' }}>
      <Grid item xs={12} className=" space-y-4">
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
                        - 이미지: PNG, JPG, JPEG, GIF, WEBP (가로 세로 사이즈
                        600px 이상)
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
                          processNFTImage(filepond.file);
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
                    NFT 배경색을 선택해주세요. 아래 컬러칩을 눌러 색을
                    지정하거나, 컬러 코드를 직접 입력할 수 있습니다.
                  </FormHelperText>
                  <div className="mt-3">
                    <Controller
                      control={control}
                      name="backgroundColor"
                      render={({ field }) => (
                        <TwitterPicker
                          triangle="hide"
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
      </Grid>
    </Grid>
  );
};

export default PublishPage;

PublishPage.Layout = AppLayout;
