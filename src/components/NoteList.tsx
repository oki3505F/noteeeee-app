import { memo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArticleIcon from "@mui/icons-material/Article";
import { motion, AnimatePresence } from "framer-motion";
import { Note } from "../useNotes";
import { ViewMode } from "../App";

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  viewMode: ViewMode;
  searchQuery: string;
}

const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  if (diffDays <= 7) return `${diffDays - 1} days ago`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getWordCount = (text: string) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <Box
        key={index}
        component="span"
        sx={{
          backgroundColor: "rgba(187, 134, 252, 0.3)",
          color: "#BB86FC",
          borderRadius: 0.5,
          px: 0.5,
        }}
      >
        {part}
      </Box>
    ) : (
      part
    ),
  );
};

const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <Box
      sx={{
        textAlign: "center",
        mt: { xs: 8, sm: 12 },
        px: 2,
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <ArticleIcon
          sx={{
            fontSize: { xs: 60, sm: 80 },
            color: "rgba(187, 134, 252, 0.3)",
            mb: 2,
          }}
        />
      </motion.div>

      {searchQuery ? (
        <>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No notes found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search terms or create a new note
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            No notes yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Tap the + button to create your first note
          </Typography>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Typography variant="body2" color="primary">
              ↘️ Start writing
            </Typography>
          </motion.div>
        </>
      )}
    </Box>
  </motion.div>
);

const GridView = ({
  notes,
  onSelectNote,
  searchQuery,
}: {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  searchQuery: string;
}) => (
  <Grid container spacing={{ xs: 2, sm: 3 }}>
    <AnimatePresence>
      {notes.map((note, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
          <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              damping: 20,
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              onClick={() => onSelectNote(note)}
              sx={{
                cursor: "pointer",
                height: "100%",
                minHeight: { xs: 160, sm: 180 },
                display: "flex",
                flexDirection: "column",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden", // Ensure cover image doesn't overflow
                "&:hover": {
                  boxShadow: "0 8px 32px rgba(187, 134, 252, 0.2)",
                  borderColor: "rgba(187, 134, 252, 0.3)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {note.images && note.images.length > 0 && (
                <Box
                  sx={{
                    height: 140,
                    width: "100%",
                    backgroundImage: `url(${note.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="h6"
                  component="div"
                  noWrap
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    mb: 1,
                    color: "text.primary",
                  }}
                >
                  {highlightSearchTerm(
                    note.title || "Untitled Note",
                    searchQuery,
                  )}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: { xs: "2.4em", sm: "3.6em" },
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: { xs: 2, sm: 3 },
                    WebkitBoxOrient: "vertical",
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  {note.content
                    ? highlightSearchTerm(note.content, searchQuery)
                    : "No content"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "auto",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {formatDate(note.lastEdited)}
                  </Typography>

                  <Chip
                    label={`${getWordCount(note.content)} words`}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 20,
                      fontSize: "0.7rem",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "text.secondary",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </AnimatePresence>
  </Grid>
);

const ListView = ({
  notes,
  onSelectNote,
  searchQuery,
}: {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  searchQuery: string;
}) => (
  <List sx={{ width: "100%", px: 0 }}>
    <AnimatePresence>
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          layout
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            type: "spring",
            damping: 20,
          }}
        >
          <ListItem
            onClick={() => onSelectNote(note)}
            sx={{
              cursor: "pointer",
              py: 2,
              px: { xs: 2, sm: 3 },
              mb: 1,
              borderRadius: 2,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(187, 134, 252, 0.1)",
                borderColor: "rgba(187, 134, 252, 0.3)",
                transform: "translateX(8px)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Box sx={{ mr: 2 }}>
              {note.images && note.images.length > 0 ? (
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    backgroundImage: `url(${note.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              ) : (
                <ArticleIcon sx={{ color: "text.secondary", fontSize: 28 }} />
              )}
            </Box>

            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    mb: 0.5,
                  }}
                >
                  {highlightSearchTerm(
                    note.title || "Untitled Note",
                    searchQuery,
                  )}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 1,
                    }}
                  >
                    {note.content
                      ? highlightSearchTerm(note.content, searchQuery)
                      : "No content"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(note.lastEdited)}
                    </Typography>
                    <Chip
                      label={`${getWordCount(note.content)} words`}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 18,
                        fontSize: "0.65rem",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        color: "text.secondary",
                      }}
                    />
                  </Box>
                </Box>
              }
            />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "rgba(187, 134, 252, 0.1)",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Future: Add context menu
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          {index < notes.length - 1 && <Divider sx={{ opacity: 0.1, mx: 2 }} />}
        </motion.div>
      ))}
    </AnimatePresence>
  </List>
);

const NoteListComponent = ({
  notes,
  onSelectNote,
  viewMode,
  searchQuery,
}: NoteListProps) => {
  if (notes.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  // Sort notes by most recently edited
  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {viewMode === "grid" ? (
        <GridView
          notes={sortedNotes}
          onSelectNote={onSelectNote}
          searchQuery={searchQuery}
        />
      ) : (
        <ListView
          notes={sortedNotes}
          onSelectNote={onSelectNote}
          searchQuery={searchQuery}
        />
      )}
    </motion.div>
  );
};

export const NoteList = memo(NoteListComponent);
