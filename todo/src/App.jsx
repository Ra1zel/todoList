import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import MainInput from "./components/MainInput";
import NoteCard from "./components/NoteCard";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import { NavigationBar } from "./components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import EditForm from "./components/editForm";
import Icon from "@mui/material/Icon";
import ClickAwayListener from "@mui/base/ClickAwayListener";
/////////////////
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
////////////////
// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 50px;
// `;
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

const WrapperDiv = styled.div`
  content-visibility: ${(props) =>
    props.isMainInputFocused ? "visible" : "hidden"};
`;
export const NoteBottomBar = ({
  name,
  closeBtnCallback,
  doesNoteExist,
  noteDeletionCb,
  noteId = null,
  isMainInputFocused = true,
}) => {
  const clickHandler = () => {
    closeBtnCallback();
  };
  return (
    <WrapperDiv isMainInputFocused={isMainInputFocused}>
      <Box
        name={name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
        }}
        component={"div"}
      >
        <div style={{ display: "flex" }}>
          <Button
            name={name}
            style={{
              color: "black",
              padding: "0",
              margin: "0",
            }}
          >
            <ColorLensOutlinedIcon
              style={{
                padding: "0",
                margin: "0",
              }}
            />
          </Button>
          {doesNoteExist && (
            <Button
              name={name}
              onClick={() => {
                noteDeletionCb(noteId);
                clickHandler();
              }}
              style={{
                color: "red",
              }}
            >
              <DeleteOutlineOutlinedIcon
                style={{ padding: "0", margin: "0" }}
              />
            </Button>
          )}
        </div>
        <div>
          <Button
            name={name}
            style={{ padding: "3px", margin: "3px" }}
            onClick={clickHandler}
          >
            Close
          </Button>
        </div>
      </Box>
    </WrapperDiv>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [matchingNotes, setMatchingNotes] = useState([]);
  const [isSearchbarFocused, setIsSearchBarFocused] = useState(false);
  const [isMainInputFocused, setIsMainInputFocused] = useState(false);
  const [showDisplayNote, setShowDisplayNote] = useState(false);
  // const [isCardHovered, setIsCardHovered] = useState(false);
  const enclosingDivRef = useRef(null);
  const [activeNote, setActiveNote] = useState({
    id: "",
    title: "",
    noteContent: "",
  });

  const creationForm = useFormik({
    initialValues: {
      title: "",
      noteContent: "",
    },
    onSubmit: (values) => {
      const finalNote = {
        ...values,
        id: uuidv4(),
      };
      notesCreationHandler(finalNote);
      creationForm.resetForm();
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
      const pattern = new RegExp(searchQuery, "gi");
      const results = notes.filter((note) => {
        return note.noteText.match(pattern);
      });
      setMatchingNotes(results);
    } else {
      setMatchingNotes([]);
    }
  };
  const notesEditHandler = (id, newNote) => {
    const newNotesList = notes.map((note) => {
      if (note.id === id) {
        return {
          id: id,
          title: newNote.title,
          noteContent: newNote.noteContent,
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
  const noteDisplayHandlerForParent = (e, elementId) => {
    setShowDisplayNote(true);
    const [titleTag, contentTag] = e.target.children;
    setActiveNote({
      id: elementId,
      title: titleTag.innerText,
      noteContent: contentTag.innerText,
    });
  };
  const noteDisplayHandlerForChildren = (e, elementId) => {
    setShowDisplayNote(true);
    const parentElement = e.target.parentElement;
    const [titleTag, contentTag] = parentElement.children;
    setActiveNote({
      id: elementId,
      title: titleTag.innerText,
      noteContent: contentTag.innerText,
    });
    e.stopPropagation();
  };

  const handleClose = () => {
    setShowDisplayNote(false);
  };
  const handleClickAway = () => {
    setIsMainInputFocused(false);
    creationForm.handleSubmit();
  };
  return (
    <>
      <NavigationBar />
      <Box
        name="noteComponent"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            name="noteComponent"
            style={{ width: "550px", margin: "25px" }}
            ref={enclosingDivRef}
          >
            <Paper elevation={2} name="noteComponent">
              <form
                // onBlur={formBlurHandler}
                /*onFocus={mainInputFocusHandler}*/ name="noteComponent"
              >
                <WrapperDiv isMainInputFocused={isMainInputFocused}>
                  <MyTextField
                    name="title"
                    id="title"
                    placeholder="Title"
                    style={{
                      width: "100%",
                    }}
                    onChange={creationForm.handleChange}
                    value={creationForm.values.title}
                    // onBlur={titleBlurHandler}
                  />
                </WrapperDiv>
                <MyTextField
                  name="noteContent"
                  id="noteContent"
                  placeholder="Take a note..."
                  style={{
                    width: "100%",
                  }}
                  multiline
                  maxRows={10}
                  onChange={creationForm.handleChange}
                  value={creationForm.values.noteContent}
                  // onBlur={textFieldBlurHandler}
                  onClick={mainInputFocusHandler}
                />
                {
                  <NoteBottomBar
                    isMainInputFocused={isMainInputFocused}
                    closeBtnCallback={handleClickAway}
                    name="noteComponent"
                    doesNoteExist={false}
                  />
                }
              </form>
            </Paper>
          </Box>
        </ClickAwayListener>
      </Box>
      <Grid
        container
        spacing={1}
        style={{ width: "100%" }}
        justifyContent="center"
      >
        {notes.map((note) => {
          return (
            <Grid
              item
              xs={2.8}
              key={note.id}
              onClick={(e) => noteDisplayHandlerForParent(e, note.id)}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
            >
              <Paper style={{ padding: "15px" }}>
                <h2 onClick={(e) => noteDisplayHandlerForChildren(e, note.id)}>
                  {note.title}
                </h2>
                <p onClick={(e) => noteDisplayHandlerForChildren(e, note.id)}>
                  {note.noteContent}
                </p>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Dialog open={showDisplayNote} onClose={handleClose}>
        <EditForm
          activeNote={activeNote}
          handleClose={handleClose}
          notesEditHandler={notesEditHandler}
          closeBtnCallback={handleClose}
          deletionCallback={notesDeletionHandler}
        />
        {/* <DialogTitle>{activeNote.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{activeNote.noteContent}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};
export default App;
