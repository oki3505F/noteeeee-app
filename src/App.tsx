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
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PushPinIcon from "@mui/icons-material/PushPin";
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
  const { notes, addNote, updateNote, deleteNote, deleteNotes } = useNotes();
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || note.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

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
      const { title, content, images, color, tags } = activeNote;
      addNote({ title, content, images, color, tags });
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

  const handleToggleSelection = useCallback((id: string) => {
    setSelectedNoteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNoteIds([]);
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedNoteIds.length > 0) {
      deleteNotes(selectedNoteIds);
      showNotification(`Deleted ${selectedNoteIds.length} notes`);
      clearSelection();
    }
  }, [selectedNoteIds, deleteNotes, showNotification, clearSelection]);

  const handleBulkPin = useCallback(() => {
    if (selectedNoteIds.length > 0) {
      const allSelectedNotes = notes.filter((n) =>
        selectedNoteIds.includes(n.id),
      );
      const allPinned = allSelectedNotes.every((n) => n.pinned);

      allSelectedNotes.forEach((note) => {
        updateNote({ ...note, pinned: !allPinned });
      });

      showNotification(
        allPinned ? "Unpinned selected notes" : "Pinned selected notes",
      );
      clearSelection();
    }
  }, [selectedNoteIds, notes, updateNote, showNotification, clearSelection]);

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

  const handleImageAdd = useCallback((base64: string) => {
    setActiveNote((prevNote) => {
      if (!prevNote) return null;
      return {
        ...prevNote,
        images: [...(prevNote.images || []), base64],
      };
    });
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setActiveNote((prev) => (prev ? { ...prev, color } : null));
  }, []);

  const handleTagsChange = useCallback((tags: string[]) => {
    setActiveNote((prev) => (prev ? { ...prev, tags } : null));
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            pt: "env(safe-area-inset-top)",
            bgcolor: selectedNoteIds.length > 0 ? "primary.dark" : "rgba(20, 18, 24, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <Container maxWidth="lg">
            {selectedNoteIds.length > 0 ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ height: 64 }}
              >
                <IconButton color="inherit" onClick={clearSelection}>
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                  {selectedNoteIds.length} selected
                </Typography>
                <IconButton color="inherit" onClick={handleBulkPin}>
                  <PushPinIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleBulkDelete}>
                  <DeleteSweepIcon />
                </IconButton>
              </Stack>
            ) : activeNote ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ height: 64 }}
              >
                <IconButton color="inherit" onClick={handleBack} edge="start">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                  {activeNote.id === "new" ? "New Note" : "Edit Note"}
                </Typography>
                <IconButton color="inherit" onClick={toggleTheme}>
                  {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Stack>
            ) : (
              <Stack spacing={0} sx={{ py: 1.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      background: "linear-gradient(to right, #BB86FC, #03DAC6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Notes
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton color="inherit" onClick={toggleTheme}>
                      {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton onClick={toggleViewMode} color="inherit">
                      {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
                    </IconButton>
                  </Stack>
                </Stack>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  resultCount={filteredNotes.length}
                  totalCount={notes.length}
                />

                {allTags.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      mt: 1,
                      overflowX: "auto",
                      pb: 0.5,
                      "&::-webkit-scrollbar": { display: "none" }
                    }}
                  >
                    <Chip
                      label="All"
                      onClick={() => setSelectedTag(null)}
                      size="small"
                      variant={selectedTag === null ? "filled" : "outlined"}
                      sx={{ borderRadius: 2 }}
                    />
                    {allTags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        size="small"
                        variant={selectedTag === tag ? "filled" : "outlined"}
                        sx={{ borderRadius: 2 }}
                      />
                    ))}
                  </Stack>
                )}
              </Stack>
            )}
          </Container>
        </AppBar>

        {/* Spacer for Fixed AppBar */}
        <Box
          sx={{
            height: activeNote || selectedNoteIds.length > 0
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
            maxWidth: activeNote ? { xs: "100%" } : undefined,
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
                  onColorChange={handleColorChange}
                  onTagsChange={handleTagsChange}
                />
              ) : (
                <NoteList
                  notes={filteredNotes}
                  onSelectNote={handleSelectNote}
                  onDeleteNote={handleDeleteSpecificNote}
                  onTogglePin={handleTogglePin}
                  viewMode={viewMode}
                  searchQuery={searchQuery}
                  selectedIds={selectedNoteIds}
                  onToggleSelection={handleToggleSelection}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Container>

        <AnimatePresence>
          {!activeNote && selectedNoteIds.length === 0 && (
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
                boxShadow: "0 8px 25px rgba(187, 134, 252, 0.4)",
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
            sx={{ width: "100%", borderRadius: 4 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
