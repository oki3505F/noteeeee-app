import { memo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Note } from "../useNotes";

interface NoteViewProps {
  activeNote: Note;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onDelete: () => void;
}

const NoteViewComponent = ({
  activeNote,
  onChange,
  onSave,
  onDelete,
}: NoteViewProps) => {
  if (!activeNote) {
    return null; // Should not happen if logic in App.tsx is correct
  }

  return (
    <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
      <Box component="form" noValidate autoComplete="off">
        <Stack spacing={3}>
          <TextField
            label="Title"
            name="title"
            value={activeNote.title}
            onChange={onChange}
            fullWidth
            variant="filled"
          />
          <TextField
            label="Content"
            name="content"
            value={activeNote.content}
            onChange={onChange}
            fullWidth
            multiline
            rows={12}
            variant="filled"
          />
          <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSave}
              size="large"
            >
              Save
            </Button>
            {activeNote.id !== "new" && (
              <Button variant="outlined" color="secondary" onClick={onDelete}>
                Delete
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export const NoteView = memo(NoteViewComponent);
