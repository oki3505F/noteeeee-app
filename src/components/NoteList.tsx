import { memo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Note } from "../useNotes";

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

const formatDate = (isoString: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const NoteListComponent = ({ notes, onSelectNote }: NoteListProps) => {
  if (notes.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="text.secondary">
          No notes yet.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Click the '+' button to create one!
        </Typography>
      </Box>
    );
  }

  // Sort notes by most recently edited
  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  );

  return (
    <Grid container spacing={3}>
      {sortedNotes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note.id}>
          <Card
            onClick={() => onSelectNote(note)}
            sx={{
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="div" noWrap>
                {note.title || "Untitled Note"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, height: "3em", overflow: "hidden" }}
              >
                {note.content}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Typography variant="caption" color="text.secondary">
                {formatDate(note.lastEdited)}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export const NoteList = memo(NoteListComponent);
