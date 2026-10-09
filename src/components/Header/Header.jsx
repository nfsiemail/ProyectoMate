import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "/img/tiendamate/mate-logo-sin-fondo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo tiendamate" />
          <span>TiendaMate©</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
