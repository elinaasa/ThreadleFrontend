import React from 'react';

const Menu: React.FC = () => {
  return (
    <ul className="menu-ul">
      <li className='menu-li'>
        <img className='menu-img' src="../public/keyboard-enter-return.svg" alt="back" />
        <a className='menu-a' href="#back">Back</a>
      </li>

      <li className='menu-li'>
        <img className='menu-img' src="../public/home.svg" alt="home" />
        <a className='menu-a' href="#home">Home</a>
      </li>

      <li className='menu-li'>
        <img className='menu-img' src="../public/user person.svg" alt="profile" />
        <a className='menu-a' href="#home">Profile</a>
      </li>

      <li className='menu-li'>
        <img className='menu-img' src="../public/notification bell.svg" alt="notification" />
        <a className='menu-a' href="#notifications">Notification</a>
      </li>

      <li className='menu-li'>
        <img className='menu-img' src="../public/settings cog.svg" alt="notification" />
        <a className='menu-a' href="#settings">Settings</a>
      </li>

      <li className='menu-li'>
        <img className='menu-img' src="../public/search30.svg" alt="notification" />
        <a className='menu-a' href="#search">Search</a>
      </li>

      <li className='menu-li'>
        <img className='menu-img' src="../public/chat.svg" alt="notification" />
        <a className='menu-a' href="#messages">Messages</a>
      </li>
    </ul>
  );
};

export default Menu;
