import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  notes: [],
  isSearchbarfocused: false,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    add: (state, action) => {
      const newNote = {
        id: nanoid(),
        title: action.payload.noteTitle,
        content: action.payload.noteContent,
      };

      state.notes.push(newNote);
    },
    edit: (state, action) => {
      const newNote = {
        id: action.payload.id,
        title: action.payload.noteTitle,
        content: action.payload.noteContent,
      };
      state.notes.find((obj, i) => {
        if (obj.id === action.payload.id) {
          state.notes[i] = newNote;
          return true;
        }
      });
    },
    delete: (state, action) => {
      const newNotesList = state.notes.filter((note) => {
        if (action.payload.id !== note.id) {
          return note;
        }
      });
      state.notes = newNotesList;
    },
  },
});
