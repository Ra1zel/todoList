import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { NoteBottomBar } from "../App";
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

const EditForm = ({
  activeNote,
  handleClose,
  notesEditHandler,
  deletionCallback,
}) => {
  const editForm = useFormik({
    initialValues: {
      title: activeNote.title,
      noteContent: activeNote.noteContent,
    },
    onSubmit: (values) => {
      notesEditHandler(activeNote.id, values);
      handleClose();
    },
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    editForm.setFieldValue(name, value);
  };
  return (
    <div onBlur={editForm.handleSubmit}>
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
            closeBtnCallback={handleClose}
            noteDeletionCb={deletionCallback}
            noteId={activeNote.id}
            doesNoteExist={true}
          />
        </form>
      </Box>
    </div>
  );
};

export default EditForm;
