import React from 'react';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// utils
import { formatDiffText } from '@libs/date/date';

// api
import { useStoryQuery } from '@api/story/story';

interface PostHeadProps {}
const PostHead: React.FC<PostHeadProps> = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useStoryQuery(id);

  return (
    <div className="mt-2 mb-12">
      <Typography variant="h3" gutterBottom component="div">
        {data?.result.name}
      </Typography>
      <Stack direction="row" spacing={1} className="text-gray-700 mb-3">
        <Stack direction="row" spacing={1} className="">
          <Avatar
            sx={{
              bgcolor: data?.result.backgroundColor,
              height: 25,
              width: 25,
            }}
          >
            -
          </Avatar>
          <span className="text-gray-800 text-base">
            {data?.result.backgroundColor}
          </span>
        </Stack>
        <span className="separator">&middot;</span>
        <span className="text-gray-800 text-base">
          {formatDiffText(data?.result.createdAt)}
        </span>
      </Stack>
      <Stack direction="row" spacing={1}>
        {data?.result.tags.map((tag) => (
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
};

export default PostHead;
