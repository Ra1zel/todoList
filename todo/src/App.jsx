import { useState } from "react";
import MainInput from "./components/MainInput";
import NoteCard from "./components/NoteCard";
import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const App = () => {
  const [notes, setNotes] = useState([]);
  console.log(notes);
  const notesCreationHandler = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const notesEditHandler = (id, newNote) => {
    const newNotesList = notes.map((note) => {
      if (note.id === id) {
        return {
          id: id,
          title: newNote.title,
          noteText: newNote.noteText,
        };
      } else {
        return note;
      }
    });
    setNotes(newNotesList);
  };
  const notesDeletionHandler = (id) => {
    const newNotesList = notes.filter((note) => {
      if (id !== note.id) {
        return note;
      }
    });
    setNotes(newNotesList);
  };
  return (
    <>
      <h1>Notes application</h1>
      <MainInput notesCreationHandler={notesCreationHandler} />
      <MainContainer>
        {notes &&
          notes.map((note) => {
            return (
              <NoteCard
                note={note}
                key={note.id}
                id={note.id}
                notesEditHandler={notesEditHandler}
                notesDeletionHandler={notesDeletionHandler}
              />
            );
          })}
      </MainContainer>
    </>
  );
};
export default App;
