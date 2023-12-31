import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { NoteBottomBar } from "../App";
import { useDispatch } from "react-redux";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { notesSlice } from "../../store/notesSlice";
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

const EditForm = ({ activeNote, handleClose }) => {
  const dispatch = useDispatch();
  const editForm = useFormik({
    initialValues: {
      title: activeNote.title,
      noteContent: activeNote.noteContent,
    },
    onSubmit: (values) => {
      dispatch(
        notesSlice.actions.edit({
          id: activeNote.id,
          noteTitle: values.title,
          noteContent: values.noteContent,
        })
      );
      handleClose();
    },
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    editForm.setFieldValue(name, value);
  };
  const handleClickAway = () => {
    editForm.handleSubmit();
  };
  const closeHandler = () => {
    editForm.handleSubmit();
    handleClose();
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <form
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
          onSubmit={editForm.handleSubmit}
        >
          <MyTextField
            value={editForm.values.title}
            onChange={onInputChange}
            name="title"
            id="title"
          ></MyTextField>
          <MyTextField
            multiline
            maxRows={10}
            id="noteContent"
            name="noteContent"
            value={editForm.values.noteContent}
            onChange={onInputChange}
          ></MyTextField>
          <NoteBottomBar
            closeBtnCallback={closeHandler}
            noteDeletionCb={() =>
              dispatch(
                notesSlice.actions.delete({
                  id: activeNote.id,
                })
              )
            }
            noteId={activeNote.id}
            doesNoteExist={true}
          />
        </form>
      </Box>
    </ClickAwayListener>
  );
};

export default EditForm;
