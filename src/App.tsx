import { useState, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnimatePresence, motion, Transition } from "framer-motion";
import theme from "./theme";
import { useNotes, Note } from "./useNotes";
import { NoteList } from "./components/NoteList";
import { NoteView } from "./components/NoteView";

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

const MotionFab = motion(Fab);

function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const handleSelectNote = useCallback((note: Note) => {
    setActiveNote(note);
  }, []);

  const handleCreateNew = useCallback(() => {
    setActiveNote({ id: "new", title: "", content: "", lastEdited: "" });
  }, []);

  const handleActiveNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setActiveNote((prevNote) =>
        prevNote ? { ...prevNote, [name]: value } : null,
      );
    },
    [],
  );

  const handleSaveNote = useCallback(() => {
    if (!activeNote) return;

    if (activeNote.id && activeNote.id !== "new") {
      updateNote(activeNote);
    } else {
      const { title, content } = activeNote;
      addNote({ title, content });
    }
    setActiveNote(null);
  }, [activeNote]);

  const handleDeleteNote = useCallback(() => {
    if (activeNote && activeNote.id && activeNote.id !== "new") {
      deleteNote(activeNote.id);
    }
    setActiveNote(null);
  }, [activeNote]);

  const handleBack = useCallback(() => {
    setActiveNote(null);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <AnimatePresence>
            {activeNote && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Fab
                  color="secondary"
                  size="small"
                  sx={{ mr: 2 }}
                  onClick={handleBack}
                >
                  <ArrowBackIcon />
                </Fab>
              </motion.div>
            )}
          </AnimatePresence>
          <Typography variant="h6" component="div">
            {activeNote
              ? activeNote.id !== "new"
                ? "Edit Note"
                : "New Note"
              : "Notes"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container sx={{ mt: 4, mb: 12 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNote ? "note-view" : "note-list"}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {activeNote ? (
              <NoteView
                activeNote={activeNote}
                onChange={handleActiveNoteChange}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
              />
            ) : (
              <NoteList notes={notes} onSelectNote={handleSelectNote} />
            )}
          </motion.div>
        </AnimatePresence>
      </Container>

      <AnimatePresence>
        {!activeNote && (
          <MotionFab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 32, right: 32 }}
            onClick={handleCreateNew}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AddIcon />
          </MotionFab>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
