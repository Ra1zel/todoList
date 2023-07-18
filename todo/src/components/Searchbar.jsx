import styled from "@emotion/styled";
import SearchSymbol from "../assets/search.svg";
import Cross from "../assets/cross.svg";
import { useFormik } from "formik";
const CustomSearchBar = styled.input`
  width: 700px;
  height: 42px;
  background-color: ${(props) =>
    props.isSearchbarFocused ? "white" : "#f1f3f4"};
  border: none;
  border-radius: 10px;
  line-height: 17px;
  font-family: "Roboto";
  color: #4c4c4c;
  font-size: 17px;
  font-weight: 400;
  &:focus {
    outline: none;
    background-color: white;
  }
  &::placeholder {
    font-family: "Roboto";
    color: #4c4c4ca9;
    font-size: 17px;
    font-weight: 400;
  }
`;
const SearchBarContainer = styled.div`
  align-items: center;
  display: flex;
  margin-left: 75px;
`;

const SearchSymbolContainer = styled.img`
  background-color: ${(props) =>
    props.focusedBackground ? "white" : "#f1f3f4"};
  padding-inline: 15px;
  padding-block: 10px;
  margin-right: -13px;
  border-radius: 10px;
`;

const CrossSymbolContainer = styled.img`
  background-color: white;
  padding-inline: 15px;
  padding-block: 9px;
  margin-left: -18px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Searchbar = ({ queryHandler, getSearchbarState, searchbarState }) => {
  const searchBarFocusHandler = (event) => {
    //do something here.
    const { name, value } = event.target;
    setFieldValue(name, value);
    console.log(value);
    queryHandler(value);
    getSearchbarState(true);
  };
  const searchBarBlurHandler = () => {
    //do something here.
    // getSearchbarState(false);
  };
  const { values, setFieldValue, resetForm } = useFormik({
    initialValues: {
      searchField: "",
    },
    onSubmit: () => {
      console.log(values.searchField);
    },
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    console.log(value);
    queryHandler(value);
  };
  const cancelSearchHandler = () => {
    getSearchbarState(false);
    resetForm();
  };
  return (
    <SearchBarContainer>
      <SearchSymbolContainer
        src={SearchSymbol}
        alt="Search Symbol"
        focusedBackground={searchbarState ? true : null}
      />
      <CustomSearchBar
        placeholder="Search"
        name="searchField"
        id="searchField"
        value={values.searchField}
        onChange={handleInputChange}
        onFocus={searchBarFocusHandler}
        onBlur={searchBarBlurHandler}
        isSearchbarFocused={searchbarState}
      ></CustomSearchBar>
      {searchbarState && (
        <CrossSymbolContainer
          src={Cross}
          alt="cancel search"
          onClick={cancelSearchHandler}
        />
      )}
    </SearchBarContainer>
  );
};

export default Searchbar;
