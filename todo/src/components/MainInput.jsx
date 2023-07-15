import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";

const MainInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  margin: auto;
`;

export const TextField = styled.textarea`
  border: none;
  overflow: auto;
  height: 22px;
  line-height: 22px;
  font-family: Roboto;
  padding: 12px 16px;
  font-size: 15px;
  vertical-align: middle;
  resize: none;
  border-radius: 5px;
  &::placeholder {
    color: #4c4c4c;
    font-weight: 500;
  }
  &:focus {
    outline: none;
    /* font-weight:; */
    color: #202124;
    height: 30px;
    line-height: 30px;
  }
`;
export const Form = styled.form`
  display: flex;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  max-width: 550px;
`;
export const FormTitle = styled.input`
  /* display: none; */
  height: 22px;
  padding: 15px;
  font-family: Roboto;
  font-weight: 420;
  font-size: 18px;
  line-height: 22px;
  vertical-align: middle;
  border: none;
  &::placeholder {
    color: #4c4c4c;
    font-weight: 500;
  }
  &:focus {
    outline: none;
  }
`;

export const NoteMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const MainInput = ({ notesCreationHandler }) => {
  const { resetForm, handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: "",
      noteText: "",
    },
    onSubmit: (values) => {
      const finalNote = {
        ...values,
        id: uuidv4(),
      };
      console.log(finalNote);
      notesCreationHandler(finalNote);
      resetForm();
    },
  });

  return (
    <MainInputContainer>
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
          <button type="submit">Create Note</button>
          <button>Cancel</button>
        </NoteMenu>
      </Form>
    </MainInputContainer>
  );
};
export default MainInput;
