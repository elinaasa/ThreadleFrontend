import {Link} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Menu = (params: {closeMenu: () => void}) => {
  const {closeMenu} = params;
  const {user} = useUserContext();
  return (
    <div>
      <ul className="menu-ul">
        <li
          style={{cursor: 'pointer'}}
          onClick={closeMenu}
          className="menu-li back"
        >
          <img
            className="menu-img"
            src={'../keyboard-enter-return.svg'}
            alt="settings"
          />
          Back
        </li>
        <li onClick={closeMenu} className="menu-li">
          <Link to="/">
            <img className="menu-img" src={'../koti.svg'} alt="home" />
            Home
          </Link>
        </li>
        <li onClick={closeMenu} className="menu-li">
          <Link to="/login">
            <img className="menu-img" src={'../kayttaja.svg'} alt="Profile" />
            Profile
          </Link>
        </li>
        {user && (
          <>
            {/* <li onClick={closeMenu} className="menu-li">
              <Link to="/Upload">
                <img className="menu-img" src={'../person.svg'} alt="Profile" />
                Upload
              </Link>
            </li> */}
            <li onClick={closeMenu} className="menu-li menu-li-1">
              <Link to="/Notifications">
                <img
                  className="menu-img "
                  src={'../kello.svg'}
                  alt="Notifications"
                />
                Notifications
              </Link>
            </li>
          </>
        )}
        <li onClick={closeMenu} className="menu-li menu-li-2">
          <Link to="/Settings">
            <img className="menu-img" src={'../asetukset.svg'} alt="settings" />
            Settings
          </Link>
        </li>
        <li onClick={closeMenu} className="menu-li ">
          <Link to="Search">
            <img className="menu-img" src={'../haku.svg'} alt="search" />
            Search
          </Link>
        </li>

        {user && (
          <>
            <li onClick={closeMenu} className="menu-li menu-li-3">
              <Link to="/messages">
                <img className="menu-img" src={'../chat.svg'} alt="chat" />
                Messages
              </Link>
            </li>
            <li onClick={closeMenu} className="menu-li menu-li-4">
              <Link to="/Logout">
                <img
                  className="menu-img"
                  src={'../keyboard-enter-return.svg'}
                  alt="settings"
                />
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
