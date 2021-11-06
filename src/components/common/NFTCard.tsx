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
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MockIllustrationItem } from '@api/local/get-mock-illustractions';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface NFTCardProps {
  item: MockIllustrationItem;
}

const NFTCard: React.FC<NFTCardProps> = ({ item }) => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

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
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{item.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NFTCard;
