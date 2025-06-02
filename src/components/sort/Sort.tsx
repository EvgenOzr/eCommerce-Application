import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FIRST_PAGE, SORT_OPTIONS } from "../../types/constants";
import { SortProps } from "../../types/shopTypes";

function Sort({ sortOption, setSortOption, setSearchParams }: SortProps) {
  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setSortOption(value);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      params.set("page", FIRST_PAGE.toString());
      return params;
    });
  };

  return (
    <FormControl sx={{ m: 2, minWidth: 150 }} size="small">
      <InputLabel
        id="sort-label"
        sx={{
          color: "#a0522d",
          "&.Mui-focused": {
            color: "#a0522d",
          },
        }}
      >
        Sort By
      </InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={sortOption}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem
          value=""
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#a0522d",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#8b4513",
              },
            },
          }}
        >
          Default
        </MenuItem>
        <MenuItem
          value={SORT_OPTIONS.PRICE_ASC}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#a0522d",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#8b4513",
              },
            },
          }}
        >
          Price: Low to High
        </MenuItem>
        <MenuItem
          value={SORT_OPTIONS.PRICE_DESC}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#a0522d",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#8b4513",
              },
            },
          }}
        >
          Price: High to Low
        </MenuItem>
        <MenuItem
          value={SORT_OPTIONS.NAME_ASC}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#a0522d",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#8b4513",
              },
            },
          }}
        >
          Name: A-Z
        </MenuItem>
        <MenuItem
          value={SORT_OPTIONS.NAME_DESC}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#a0522d",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#8b4513",
              },
            },
          }}
        >
          Name: Z-A
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sort;
