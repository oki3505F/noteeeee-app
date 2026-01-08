import { memo, useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleIcon from "@mui/icons-material/Article";
import { motion, AnimatePresence } from "framer-motion";
import { Note } from "../useNotes";

interface NoteViewProps {
  activeNote: Note;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onDelete: () => void;
}

const getWordCount = (text: string) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

const getCharCount = (text: string) => {
  return text.length;
};

const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = getWordCount(text);
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime || 1;
};

const formatLastEdited = (isoString: string) => {
  if (!isoString) return "Never";
  const date = new Date(isoString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes === 1) return "1 minute ago";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const NoteViewComponent = ({
  activeNote,
  onChange,
  onSave,
  onDelete,
}: NoteViewProps) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = getWordCount(activeNote.content);
  const charCount = getCharCount(activeNote.content);
  const readingTime = getReadingTime(activeNote.content);

  useEffect(() => {
    // Focus title field for new notes, content field for existing ones
    setTimeout(() => {
      if (activeNote.id === "new") {
        titleRef.current?.focus();
      } else {
        contentRef.current?.focus();
        // Move cursor to end
        const content = contentRef.current;
        if (content) {
          content.setSelectionRange(content.value.length, content.value.length);
        }
      }
    }, 100);
  }, [activeNote.id]);

  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [activeNote.title, activeNote.content]);

  const handleSave = async () => {
    setAutoSaving(true);
    setHasUnsavedChanges(false);

    // Simulate auto-save delay
    setTimeout(() => {
      onSave();
      setAutoSaving(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  if (!activeNote) {
    return null;
  }

  const isNewNote = activeNote.id === "new";
  const isEmpty = !activeNote.title.trim() && !activeNote.content.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onKeyDown={handleKeyDown}
    >
      <Paper
        elevation={0}
        sx={{
          background: {
            xs: "transparent",
            sm: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          },
          backdropFilter: { xs: "none", sm: "blur(20px)" },
          border: { xs: "none", sm: "1px solid rgba(255, 255, 255, 0.1)" },
          borderRadius: { xs: 0, sm: 4 },
          overflow: "hidden",
          minHeight: { xs: "calc(100vh - 80px)", sm: "auto" },
        }}
      >
        {/* Header with stats */}
        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            py: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(187, 134, 252, 0.05)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ArticleIcon />
                {isNewNote ? "New Note" : "Edit Note"}
              </Typography>

              {!isNewNote && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 0.5,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  Last edited {formatLastEdited(activeNote.lastEdited)}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip
                label={`${wordCount} words`}
                size="small"
                variant="outlined"
                sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
              />
              <Chip
                label={`${charCount} chars`}
                size="small"
                variant="outlined"
                sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
              />
              {wordCount > 0 && (
                <Chip
                  label={`${readingTime} min read`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                />
              )}
            </Stack>
          </Stack>

          <AnimatePresence>
            {(autoSaving || hasUnsavedChanges) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ mt: 1 }}>
                  {autoSaving && (
                    <LinearProgress
                      sx={{
                        height: 2,
                        borderRadius: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#BB86FC",
                        },
                      }}
                    />
                  )}
                  {hasUnsavedChanges && !autoSaving && (
                    <Typography
                      variant="caption"
                      color="warning.main"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      • Unsaved changes (Ctrl+S to save)
                    </Typography>
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Form content */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ p: { xs: 2, sm: 4 } }}
        >
          <Stack spacing={3}>
            <TextField
              inputRef={titleRef}
              label="Title"
              name="title"
              value={activeNote.title}
              onChange={onChange}
              fullWidth
              variant="filled"
              placeholder="Enter your note title..."
              InputProps={{
                sx: {
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  fontWeight: 600,
                },
              }}
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(187, 134, 252, 0.1)",
                  },
                },
              }}
            />

            <TextField
              inputRef={contentRef}
              label="Content"
              name="content"
              value={activeNote.content}
              onChange={onChange}
              fullWidth
              multiline
              rows={window.innerHeight < 700 ? 8 : 12}
              variant="filled"
              placeholder="Start writing your note..."
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(187, 134, 252, 0.1)",
                  },
                },
                "& .MuiInputBase-input": {
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                },
              }}
            />

            {/* Action buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={autoSaving || isEmpty}
                startIcon={autoSaving ? undefined : <SaveIcon />}
                size="large"
                sx={{
                  minHeight: 48,
                  borderRadius: 3,
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(187, 134, 252, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(187, 134, 252, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {autoSaving ? "Saving..." : "Save Note"}
              </Button>

              {!isNewNote && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onDelete}
                  startIcon={<DeleteIcon />}
                  size="large"
                  sx={{
                    minHeight: 48,
                    borderRadius: 3,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 15px rgba(244, 67, 54, 0.3)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Delete Note
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Paper>

      {/* Floating save button for mobile */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            style={{
              position: "fixed",
              bottom: 24,
              left: 24,
              zIndex: 1000,
              display: "block",
            }}
          >
            <Tooltip title="Save changes (Ctrl+S)" placement="top">
              <IconButton
                onClick={handleSave}
                disabled={autoSaving}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 15px rgba(187, 134, 252, 0.4)",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: "0 6px 20px rgba(187, 134, 252, 0.5)",
                    transform: "scale(1.1)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(187, 134, 252, 0.3)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: { xs: "flex", sm: "none" },
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const NoteView = memo(NoteViewComponent);
