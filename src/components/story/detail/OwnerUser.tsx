import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Divider from '@mui/material/Divider';
import { getUserThumbnail } from '@utils/utils';
import { useStoryQuery } from '@api/story/story';
import { useRouter } from 'next/router';

const OwnerUser = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useStoryQuery(id);

  const creator = data?.result.user;
  const owner = data?.result.user;

  return (
    <List
      className="flex flex-wrap md:flex-nowrap"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src={getUserThumbnail({
              defaultProfile: !!creator?.profile.defaultProfile,
              avatarSvg: creator?.profile.avatarSvg,
              profileUrl: creator?.profile.profileUrl,
              nickname: creator?.profile.nickname,
            })}
            alt={creator?.profile.nickname}
          />
        </ListItemAvatar>
        <ListItemText
          primary="Created By"
          secondary={creator?.profile.nickname}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src={getUserThumbnail({
              defaultProfile: !!owner?.profile.defaultProfile,
              avatarSvg: owner?.profile.avatarSvg,
              profileUrl: owner?.profile.profileUrl,
              nickname: owner?.profile.nickname,
            })}
            alt={owner?.profile.nickname}
          />
        </ListItemAvatar>
        <ListItemText primary="Owned By" secondary={owner?.profile.nickname} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default OwnerUser;
