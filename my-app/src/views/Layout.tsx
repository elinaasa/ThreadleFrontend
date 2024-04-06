import React from 'react';

const Layout: React.FC = () => {
  return (
  <>
    <header className='navbar'>
      <nav>
        <h2 className='nav-text'>Threadle</h2>
        <ul className="ul">
          <li className="li">Home</li>
          <li className="li">About</li>
          <li className="li">Contact</li>
        </ul>
      </nav>
    </header>

    <main className="mainpage">
    </main>

      <footer className="footer">

        <p>© 2024</p>
      </footer>
    </>
  );
};

export default Layout;
