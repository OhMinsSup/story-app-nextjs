import Button from '@mui/material/Button';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';

type ThumbnailModifyProps = {
  visible: boolean;
  onResetThumbnail: () => void;
  onChangeThumbnail: () => void;
};
const ThumbnailModify: React.FC<ThumbnailModifyProps> = ({
  visible,
  onResetThumbnail,
  onChangeThumbnail,
}) => {
  if (!visible) return null;
  return (
    <ThumbnailModifyBlock>
      <div className="actions flex items-center">
        <Button size="small" onClick={onChangeThumbnail}>
          재업로드
        </Button>
        <Divider orientation="vertical" flexItem />

        <Button size="small" onClick={onResetThumbnail}>
          제거
        </Button>
      </div>
    </ThumbnailModifyBlock>
  );
};

interface ThumbnailProps {
  thumbnail: string | null;
  onUploadClick: () => void;
}
const Thumbnail: React.FC<ThumbnailProps> = ({ onUploadClick, thumbnail }) => {
  return (
    <>
      <ThumbnailModify
        visible={!!thumbnail}
        onResetThumbnail={() => {}}
        onChangeThumbnail={() => {}}
      />
      <ThumbnailSizer>
        <ThumbnailBlock>
          {thumbnail ? (
            <Image src={thumbnail} data-testid="image" alt="image" />
          ) : (
            <MissingThumbnail>
              <ImageOutlinedIcon className="w-32 h-32 text-gray-400" />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="outlined" component="span">
                  썸네일 업로드
                </Button>
              </label>
            </MissingThumbnail>
          )}
        </ThumbnailBlock>
      </ThumbnailSizer>
    </>
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
