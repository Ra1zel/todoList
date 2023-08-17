import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { NavigationBar } from "./components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import EditForm from "./components/editForm";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useSelector, useDispatch } from "react-redux";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { addNote } from "../store/actions";
import { notesSlice } from "../store/notesSlice";
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
  const [isMainInputFocused, setIsMainInputFocused] = useState(false);
  const [matchingNotes, setMatchingNotes] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [showDisplayNote, setShowDisplayNote] = useState(false);
  const notes = useSelector((state) => state.notesReducer.notes);
  const isSearchbarFocused = useSelector(
    (state) => state.searchbarReducer.isSearchbarFocused
  );
  const dispatch = useDispatch();

  const enclosingDivRef = useRef(null);
  useEffect(() => {
    returnMatchingNotesFromSearchQuery(searchString);
  }, [notes]);

  const [activeNote, setActiveNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  const creationForm = useFormik({
    initialValues: {
      title: "",
      noteContent: "",
    },
    onSubmit: (values) => {
      const finalNote = {
        ...values,
      };
      notesCreationHandler(finalNote);
      creationForm.resetForm();
    },
  });
  const notesCreationHandler = (newNote) => {
    if (newNote.noteContent || newNote.title) {
      dispatch(
        notesSlice.actions.add({
          noteTitle: newNote.title,
          noteContent: newNote.noteContent,
        })
      );
    }
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

  const returnMatchingNotesFromSearchQuery = (searchQuery) => {
    if (searchQuery) {
      setSearchString(searchQuery);
      const pattern = new RegExp(searchQuery, "gi");
      const results = notes.filter((note) => {
        return note.content.match(pattern);
      });
      setMatchingNotes(results);
    } else {
      setSearchString("");
      setMatchingNotes([...notes]);
    }
  };
  const sendUpdate = (editedNote) => {
    const newArray = matchingNotes.map((note) => {
      if (note.id === editedNote.id) {
        return {
          id: editedNote.id,
          title: editedNote.title,
          content: editedNote.content,
        };
      } else {
        return note;
      }
    });
    setMatchingNotes(newArray);
  };
  return (
    <>
      <NavigationBar searchQueryHandler={returnMatchingNotesFromSearchQuery} />
      <Box
        name="noteComponent"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {!isSearchbarFocused && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              name="noteComponent"
              style={{ width: "550px", margin: "25px" }}
              ref={enclosingDivRef}
            >
              <Paper elevation={2} name="noteComponent">
                <form name="noteComponent">
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
        )}
      </Box>
      {
        <Grid
          container
          spacing={1}
          style={{ width: "100%" }}
          justifyContent="center"
        >
          {searchString
            ? matchingNotes.map((note) => {
                return (
                  <Grid
                    marginTop="15px"
                    item
                    xs={2.8}
                    key={note.id}
                    onClick={(e) => noteDisplayHandlerForParent(e, note.id)}
                  >
                    <Paper style={{ padding: "15px" }}>
                      <h2
                        onClick={(e) =>
                          noteDisplayHandlerForChildren(e, note.id)
                        }
                      >
                        {note.title}
                      </h2>
                      <p
                        onClick={(e) =>
                          noteDisplayHandlerForChildren(e, note.id)
                        }
                      >
                        {note.content}
                      </p>
                    </Paper>
                  </Grid>
                );
              })
            : notes.map((note) => {
                return (
                  <Grid
                    item
                    xs={2.8}
                    key={note.id}
                    onClick={(e) => noteDisplayHandlerForParent(e, note.id)}
                  >
                    <Paper style={{ padding: "15px" }}>
                      <h2
                        onClick={(e) =>
                          noteDisplayHandlerForChildren(e, note.id)
                        }
                      >
                        {note.title}
                      </h2>
                      <p
                        onClick={(e) =>
                          noteDisplayHandlerForChildren(e, note.id)
                        }
                      >
                        {note.content}
                      </p>
                    </Paper>
                  </Grid>
                );
              })}
        </Grid>
      }
      <Dialog open={showDisplayNote} onClose={handleClose}>
        <EditForm
          activeNote={activeNote}
          handleClose={handleClose}
          closeBtnCallback={handleClose}
          sendUpdate={sendUpdate}
        />
      </Dialog>
    </>
  );
};
export default App;
