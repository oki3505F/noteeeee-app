import { memo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
}

const SearchBarComponent = ({
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
}: SearchBarProps) => {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        pb: 2,
        background: "linear-gradient(135deg, rgba(187, 134, 252, 0.1) 0%, rgba(3, 218, 198, 0.1) 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <TextField
          fullWidth
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 1)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(187, 134, 252, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#BB86FC",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.6)",
                opacity: 1,
              },
            },
          }}
        />

        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: "block",
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
              }}
            >
              {resultCount > 0
                ? `Found ${resultCount} of ${totalCount} notes`
                : `No notes found matching "${searchQuery}"`
              }
            </Typography>
          </motion.div>
        )}
      </motion.div>
    </Box>
  );
};

export const SearchBar = memo(SearchBarComponent);
