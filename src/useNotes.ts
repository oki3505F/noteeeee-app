import { useState, useEffect, useCallback } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
  images?: string[]; // Array of base64 strings
  pinned?: boolean;
  color?: string; // Hex color for the note background
  tags?: string[]; // Array of categories/tags
}

const getStoredNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem("notes");
    if (notes) {
      const parsedNotes = JSON.parse(notes);
      if (Array.isArray(parsedNotes)) {
        return parsedNotes;
      }
    }
  } catch (error) {
    console.error("Failed to parse notes from localStorage", error);
    return [];
  }
  return [];
};

const storeNotes = (notes: Note[]) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(getStoredNotes());
  }, []);

  const addNote = useCallback(
    (note: Pick<Note, "title" | "content" | "images" | "pinned" | "color" | "tags">) => {
      const newNote: Note = {
        id: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        pinned: false,
        ...note,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      storeNotes(updatedNotes);
    },
    [notes],
  );

  const updateNote = useCallback(
    (updatedNote: Note) => {
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, lastEdited: new Date().toISOString() }
          : note,
      );
      setNotes(updatedNotes);
      storeNotes(updatedNotes);
    },
    [notes],
  );

  const deleteNote = useCallback(
    (id: string) => {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      storeNotes(updatedNotes);
    },
    [notes],
  );

  const deleteNotes = useCallback(
    (ids: string[]) => {
      const updatedNotes = notes.filter((note) => !ids.includes(note.id));
      setNotes(updatedNotes);
      storeNotes(updatedNotes);
    },
    [notes],
  );

  const importNotes = useCallback((newNotes: Note[]) => {
    setNotes(newNotes);
    storeNotes(newNotes);
  }, []);

  return { notes, addNote, updateNote, deleteNote, deleteNotes, importNotes };
};
