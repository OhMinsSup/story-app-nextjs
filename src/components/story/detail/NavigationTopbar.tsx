import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/system/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface NavigationTopbarProps {}
const NavigationTopbar: React.FC<NavigationTopbarProps> = () => {
  const router = useRouter();

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
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <IconButton aria-label="share" color="secondary">
              <ShareOutlinedIcon />
            </IconButton>
            <IconButton aria-label="declaration" color="secondary">
              <ErrorOutlineOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
    </Box>
  );
};

export default NavigationTopbar;
