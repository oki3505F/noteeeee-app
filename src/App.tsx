import { useState, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { darkTheme, lightTheme } from "./theme";
import { useNotes, Note } from "./useNotes";
import { NoteList } from "./components/NoteList";
import { NoteView } from "./components/NoteView";
import { SearchBar } from "./components/SearchBar";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

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
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("themeMode");
    return (saved as "light" | "dark") || "dark";
  });
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
      const { title, content, images } = activeNote;
      addNote({ title, content, images });
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

  const handleDeleteSpecificNote = useCallback(
    (note: Note) => {
      if (note.id && note.id !== "new") {
        deleteNote(note.id);
        showNotification("Note deleted successfully");
      }
    },
    [deleteNote, showNotification],
  );

  const handleBack = useCallback(() => {
    setActiveNote(null);
    setSearchQuery("");
  }, []);

  const handleTogglePin = useCallback(
    (note: Note) => {
      if (note.id) {
        updateNote({ ...note, pinned: !note.pinned });
        showNotification(
          note.pinned ? "Note unpinned" : "Note pinned to top"
        );
      }
    },
    [updateNote, showNotification]
  );

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", next);
      return next;
    });
  }, []);

  const currentTheme = themeMode === "dark" ? darkTheme : lightTheme;

  const getAppBarTitle = () => {
    if (activeNote) {
      return activeNote.id !== "new" ? "Edit Note" : "New Note";
    }
    return `Notes (${notes.length})`;
  };

  const handleImageAdd = useCallback((base64: string) => {
    setActiveNote((prevNote) => {
      if (!prevNote) return null;
      return {
        ...prevNote,
        images: [...(prevNote.images || []), base64],
      };
    });
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(20, 18, 24, 0.8)",
          paddingTop: "env(safe-area-inset-top)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
          <Stack spacing={2}>
            {/* Header Row: Title & Action */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 48,
              }}
            >
              <AnimatePresence mode="wait">
                {activeNote ? (
                  <motion.div
                    key="back-button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key="app-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        background: "linear-gradient(to right, #D0BCFF, #E8DEF8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Notes
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {!activeNote && (
                  <>
                    <IconButton
                      onClick={toggleTheme}
                      sx={{
                        color: themeMode === "dark" ? "rgba(230, 225, 229, 0.7)" : "inherit",
                      }}
                    >
                      {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton
                      onClick={toggleViewMode}
                      sx={{
                        color: themeMode === "dark" ? "rgba(230, 225, 229, 0.7)" : "inherit",
                      }}
                    >
                      {viewMode === "grid" ? (
                        <ViewListIcon />
                      ) : (
                        <ViewModuleIcon />
                      )}
                    </IconButton>
                  </>
                )}
                {activeNote && (
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {getAppBarTitle()}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Search Bar Row - Permanent */}
            {!activeNote && (
              <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  resultCount={filteredNotes.length}
                  totalCount={notes.length}
                />
              </motion.div>
            )}
          </Stack>
        </Container>
      </AppBar>

      {/* Spacer for Fixed AppBar */}
      <Box
        sx={{
          height: activeNote
            ? "calc(64px + env(safe-area-inset-top))"
            : "calc(130px + env(safe-area-inset-top))",
          transition: "height 0.3s ease",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          mt: activeNote ? { xs: 0, sm: 4 } : { xs: 2, sm: 4 },
          mb: { xs: 10, sm: 12 },
          px: activeNote ? { xs: 0, sm: 3 } : { xs: 2, sm: 3 },
          maxWidth: activeNote ? { xs: "100%" } : undefined
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
                onImageAdd={handleImageAdd}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
              />
            ) : (
              <NoteList
                notes={filteredNotes}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteSpecificNote}
                onTogglePin={handleTogglePin}
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
