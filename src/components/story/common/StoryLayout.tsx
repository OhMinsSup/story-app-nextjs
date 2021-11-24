import React from 'react';
import Grid from '@mui/material/Grid';

const StoryLayout: React.FC = ({ children }) => {
  return (
    <Grid container spacing={3} sx={{ mt: '3rem', mb: '5rem', px: '2rem' }}>
      <Grid item xs={12} className=" space-y-4">
        {children}
      </Grid>
    </Grid>
  );
};

export default StoryLayout;
