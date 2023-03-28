import logo from '../images/new_logo.jpg';
import { Link } from 'react-router-dom';

function Header({ children }) {
  return (
    <header className="header">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="header__logo"
        />
      </Link>
      {children}
    </header>
  );
}
export default Header;
