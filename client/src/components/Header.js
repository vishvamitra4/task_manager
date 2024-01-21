import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar">
      <div className="logo"><Link to = "/">Home</Link></div>
      <ul className="nav-list">
        <li className="nav-item"><Link to = "/">Home</Link></li>
        <li className="nav-item"><Link to = "/login">Login</Link></li>
        <li className="nav-item"><Link to = "/register">Register</Link></li>
        <li className="nav-item"><Link to = "#">About</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
