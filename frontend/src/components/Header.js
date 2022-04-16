import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ children }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип сайта Место" className="header__logo" />
      </Link>
      {children}
    </header>
  );
}
export default Header;
