import React from 'react';
import {Link} from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <header className="navbar">
        <nav>
          <h2 className="nav-text">Threadle</h2>
          <Link to="/">Home</Link>
          <ul className="nav-ul">
            <li>
              <img src={'../public/search.svg'} alt="search" />
              <Link to="/search">Search</Link>
            </li>
            <li>
              <img
                src={'/..public/notification-filled.svg'}
                alt="notifications"
              />
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <img src={'../public/nav-menu.svg'} alt="menu" />
              <Link to="/menu">Menu</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main></main>
      <footer>
        <p>© 2024</p>
      </footer>
    </>
  );
};

export default Layout;
