import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function NoteCard({ note }) {
  return (
    <>
      <Grid item xs={2.8}>
        <Paper>
          <h2>{note.title}</h2>
          <p>{note.noteContent}</p>
        </Paper>
      </Grid>
    </>
  );
}
export default NoteCard;
