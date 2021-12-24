import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

// utils
import { getUserThumbnail } from '@utils/utils';

// types
import type { ProfileModel } from '@api/schema/story-api';

interface OwnerUserProps {
  ownerProfile: ProfileModel;
  creatorProfile: ProfileModel;
}
function OwnerUser({ ownerProfile, creatorProfile }: Partial<OwnerUserProps>) {
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
            src={getUserThumbnail(creatorProfile)}
            alt={creatorProfile?.nickname}
          />
        </ListItemAvatar>
        <ListItemText
          primary="Created By"
          secondary={creatorProfile?.nickname}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src={getUserThumbnail(ownerProfile)}
            alt={ownerProfile?.nickname}
          />
        </ListItemAvatar>
        <ListItemText primary="Owned By" secondary={ownerProfile?.nickname} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default OwnerUser;

// eslint-disable-next-line react/display-name
OwnerUser.Skeleton = () => {
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
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton animation="wave" width={'100px'} />}
          secondary={<Skeleton animation="wave" width={'200px'} />}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton animation="wave" width={'100px'} />}
          secondary={<Skeleton animation="wave" width={'200px'} />}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};
