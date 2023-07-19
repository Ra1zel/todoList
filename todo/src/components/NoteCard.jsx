import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// const NoteContainer = styled.div`
//   width: 300px;
//   padding: 10px;
//   margin: 10px;
//   border: 1px solid #a7a6a648;
//   &:hover {
//     box-shadow: 0 2px 3px 2px #3232324e;
//     transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s box-shadow;
//   }
// `;

function NoteCard({ note }) {
  return (
    <>
      <Grid item xs={2.8}>
        <Paper>
          <h2>{note.title}</h2>
          <p>{note.noteContent}</p>
        </Paper>
      </Grid>
      {/* {editFlag === true ? (
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
      )} */}
    </>
  );
}
export default NoteCard;
