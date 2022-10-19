import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

const Search = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  'marginLeft': 0,
  'width': '100%',
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function SearchBar({onSearch, fields, onSearchBy, by}) {
  const [search, setSearch] = React.useState('');

  const handleChange = (newSearch) => {
    setSearch(newSearch);
    onSearch(newSearch);
  };

  const handleByChange = (event) => {
    setSearch('');
    onSearchBy(event.target.value);
  };

  return (
    <Box sx={{display: 'flex', width: '100%', flexGrow: 1}}>
      <FormControl sx={{width: '200px'}}>
        <InputLabel id="search-by-select">Buscar por</InputLabel>
        <Select
          labelId="search-by-select"
          id="selecy-by"
          value={by}
          label="Buscar por"
          onChange={handleByChange}
        >
          {fields.map((field, idx) => {
            return <MenuItem key={idx} value={field.id}>{field.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{width: '100%'}}
          placeholder="Search…"
          inputProps={{'aria-label': 'search'}}
          value={search}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Search>
    </Box>
  );
}
