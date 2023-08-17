import {
  NOTE_ADDED,
  NOTE_DELETED,
  NOTE_EDITED,
  SEARCHBAR_ACTIVATED,
  SEARCHBAR_DEACTIVATED,
} from "./actions";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
  isSearchbarFocused: false,
};

const notesDeletionHandler = (id, notes) => {
  const newNotesList = notes.filter((note) => {
    if (id !== note.id) {
      return note;
    }
  });
  return newNotesList;
};

const notesEditHandler = (id, newNote, notes) => {
  const newNotesList = notes.map((note) => {
    if (note.id === id) {
      return {
        id: id,
        title: newNote.noteTitle,
        content: newNote.noteContent,
      };
    } else {
      return note;
    }
  });
  return newNotesList;
};
const notesReducer = (state = initialState, action) => {
  if (action.type === NOTE_ADDED) {
    //do something here
    console.log("add logic");
    const newNote = {
      id: uuidv4(),
      title: action.payload.noteTitle,
      content: action.payload.noteContent,
    };
    return {
      notes: [...state.notes, newNote],
    };
  }
  if (action.type === NOTE_EDITED) {
    //do something here
    console.log("edit logic.");
    const noteInfo = {
      noteTitle: action.payload.noteTitle,
      noteContent: action.payload.noteContent,
    };
    const newNotesList = notesEditHandler(
      action.payload.id,
      noteInfo,
      state.notes
    );
    return {
      notes: newNotesList,
    };
  }
  if (action.type === NOTE_DELETED) {
    const newNotesList = notesDeletionHandler(action.payload.id, state.notes);
    return {
      notes: newNotesList,
    };
  }
  if (action.type === SEARCHBAR_ACTIVATED) {
    return {
      ...state,
      isSearchbarFocused: true,
    };
  }
  if (action.type === SEARCHBAR_DEACTIVATED) {
    return {
      ...state,
      isSearchbarFocused: false,
    };
  }
  return state;
};
export default notesReducer;
