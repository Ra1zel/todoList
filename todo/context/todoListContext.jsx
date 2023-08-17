import React from "react";
import { useState } from "react";

export const TodoListContext = React.createContext({
  isSearchbarFocused: false,
  searchString: "",
  matchingNotes: [],
  notes: [],
  isMainInputFocused: false,
  showDisplayNote: false,
  setShowDisplayNote: () => {},
  setIsSearchBarFocused: () => {},
  setNotes: () => {},
  returnMatchingNotesFromSearchQuery: () => {},
  setIsMainInputFocused: () => {},
});

const TodoListContextProvider = (props) => {
  const [isSearchbarFocused, setIsSearchBarFocused] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [matchingNotes, setMatchingNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showDisplayNote, setShowDisplayNote] = useState(false);
  const [isMainInputFocused, setIsMainInputFocused] = useState(false);

  const returnMatchingNotesFromSearchQuery = (searchQuery) => {
    //only for testing purposes
    // setIsSearchBarFocused(true);
    if (searchQuery) {
      setSearchString(searchQuery);
      const pattern = new RegExp(searchQuery, "gi");
      const results = notes.filter((note) => {
        return note.noteContent.match(pattern);
      });
      console.log("the results are: ", results);
      setMatchingNotes(results);
    } else {
      setSearchString("");
      console.log("IN the else part");
      setMatchingNotes([...notes]);
      // setIsSearchBarFocused(false);
    }
  };
  return (
    <TodoListContext.Provider
      value={{
        isSearchbarFocused: isSearchbarFocused,
        searchString: searchString,
        matchingNotes: matchingNotes,
        notes: notes,
        isMainInputFocused: isMainInputFocused,
        showDisplayNote: showDisplayNote,
        setShowDisplayNote: setShowDisplayNote,
        setIsMainInputFocused: setIsMainInputFocused,
        setNotes: setNotes,
        setIsSearchBarFocused: setIsSearchBarFocused,
        returnMatchingNotesFromSearchQuery: returnMatchingNotesFromSearchQuery,
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};
export default TodoListContextProvider;
