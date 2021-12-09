import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { LinearProgressProps } from '@mui/material/LinearProgress';

interface LinearProgressWithLabelProps extends LinearProgressProps {
  value: number;
}
const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = (
  props: LinearProgressProps & { value: number },
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
export default LinearProgressWithLabel;
