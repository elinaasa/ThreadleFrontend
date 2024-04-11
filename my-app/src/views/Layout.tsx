import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
  <>
    <header className='navbar'>
      <nav>
        <h2 className='nav-text'>Threadle</h2>
        <ul className="nav-ul">
          <li  className="nav-li">
            <Link to="/search">
            <img src={'../search.svg'} alt="search" />
            </Link>
          </li>
          <li  className="nav-li">
            <Link to="/notifications">
            <img src={'../notification-filled.svg'} alt="notification" />
            </Link>
          </li>
          <li  className="nav-li">
            <Link to="/menu">
            <img src={'../nav-menu.svg'} alt="menu" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    <Outlet />
    <main className="mainpage"></main>
      <footer className="footer">
      <p>© 2024</p>
      </footer>
    </>
  );
};

export default Layout;
