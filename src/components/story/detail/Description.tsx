import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

interface DescriptionProps {
  description: string;
}
function Description({ description }: DescriptionProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom className="font-bold">
        설명
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
    </>
  );
}

export default Description;

// eslint-disable-next-line react/display-name
Description.Skeleton = () => (
  <>
    <Typography variant="h5" gutterBottom className="font-bold">
      <Skeleton width={'120px'} />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Typography>
  </>
);
