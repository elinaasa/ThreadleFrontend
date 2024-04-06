import React from 'react';

const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        {/* Navbar content */}
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <main>
        {/* Main content */}
        <h1>mainpage content</h1>
      </main>

      <footer>
        {/* Footer content */}
        <p>© 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
