import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/system/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ActionMenu from '@components/story/common/ActionMenu';

// store
import { useStore } from '@store/store';

// types
import type { UserModel } from '@api/schema/story-api';

interface NavigationTopbarProps {
  creatorUser?: UserModel;
}
const NavigationTopbar: React.FC<NavigationTopbarProps> = ({ creatorUser }) => {
  const router = useRouter();
  const { userInfo } = useStore();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const onBackHandler = () => {
    router.back();
  };

  const onActionOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onActionClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
                <IconButton
                  id="action-button"
                  aria-label="more"
                  color="secondary"
                  aria-controls="action-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={onActionOpen}
                >
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
      <ActionMenu open={open} anchorEl={anchorEl} onClose={onActionClose} />
    </>
  );
};

export default NavigationTopbar;
