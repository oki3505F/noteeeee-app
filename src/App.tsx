import { useState, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { AnimatePresence, motion, Transition } from "framer-motion";
import theme from "./theme";
import { useNotes, Note } from "./useNotes";
import { NoteList } from "./components/NoteList";
import { NoteView } from "./components/NoteView";
import { SearchBar } from "./components/SearchBar";

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 },
};

const pageTransition: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 100,
  duration: 0.3,
};

const MotionFab = motion(Fab);

export type ViewMode = "grid" | "list";

function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "success" });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const showNotification = useCallback(
    (message: string, severity: "success" | "error" | "info" = "success") => {
      setNotification({ open: true, message, severity });
    },
    [],
  );

  const handleCloseNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

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

    if (!activeNote.title.trim() && !activeNote.content.trim()) {
      showNotification("Cannot save empty note", "error");
      return;
    }

    if (activeNote.id && activeNote.id !== "new") {
      updateNote(activeNote);
      showNotification("Note updated successfully");
    } else {
      const { title, content } = activeNote;
      addNote({ title, content });
      showNotification("Note created successfully");
    }
    setActiveNote(null);
  }, [activeNote, addNote, updateNote, showNotification]);

  const handleDeleteNote = useCallback(() => {
    if (activeNote && activeNote.id && activeNote.id !== "new") {
      deleteNote(activeNote.id);
      showNotification("Note deleted successfully");
    }
    setActiveNote(null);
  }, [activeNote, deleteNote, showNotification]);

  const handleBack = useCallback(() => {
    setActiveNote(null);
    setShowSearch(false);
    setSearchQuery("");
  }, []);

  const toggleSearch = useCallback(() => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  }, [showSearch]);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  }, []);

  const getAppBarTitle = () => {
    if (activeNote) {
      return activeNote.id !== "new" ? "Edit Note" : "New Note";
    }
    return `Notes (${notes.length})`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(30, 30, 30, 0.9)",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 3 } }}>
          <AnimatePresence>
            {activeNote && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <IconButton
                  color="inherit"
                  size="large"
                  sx={{ mr: 1 }}
                  onClick={handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            {getAppBarTitle()}
          </Typography>

          {!activeNote && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  color="inherit"
                  onClick={toggleViewMode}
                  size="large"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
                </IconButton>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton color="inherit" onClick={toggleSearch} size="large">
                  <SearchIcon />
                </IconButton>
              </motion.div>
            </Box>
          )}
        </Toolbar>

        <AnimatePresence>
          {showSearch && !activeNote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden" }}
            >
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                resultCount={filteredNotes.length}
                totalCount={notes.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </AppBar>

      <Toolbar />
      {showSearch && !activeNote && <Box sx={{ height: 72 }} />}

      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: 2, sm: 4 },
          mb: { xs: 10, sm: 12 },
          px: { xs: 2, sm: 3 },
        }}
      >
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
              <NoteList
                notes={filteredNotes}
                onSelectNote={handleSelectNote}
                viewMode={viewMode}
                searchQuery={searchQuery}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </Container>

      <AnimatePresence>
        {!activeNote && (
          <MotionFab
            color="primary"
            aria-label="add note"
            sx={{
              position: "fixed",
              bottom: { xs: 24, sm: 32 },
              right: { xs: 24, sm: 32 },
              zIndex: 1000,
            }}
            onClick={handleCreateNew}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 8px 25px rgba(187, 134, 252, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
            }}
          >
            <AddIcon />
          </MotionFab>
        )}
      </AnimatePresence>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: { xs: 80, sm: 100 } }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
