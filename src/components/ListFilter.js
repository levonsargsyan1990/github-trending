import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ListFilter = ({ filter, onFilterChange }) => {
  return (
    <FormControl>
      <InputLabel id="filter-select-label">Filter</InputLabel>
      <Select
        value={filter}
        label="Filter"
        labelId="filter-select-label"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="favorite">Favorite</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ListFilter;