import React from 'react';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

// utils
import { formatDiffText } from '@libs/date/date';

import type { TagSchema } from '@api/schema/story-api';

interface PostHeadProps {
  title: string;
  backgroundColor: string;
  createdAt: string | number;
  tags: TagSchema[];
}
function PostHead({
  title,
  backgroundColor,
  createdAt,
  tags,
}: Partial<PostHeadProps>) {
  return (
    <div className="mt-2 mb-12">
      <Typography variant="h3" gutterBottom component="div">
        {title}
      </Typography>
      <Stack direction="row" spacing={1} className="text-gray-700 mb-3">
        <Stack direction="row" spacing={1} className="">
          <Avatar
            sx={{
              bgcolor: backgroundColor,
              height: 25,
              lineHeight: '1px',
              width: 25,
            }}
          >
            #
          </Avatar>
          <span className="text-gray-800 text-base">{backgroundColor}</span>
        </Stack>
        <span className="separator">&middot;</span>
        <span className="text-gray-800 text-base">
          {formatDiffText(createdAt)}
        </span>
      </Stack>
      <Stack direction="row" spacing={1}>
        {tags?.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            sx={{
              bgcolor: 'gray.300',
              color: 'gray.900',
            }}
          />
        ))}
      </Stack>
    </div>
  );
}

export default PostHead;

// eslint-disable-next-line react/display-name
PostHead.Skeleton = () => (
  <div className="mt-2 mb-12">
    <Typography variant="h2" gutterBottom component="div">
      <Skeleton />
    </Typography>
    <Stack direction="row" spacing={1} className="text-gray-700 mb-3">
      <Stack direction="row" spacing={1} className="">
        <Skeleton animation="wave" variant="circular" width={25} height={25} />
        <Skeleton animation="wave" width={'50px'} />
      </Stack>
      <span className="separator">&middot;</span>
      <span className="text-gray-500 text-base">
        <Skeleton animation="wave" width={'50px'} />
      </span>
    </Stack>
    <Stack direction="row" spacing={1}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} animation="wave" width={'50px'} height={'40px'} />
      ))}
    </Stack>
  </div>
);
