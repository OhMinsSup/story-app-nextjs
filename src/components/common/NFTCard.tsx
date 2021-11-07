import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// common
import { blurDataUrl } from '@utils/utils';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import { MockIllustrationItem } from '@api/local/get-mock-illustractions';

interface NFTCardProps {
  item: MockIllustrationItem;
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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.name}
        subheader={`CreateBy ${item.nickname}`}
      />
      <CardMedia
        sx={{ backgroundColor: item.background_color }}
        className="h-40 object-contain justify-center flex"
        component="div"
      >
        <Image
          src={item.image}
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
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
