import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/system/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// store
import { useStore } from '@store/store';

// types
import type { UserModel } from 'types/story-api';

interface NavigationTopbarProps {
  creatorUser?: UserModel;
}
const NavigationTopbar: React.FC<NavigationTopbarProps> = ({ creatorUser }) => {
  const router = useRouter();
  const { userInfo } = useStore();

  const onBackHandler = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Box component="div" sx={{ mt: '24px', mb: '24px' }}>
      <div className="flex justify-between">
        <div>
          <IconButton
            aria-label="back arrow"
            color="secondary"
            onClick={onBackHandler}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div>
          <ButtonGroup
            variant="outlined"
            fullWidth={true}
            disableElevation={false}
            aria-label="outlined button group"
          >
            <IconButton aria-label="share" color="secondary">
              <ShareOutlinedIcon />
            </IconButton>
            {creatorUser?.id === userInfo?.id ? (
              <IconButton aria-label="more" color="secondary">
                <MoreVertIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="declaration" color="secondary">
                <ErrorOutlineOutlinedIcon />
              </IconButton>
            )}
          </ButtonGroup>
        </div>
      </div>
    </Box>
  );
};

export default NavigationTopbar;
