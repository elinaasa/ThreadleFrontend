import React from 'react';

const Layout: React.FC = () => {
  return (
  <>
    <header className='navbar'>
      <nav>
        <h2 className='nav-text'>Threadle</h2>
        <ul className="ul">
          <li className="li">
            <img src={'../public/search.svg'} alt="search" />
          </li>
          <li className="li">
            <img src={'../public/notification-filled.svg'} alt="notification" />
            </li>
          <li className="li">
          <img src={'../public/nav-menu.svg'} alt="menu" />
          </li>
        </ul>
      </nav>
    </header>
    <main className="mainpage"></main>
      <footer className="footer">
      <p>© 2024</p>
      </footer>
    </>
  );
};

export default Layout;
