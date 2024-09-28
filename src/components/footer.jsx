import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ColorChips() {
  return (
      <Chip label="Date" color="success" sx={{ position: 'absolute', bottom: 0, ml: 2 }}/>
  );
}
