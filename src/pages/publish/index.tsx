import React from 'react';
import { TwitterPicker } from 'react-color';

import AppLayout from '@components/layouts/AppLayout';
import FileUpload from '@components/common/FileUpload';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const item = {
  contractAddress: '0x9faccd9f9661dddec3971c1ee146516127c34fc1',
  tokenId: '0xd99ce0f9',
  tokenIndex: '0',
  klaytnAddress: '0x892b2c3dfdbb7a20841f7c68ded93189bca36157',
  updatedAt: 1629371423,
  createdAt: 1629371423,
  name: 'Snow XX by Artist Zem.N',
  description: 'Snow XX by Artist Zem.N',
  image: 'https://cdn.krafter.space/0xd99ce0f975.jpg',
  background_color: '#7a9fc5',
  attributes: [],
  sendable: true,
  send_friend_only: true,
  external_link: '',
  external_url: '',
  profileImageUrl:
    'https://cdn.krafter.space/0x558ef3e1110c8773edc131bfb1ceca1ebbc19b67dc7eb4ff73b53f498ad6f080.png',
  nickname: 'Loco_por_el_arte',
};

const PublishPage = () => {
  return (
    <Grid container spacing={3} sx={{ mt: '3rem', mb: '5rem', px: '2rem' }}>
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
                      <FileUpload onSetUploadFile={() => {}} />
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
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: '1.5rem', mt: '1.5rem' }}
              component="h4"
            >
              미리보기
            </Typography>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={item.profileImageUrl}
                    aria-label="recipe"
                    imgProps={{
                      alt: item.nickname,
                      loading: 'lazy',
                    }}
                  >
                    {item.nickname}
                  </Avatar>
                }
                title={item.name}
                subheader={`CreateBy ${item.nickname}`}
              />
              <CardMedia
                sx={{ backgroundColor: item.background_color }}
                component="img"
                className="h-40 object-contain"
                loading="lazy"
                height="194"
                data-src={item.image}
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" noWrap>
                  설명
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PublishPage;

PublishPage.Layout = AppLayout;
