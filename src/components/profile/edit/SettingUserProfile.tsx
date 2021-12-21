import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { getUserThumbnail } from '@utils/utils';
import { useMutationProfileModify } from '@api/story/user';
import { useRouter } from 'next/router';

import { api } from '@api/module';

import { StoryUploadTypeEnum } from '@api/schema/enum';
import type { ProfileModel } from '@api/schema/story-api';

interface SettingUserProfileProps {
  profile?: ProfileModel;
  onRefresh?: () => Promise<any>;
}
const SettingUserProfile: React.FC<SettingUserProfileProps> = ({
  profile,
  onRefresh,
}) => {
  const router = useRouter();
  const id = router.query.id?.toString();

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    nickname: profile?.nickname ?? '',
    bio: profile?.bio ?? '',
  });

  const { mutateAsync } = useMutationProfileModify();

  const onModeChange = () => {
    setEdit(!edit);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData((old) => ({
      ...old,
      [e.target.name]: value,
    }));
  };

  const onSubmit = async () => {
    if (!id) return;
    if (!data.nickname && !data.bio) return;
    await mutateAsync({
      dataId: Number(id),
      ...(data.bio && { bio: data.bio }),
      ...(data.nickname && { nickname: data.nickname }),
      gender: profile?.gender,
    });
    if (typeof onRefresh === 'function') await onRefresh();
    onModeChange();
  };

  const upload = async (file: File) => {
    try {
      const response = await api.uploadResponse({
        file,
        storyType: StoryUploadTypeEnum.PROFILE,
      });

      const {
        data: { ok, result },
      } = response;

      if (ok) {
        await mutateAsync({
          dataId: Number(id),
          defaultProfile: false,
          profileUrl: result.path,
          gender: profile?.gender,
        });
        if (typeof onRefresh === 'function') await onRefresh();
      }
    } catch (error) {
      throw error;
    }
  };

  const onUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    upload(file);
  };

  const onThumbnailRemove = async () => {
    await mutateAsync({
      dataId: Number(id),
      defaultProfile: true,
      gender: profile?.gender,
    });
    if (typeof onRefresh === 'function') await onRefresh();
  };

  return (
    <>
      <section className="flex setting-user-profile">
        <div className="thumbnail-area pr-6 flex flex-col">
          <img
            className="w-32 h-32 rounded-full block object-cover mb-5"
            alt={profile?.nickname}
            src={getUserThumbnail(profile)}
          />
          <Stack spacing={2}>
            <label htmlFor="contained-button-file" className="w-full">
              <input
                className="hidden"
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={onUploadClick}
              />
              <Button variant="contained" component="span" fullWidth>
                이미지 업로드
              </Button>
            </label>
            <Button onClick={onThumbnailRemove}>이미지 제거</Button>
          </Stack>
        </div>
        <div className="info-area">
          <Button size="small" className="float-right" onClick={onModeChange}>
            {edit ? '취소' : '수정'}
          </Button>
          {edit ? (
            <Box component="div" className="space-y-5">
              <TextField
                fullWidth
                id="nickname"
                name="nickname"
                value={data.nickname}
                label="닉네임"
                onChange={onChange}
                placeholder="닉네임을 입력해주세요."
                autoComplete="off"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                id="bio"
                name="bio"
                label="소개"
                multiline
                value={data.bio}
                onChange={onChange}
                placeholder="소개를 입력하세요."
                autoComplete="off"
                minRows={3}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                size="small"
                variant="contained"
                className="float-right"
                onClick={onSubmit}
              >
                저장
              </Button>
            </Box>
          ) : (
            <>
              <h2>{profile?.nickname}</h2>
              <p>{profile?.bio}</p>
            </>
          )}
        </div>
      </section>
      <style jsx>{`
        .setting-user-profile {
          height: 13.75rem;
        }

        .info-area {
          flex: 1 1 0%;
          padding-left: 1.5rem;
          border-left-width: 1px;
          border-left-style: solid;
          border-left-color: rgb(233, 236, 239);
        }

        .info-area h2 {
          font-size: 2.25rem;
          margin: 0;
          line-height: 1.5;
          color: rgb(52, 58, 64);
        }

        .info-area p {
          font-size: 1rem;
          margin-top: 0.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
          color: rgb(134, 142, 150);
        }

        @media (max-width: 768px) {
          .setting-user-profile {
            height: auto;
            flex-direction: column;
          }

          .thumbnail-area {
            align-items: center;
            padding-bottom: 1.5rem;
            padding-right: 0;
          }

          .thumbnail-area img {
            width: 6rem;
            height: 6rem;
            margin-bottom: 1rem;
          }

          .thumbnail-area button {
            width: 10rem;
          }

          .info-area {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            border-top: 1px solid rgb(233, 236, 239);
            border-bottom: 1px solid rgb(233, 236, 239);
            border-left: none;
            padding-left: 0;
          }

          .info-area h2 {
            font-size: 1.25rem;
          }
          .info-area p {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default SettingUserProfile;
