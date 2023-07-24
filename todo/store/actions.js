export const NOTE_ADDED = "NOTE_ADDED";
export const NOTE_DELETED = "NOTE_DELETED";
export const NOTE_EDITED = "NOTE_EDITED";
export const SEARCHBAR_ACTIVATED = "SEARCHBAR_ACTIVATED";
export const SEARCHBAR_DEACTIVATED = "SEARCHBAR_DEACTIVATED";
export const addNote = (title, content) => {
  return {
    type: NOTE_ADDED,
    payload: {
      noteTitle: title,
      noteContent: content,
    },
  };
};
export const deleteNote = (id) => {
  return { type: NOTE_DELETED, payload: { id: id } };
};
export const editNote = (id, newTitle, newContent) => {
  return {
    type: NOTE_EDITED,
    payload: {
      id: id,
      noteTitle: newTitle,
      noteContent: newContent,
    },
  };
};
export const activateSearchbar = () => {
  return {
    type: SEARCHBAR_ACTIVATED,
  };
};
export const deactivateSearchbar = () => {
  return {
    type: SEARCHBAR_DEACTIVATED,
  };
};
