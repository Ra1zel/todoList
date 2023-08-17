import { useState } from "react";
import { useFormik } from "formik";
import { Form, FormTitle, TextField, NoteMenu } from "./MainInput";
import styled from "@emotion/styled";

const NoteContainer = styled.div`
  width: 300px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #a7a6a648;
  &:hover {
    box-shadow: 0 2px 3px 2px #3232324e;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s box-shadow;
  }
`;

function NoteCard({ note, notesEditHandler, notesDeletionHandler, id }) {
  const [editFlag, setEditFlag] = useState(false);
  const { resetForm, handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: note.title,
      noteText: note.noteText,
    },
    onSubmit: (values) => {
      console.log(values);
      notesEditHandler(id, values);
      resetForm();
      setEditFlag(false);
    },
  });

  const EnableEditHandler = () => {
    setEditFlag(true);
  };
  const DeleteNoteHandler = () => {
    notesDeletionHandler(id);
  };
  const CancelEditProcessHandler = () => {
    setEditFlag(false);
  };
  return (
    <>
      {editFlag === true ? (
        <NoteContainer>
          <Form onSubmit={handleSubmit}>
            <FormTitle
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={values.title}
            />
            <TextField
              name="noteText"
              placeholder="Take a note..."
              onChange={handleChange}
              value={values.noteText}
            />
            <NoteMenu>
              <button type="submit">Update Note</button>
              <button onClick={CancelEditProcessHandler}>Cancel</button>
              <button onClick={DeleteNoteHandler}>Delete</button>
            </NoteMenu>
          </Form>
        </NoteContainer>
      ) : (
        <NoteContainer>
          <div>{note.title}</div>
          <div>{note.noteText}</div>
          <button onClick={EnableEditHandler}>Edit</button>
          <button onClick={DeleteNoteHandler}>Delete</button>
        </NoteContainer>
      )}
    </>
  );
}
export default NoteCard;
