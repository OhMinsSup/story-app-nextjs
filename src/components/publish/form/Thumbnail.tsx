import React from 'react';
import { styled } from '@mui/system';

// components
import Button from '@mui/material/Button';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';

// hooks
import { useFormContext } from 'react-hook-form';

// api
import { api } from '@api/module';

// types
import { StoryUploadTypeEnum } from '@api/schema/enum';

interface ThumbnailModifyProps {
  visible: boolean;
  onResetThumbnail: () => void;
  onChangeThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ThumbnailModify: React.FC<ThumbnailModifyProps> = ({
  visible,
  onResetThumbnail,
  onChangeThumbnail,
}) => {
  if (!visible) return null;
  return (
    <ThumbnailModifyBlock>
      <div className="actions flex items-center">
        <label htmlFor="reUpload-button-file">
          <Input
            accept="image/*"
            id="reUpload-button-file"
            type="file"
            onChange={onChangeThumbnail}
          />
          <Button size="small" component="span">
            재업로드
          </Button>
        </label>
        <Divider orientation="vertical" flexItem />
        <Button size="small" onClick={onResetThumbnail}>
          제거
        </Button>
      </div>
    </ThumbnailModifyBlock>
  );
};

const Thumbnail: React.FC = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchMedia = watch('media');

  const upload = async (file: File) => {
    try {
      const response = await api.uploadResponse({
        file,
        storyType: StoryUploadTypeEnum.STORY,
      });

      const {
        data: { ok, result },
      } = response;

      if (ok) {
        setValue(
          'media',
          {
            idx: result.id,
            name: result.name,
            contentUrl: result.path,
          },
          {
            shouldValidate: true,
          },
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const onResetClick = () => {
    setValue('media', null, {
      shouldValidate: true,
    });
  };

  const onUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    upload(file);
  };

  return (
    <div className="mt-3">
      <ThumbnailModify
        visible={!!watchMedia}
        onResetThumbnail={onResetClick}
        onChangeThumbnail={onUploadClick}
      />
      <ThumbnailSizer>
        <ThumbnailBlock>
          {watchMedia ? (
            <Image src={watchMedia.contentUrl} alt="story thumbnail" />
          ) : (
            <MissingThumbnail>
              <ImageOutlinedIcon className="w-32 h-32 text-gray-400" />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={onUploadClick}
                />
                <Button variant="outlined" component="span">
                  썸네일 업로드
                </Button>
              </label>
            </MissingThumbnail>
          )}
        </ThumbnailBlock>
      </ThumbnailSizer>
      {errors.media?.message && (
        <FormHelperText error>{(errors as any).media.message}</FormHelperText>
      )}
    </div>
  );
};

export default Thumbnail;

const ThumbnailSizer = styled('div')({
  width: '100%',
  height: '300px',
  position: 'relative',
});

const ThumbnailBlock = styled('div')({
  width: '100%',
  height: '100%',
});

const MissingThumbnail = styled('div')({
  width: '100%',
  height: '100%',
  background: 'rgb(233, 236, 239)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
});

const Input = styled('input')({
  display: 'none',
});

const ThumbnailModifyBlock = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '0.5rem',
});
