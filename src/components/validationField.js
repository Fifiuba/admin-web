import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#E1E2E1',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#E1E2E1',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1e85c1',
    },
    '&:hover fieldset': {
      borderColor: '#E1E2E1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E1E2E1',
    },
  },
});

export default function ValidationField({
  label, value, enabled, onChange, valid, type, errMsg}) {
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
        <CssTextField
          type={type}
          disabled={!enabled}
          error={!valid}
          fullWidth
          id="validation-input"
          label={(valid ? label : 'Error')}
          value={value}
          helperText={(valid ? '' : errMsg)}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-root': {color: '#E1E2E1'},
            '& .MuiFormLabel-root': {color: '#003c8f'},
            '&:hover .MuiFormLabel-root': {color: '#E1E2E1'},
          }}
        />
      </div>
    </Box>
  );
}
