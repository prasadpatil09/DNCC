import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '/dncc_icon_circle_centered.png';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.admin) setIsAdmin(true);
    if (userData?.player) setIsPlayer(true);
  }, []);

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
        <span>DNCC</span>
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><ScrollLink to="home" smooth duration={500} onClick={closeMenu}>Home</ScrollLink></li>
        <li><ScrollLink to="players" smooth duration={500} onClick={closeMenu}>Players</ScrollLink></li>
        <li><ScrollLink to="matches" smooth duration={500} onClick={closeMenu}>Teams</ScrollLink></li>
        {(isAdmin || isPlayer) && <li><ScrollLink to="account" smooth duration={500} onClick={closeMenu}>Account</ScrollLink></li>}
        {(!isAdmin && !isPlayer) && <li><ScrollLink to="register" smooth duration={500} onClick={closeMenu}>Register</ScrollLink></li>}
        <li><ScrollLink to="contact" smooth duration={500} onClick={closeMenu}>Contact Us</ScrollLink></li>
        <li><button className="logout-btn" onClick={() => { closeMenu(); handleLogout(); }}>Logout</button></li>
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
