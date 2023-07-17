import Searchbar from "./Searchbar";
import styled from "@emotion/styled";
import BurgerMenuLogo from "../assets/menu.svg";
const MyNavbar = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  margin-bottom: 30px;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #a2a0a08a;
`;

const BurgerMenuImg = styled.img`
  width: 24px;
  height: 24px;
  margin-inline: 20px;
  /* color: #5f6368; */
  color: red;
`;
function Navbar({ queryHandler, getSearchbarState, searchbarState }) {
  return (
    <MyNavbar>
      <BurgerMenuImg src={BurgerMenuLogo} alt="Menu Symbol"></BurgerMenuImg>
      <Searchbar
        queryHandler={queryHandler}
        getSearchbarState={getSearchbarState}
        searchbarState={searchbarState}
      />
    </MyNavbar>
  );
}

export default Navbar;
