import {Link} from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h1>Menu</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
        <li>
          <Link to="/Notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/Settings">Settings</Link>
        </li>
        <li>
          <Link to="Search">Search</Link>
        </li>
        <li>
          <Link to="Messages">Messages</Link>
        </li>
        <li>
          <Link to="/Logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
