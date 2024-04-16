import {Link} from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <ul className='menu-ul'>
        <li className='menu-li'>
          <Link to="/">
          <img className='menu-img' src={'../home.svg'} alt="home" />
            Home
          </Link>
        </li>
        <li className='menu-li'>
          <Link to="/Profile">
          <img className='menu-img' src={'../person.svg'} alt="Profile" />
            Profile
          </Link>
        </li>
        <li className='menu-li menu-li-1'>
          <Link to="/Notifications">
          <img className='menu-img ' src={'../notification bell.svg'} alt="Notifications" />
            Notifications
          </Link>
        </li>
        <li className='menu-li menu-li-2'>
          <Link to="/Settings">
            <img className='menu-img' src={'../settings cog.svg'} alt="settings" />
            Settings
          </Link>
        </li>
        <li className='menu-li '>
          <Link to="Search">
          <img className='menu-img' src={'../search30.svg'} alt="search" />
            Search
          </Link>
        </li>
        <li className='menu-li menu-li-3'>
          <Link to="Messages">
          <img className='menu-img' src={'../chat.svg'} alt="chat" />
            Messages
          </Link>
        </li>
        <li className='menu-li menu-li-4'>

          <Link to="/Logout">
          <img className='menu-img' src={'../keyboard-enter-return.svg'} alt="settings" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
