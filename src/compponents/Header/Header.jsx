import "./Header.css";
import img from "../../assets/logo.svg";
const Header = () => {
  return (
    <div onClick={() => scrollTo(0, 0)} className="header">
      <img src={img} alt="" style={{ marginRight: "10px" }} />
      <span>Bliss Hours</span>
    </div>
  );
};

export default Header;
