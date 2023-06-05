import "./Header.css";
const Header = () => {
  return (
    <div onClick={() => scrollTo(0, 0)} className="header">
      Entertainment Hub
    </div>
  );
};

export default Header;
