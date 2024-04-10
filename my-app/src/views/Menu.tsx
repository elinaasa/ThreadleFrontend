import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <h1>Menu</h1>
            <ul>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}

export default Menu;
