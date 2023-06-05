import styled from "styled-components";
import "./Header.css";
const Header = () => {
  return <Wrapper className="header">Entertainment Hub</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  position: fixed;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  background-color: #39445a;
  font-family: "Montserrat", sans-serif;
  font-size: 5vw;
  padding: 15px 0;
  box-shadow: 0px 1px 5px black;
  color: white;
  z-index: 100;

  @media (max-width: 1000px) {
    /* padding-top: 15px; */
    font-size: 6.4vw;
  }
`;
export default Header;
