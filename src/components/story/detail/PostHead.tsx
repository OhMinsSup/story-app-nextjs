import React from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

const PostHead = () => {
  return (
    <div className="mt-2 mb-12">
      <Typography variant="h3" gutterBottom component="div">
        h2. Heading
      </Typography>
      <Stack direction="row" spacing={1} className="text-gray-700 mb-3">
        <Stack direction="row" spacing={1} className="">
          <Avatar
            sx={{
              bgcolor: '#0ca678',
              height: 25,
              width: 25,
            }}
          >
            -
          </Avatar>
          <span className="text-gray-800 text-base">#0ca678</span>
        </Stack>
        <span className="separator">&middot;</span>
        <span className="text-gray-800 text-base">2일전</span>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="#tag1" />
        <Chip label="#tag2" />
      </Stack>
    </div>
  );
};

export default PostHead;
