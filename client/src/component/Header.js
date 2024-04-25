import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { UserContext } from '../userContext';
import CheckListGif from "./Checklist.gif";

const Navbar = () => {

    const { user } = React.useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link style={{ "display": "flex" }} to="/"><img style={{ "width": "23px", "display": "block", "marginRight": "3px" }} src={CheckListGif} />TaskManager</Link>
            </div>
            <ul className="nav-links">
                {user && <li><Link to="/profile">{`${user.userName}'s Todo`}</Link></li>}
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
