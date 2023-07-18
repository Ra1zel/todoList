import { useState } from "react";
import MainInput from "./components/MainInput";
import NoteCard from "./components/NoteCard";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [matchingNotes, setMatchingNotes] = useState([]);
  const [isSearchbarFocused, setIsSearchBarFocused] = useState(false);
  console.log(notes);
  const notesCreationHandler = (newNote) => {
    if (newNote.noteText || newNote.title) {
      setNotes([...notes, newNote]);
    }
  };
  const displaySearchResults = (isSearchbarFocused) => {
    setIsSearchBarFocused(isSearchbarFocused);
    if (!isSearchbarFocused) {
      setMatchingNotes([]);
    }
  };
  const returnMatchingNotesFromSearchQuery = (searchQuery) => {
    if (searchQuery) {
      setSearchString(searchQuery);
      console.log("The searchQuery is:", searchString);
      console.log("search query", searchQuery);
      const pattern = new RegExp(searchQuery, "gi");
      const results = notes.filter((note) => {
        return note.noteText.match(pattern);
      });
      console.log("the matching results are: ", results);
      setMatchingNotes(results);
    } else {
      console.log("Please enter search query.");
      setMatchingNotes([]);
    }
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
      {/* <h1>Notes application</h1> */}
      <Navbar
        queryHandler={returnMatchingNotesFromSearchQuery}
        getSearchbarState={displaySearchResults}
        searchbarState={isSearchbarFocused}
      />
      {!isSearchbarFocused && (
        <MainInput notesCreationHandler={notesCreationHandler} />
      )}
      <MainContainer>
        {isSearchbarFocused ? (
          <div>
            {!matchingNotes && <div></div>}
            {matchingNotes &&
              matchingNotes.map((note) => {
                return (
                  <NoteCard
                    note={note}
                    key={note.id}
                    id={note.id}
                    notesEditHandler={notesEditHandler}
                    notesDeletionHandler={notesDeletionHandler}
                  ></NoteCard>
                );
              })}
          </div>
        ) : (
          notes &&
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
          })
        )}
      </MainContainer>
    </>
  );
};
export default App;
