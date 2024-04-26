import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import Menu from '../components/Menu';
import {useEffect, useState} from 'react';
import {useNotifications} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const {getNotifications} = useNotifications();
  const {handleAutoLogin} = useUserContext();

  const closeMenu = () => {
    setShowMenu(false);
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const notifications = await getNotifications(token);
    if (notifications && notifications.length > 0) {
      setShowNotificationPopup(true);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <>
      <header className="navbar">
        <nav>
          <h2 onClick={closeMenu} className="nav-text">
            <Link to="/">Threadle</Link>
          </h2>
          <ul className="nav-ul">
            <li onClick={closeMenu} className="nav-li nav-icons">
              <Link to="/search">
                <img src={'../haku.svg'} alt="search" />
              </Link>
            </li>
            <li onClick={closeMenu} className="nav-li nav-icons">
              <Link to="/notifications">
                <div className="notification-container">
                  <img src={'../kello.svg'} alt="notification" />
                  {showNotificationPopup && <div className="popup"></div>}
                </div>
              </Link>
            </li>
            <li onClick={closeMenu} className="nav-li">
              <Link to="/login">
                <img src={'../kayttaja.svg'} alt="profile" />
              </Link>
            </li>
            <li
              className="nav-li nav-icons"
              onClick={() => setShowMenu(!showMenu)}
            >
              <a style={{cursor: 'pointer'}}>
                <img src={'../nav-menu.svg'} alt="menu" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {showMenu ? (
        <Menu closeMenu={closeMenu} />
      ) : (
        <>
          <main className="mainpage">
            <Outlet />
          </main>
          <footer className="footer">
            <p>Threadle © 2024</p>
          </footer>
        </>
      )}
    </>
  );
};

export default Layout;
