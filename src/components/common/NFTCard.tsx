import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// common
import { blurDataUrl, getUserThumbnail } from '@utils/utils';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import { StorySchema } from 'types/story-api';

interface NFTCardProps {
  item: StorySchema;
}

function NFTCard({ item }: NFTCardProps) {
  const router = useRouter();

  const onMoveToPage = useCallback(() => {
    router.push(`/publish/3`);
  }, [router, item]);

  return (
    <Card sx={{ width: 345 }} onClick={onMoveToPage}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: item.backgroundColor }}
            src={getUserThumbnail(item.user.profile)}
            aria-label="recipe"
            imgProps={{
              alt: item.user.profile.nickname,
              loading: 'lazy',
            }}
          >
            {item.user.profile.nickname}
          </Avatar>
        }
        title={item.name}
        subheader={`CreateBy ${item.user.profile.nickname}`}
      />
      <CardMedia
        sx={{ backgroundColor: item.backgroundColor }}
        className="h-40 object-contain justify-center flex"
        component="div"
      >
        <Image
          src={item.media.contentUrl}
          loading="lazy"
          placeholder="blur"
          width={200}
          height={200}
          blurDataURL={blurDataUrl(200, 200)}
          alt={item.name}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary" noWrap>
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NFTCard;

// eslint-disable-next-line react/display-name
NFTCard.Skeleton = () => {
  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
};
