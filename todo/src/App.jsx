import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MainInput from "./components/MainInput";
import NoteCard from "./components/NoteCard";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import { NavigationBar } from "./components/Navbar";
import CustomizedDialogs from "./components/CustomDialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const MyTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Remove the default border
    },
    "&:hover fieldset": {
      border: "none", // Remove the hover border
    },
    "&.Mui-focused fieldset": {
      border: "none", // Remove the focused border
    },
  },
});

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [matchingNotes, setMatchingNotes] = useState([]);
  const [isSearchbarFocused, setIsSearchBarFocused] = useState(false);
  const [isMainInputFocused, setIsMainInputFocused] = useState(false);
  const [showDisplayNote, setShowDisplayNote] = useState(false);
  const { values, resetForm, handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: "",
      noteContent: "",
    },
    onSubmit: () => {
      const finalNote = {
        ...values,
        id: uuidv4(),
      };
      notesCreationHandler(finalNote);
      resetForm();
      console.log(values);
    },
  });
  const notesCreationHandler = (newNote) => {
    if (newNote.noteContent || newNote.title) {
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
  const mainInputFocusHandler = () => {
    setIsMainInputFocused(true);
  };
  const textFieldBlurHandler = (e) => {
    e.stopPropagation();
    if (e.relatedTarget && e.relatedTarget.name === "title") {
      return;
    } else {
      setIsMainInputFocused(false);
      handleSubmit();
    }
    setIsMainInputFocused(false);
  };
  const titleBlurHandler = (e) => {
    e.stopPropagation();
    if (e.relatedTarget && e.relatedTarget.name === "noteContent") {
      return;
    } else {
      setIsMainInputFocused(false);
      handleSubmit();
    }
  };
  const formBlurHandler = (e) => {
    setIsMainInputFocused(false);
    handleSubmit();
    e.stopPropagation();
  };
  const noteDisplayHandler = () => {
    setShowDisplayNote(true);
  };
  return (
    <>
      <NavigationBar />
      <CustomizedDialogs />
      <Box
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box style={{ width: "550px", margin: "25px" }}>
          <Paper elevation={2}>
            <form onFocus={mainInputFocusHandler} onBlur={formBlurHandler}>
              {isMainInputFocused && (
                <MyTextField
                  name="title"
                  id="title"
                  placeholder="Title"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  value={values.title}
                  onBlur={titleBlurHandler}
                />
              )}
              <MyTextField
                name="noteContent"
                id="noteContent"
                placeholder="Take a note..."
                style={{
                  width: "100%",
                }}
                multiline
                maxRows={10}
                onChange={handleChange}
                value={values.noteContent}
                onBlur={textFieldBlurHandler}
              />
            </form>
          </Paper>
        </Box>
      </Box>
      <Grid
        container
        spacing={1}
        style={{ width: "100%" }}
        justifyContent="center"
      >
        {notes.map((note) => {
          return (
            <Grid item xs={2.8} key={note.key} onClick={noteDisplayHandler}>
              <Paper style={{ padding: "15px" }}>
                <h2>{note.title}</h2>
                <p>{note.noteContent}</p>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default App;
