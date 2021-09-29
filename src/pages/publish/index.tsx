import React from 'react';
import { TwitterPicker } from 'react-color';

import AppLayout from '@components/layouts/AppLayout';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const PublishPage = () => {
  return (
    <Grid container spacing={3} sx={{ mt: '3rem', px: '2rem' }}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 600 }} component="h2">
              새로운 NFT Story 발행하기
            </Typography>
            <div>
              <Box
                component="form"
                className="space-y-6"
                // onSubmit={handleSubmit(onSubmit)}
                // ref={formRef}
                sx={{ mt: 1 }}
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
                      <p>- 영상: MP4 (가로 세로 사이즈 600px 이상)</p>
                    </FormHelperText>
                    <div className="mt-3">
                      {/* <TwitterPicker triangle="hide" width="100%" /> */}
                    </div>
                  </FormGroup>
                </Box>
                <TextField
                  required
                  label="이름"
                  placeholder="이름을 입력해주세요. (최대 50자까지)"
                  autoComplete="off"
                  size="medium"
                  color="info"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
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
                    <TwitterPicker triangle="hide" width="100%" />
                  </div>
                </FormGroup>
                <TextField
                  label="외부 URL"
                  fullWidth
                  size="medium"
                  color="info"
                  placeholder="외부 URL을 입력하세요."
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">https://</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            1231312
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PublishPage;

PublishPage.Layout = AppLayout;
