import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { useState } from "react";

const MainInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  margin: auto;
`;

export const TextField = styled.textarea`
  border: none;
  overflow: visible;
  max-height: 550px;
  line-height: 22px;
  font-family: Roboto;
  padding: 12px 16px;
  font-size: 15px;
  vertical-align: middle;
  resize: none;
  border-radius: 12px;
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
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  max-width: 550px;
  border-radius: 12px;
`;
export const FormTitle = styled.input`
  height: 22px;
  padding: 15px;
  font-family: Roboto;
  font-weight: 420;
  font-size: 18px;
  line-height: 22px;
  vertical-align: middle;
  border: none;
  border-radius: 12px;
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

export const CancelBtn = styled.button`
  font-family: "Roboto";
  font-size: 17px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  padding-inline: 20px;
  padding-block: 10px;
  margin: 10px;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: rgba(95, 99, 104, 0.039);
    cursor: pointer;
    transition: 0.3s background-color ease-in-out;
  }
`;
const MainInput = ({ notesCreationHandler }) => {
  const [isFormFocused, setIsFormFocused] = useState(false);
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
      notesCreationHandler(finalNote);
      resetForm();
    },
  });
  const formBlurHandler = (e) => {
    setIsFormFocused(false);
    handleSubmit();
    e.stopPropagation();
  };
  const formFocusHandler1 = () => {
    setIsFormFocused(true);
  };
  const textFieldBlurHandler = (e) => {
    e.stopPropagation();
    if (e.relatedTarget && e.relatedTarget.name === "title") {
      return;
    } else {
      setIsFormFocused(false);
      handleSubmit();
    }
  };
  const titleBlurHandler = (e) => {
    e.stopPropagation();
    if (e.relatedTarget && e.relatedTarget.name === "noteText") {
      return;
    } else {
      setIsFormFocused(false);
      handleSubmit();
    }
  };
  const autoExpand = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <MainInputContainer>
      <Form
        name="specialForm"
        onSubmit={handleSubmit}
        onFocus={formFocusHandler1}
        onBlur={formBlurHandler}
      >
        {isFormFocused && (
          <FormTitle
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={values.title}
            onBlur={titleBlurHandler}
          />
        )}
        <TextField
          name="noteText"
          placeholder="Take a note..."
          onChange={handleChange}
          value={values.noteText}
          onBlur={textFieldBlurHandler}
          onInput={(e) => autoExpand(e.target)}
        />
        {isFormFocused && (
          <NoteMenu>
            <CancelBtn>Close</CancelBtn>
          </NoteMenu>
        )}
      </Form>
    </MainInputContainer>
  );
};
export default MainInput;
