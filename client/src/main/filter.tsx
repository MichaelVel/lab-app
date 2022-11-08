import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function FilterSearch() {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <Box sx={{ 
        minWidth: 120, 
        padding: "0em 0.5em",
    }}
    >
      <FormControl fullWidth size="small">
        <InputLabel id="filter-label">Filtrar</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="author">Autor</MenuItem>
          <MenuItem value="name">Nombre</MenuItem>
          <MenuItem value="topic">Tema</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
