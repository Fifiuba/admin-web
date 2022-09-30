import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ValidationField({
  label, value, enabled, onChange, valid, type,errMsg}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          type={type}
          disabled={!enabled}
          error={!valid}
          fullWidth
          id="outlined-error-helper-text"
          label={(valid ? label : 'Error')}
          value={value}
          helperText={(valid ? '' : {errMsg})}
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}
