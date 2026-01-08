import { memo } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
  totalCount?: number;
}

const SearchBarComponent = ({
  searchQuery,
  onSearchChange,
}: SearchBarProps) => {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <TextField
      fullWidth
      placeholder="Search notes..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "rgba(230, 225, 229, 0.7)" }} />
          </InputAdornment>
        ),
        endAdornment: searchQuery && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClear}
              sx={{ color: "rgba(230, 225, 229, 0.7)" }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(230, 225, 229, 0.12)",
          borderRadius: 24, // Pill shape
          height: 48,
          "& fieldset": { border: "none" },
          "&.Mui-focused": {
            backgroundColor: "rgba(230, 225, 229, 0.16)",
            boxShadow: "0 0 0 2px #D0BCFF",
          },
          "&:hover": {
            backgroundColor: "rgba(230, 225, 229, 0.16)",
          },
        },
        "& .MuiInputBase-input": {
          color: "#E6E1E5",
          fontSize: "1rem",
        },
      }}
    />
  );
};

export const SearchBar = memo(SearchBarComponent);
