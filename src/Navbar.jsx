import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '/dncc_icon_circle_centered.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [isplayer,setIsplayer]=useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.admin) {
      setIsAdmin(true);
    }
    if(userData?.player){
      setIsplayer(true)
    }
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
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100vw',
      background: '#000',
      color: '#fff',
      padding: '10px 20px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo or Site Name */}
    <div style={{ 
  display: "flex", 
  alignItems: "center", 
  fontWeight: "bold", 
  fontSize: "20px", 
  lineHeight: "20px" 
}}>
  <img 
    src={logo} 
    alt="logo" 
    style={{ height: "24px", width: "24px", marginRight: "8px" }} 
  />
  DNCC
</div>

      {/* Desktop Links */}
      <ul className="nav-links" style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
        <li><Link to="home" style={{padding:"5px 5px"}} smooth={true} duration={500}>Home</Link></li>
        <li><Link to="players" style={{padding:"5px 5px"}} smooth={true} duration={500}>Players</Link></li>
        <li><Link to="matches" style={{padding:"5px 5px"}} smooth={true} duration={500}>Teams</Link></li>
        {
          (isAdmin || isplayer) && <li><Link to="account" style={{padding:"5px 5px"}} smooth={true} duration={500}>Account</Link></li>
        }
        
            {( !isAdmin && !isplayer ) && <li><Link to="register" style={{padding:"5px 5px"}} smooth={true} duration={500}>register</Link></li>}
        
        <li><Link to="contact" style={{padding:"5px 5px"}} smooth={true} duration={500}>Contact Us</Link></li>
        <li><button onClick={handleLogout} style={{backgroundColor:'#000',zIndex:'100px',color:'white',border:'1px solid white',height:'20px',width:'50px',borderRadius:"3px"}}>Logout</button></li>
      </ul>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu} style={{ fontSize: '24px', cursor: 'pointer', display: 'none' }}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mobile-menu" style={{
          position: 'absolute',
          top: '50px',
          right: 0,
          width: '30%',
          background: '#000',
          listStyle: 'none',
          padding: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          <li><Link to="home" onClick={closeMenu} smooth={true} duration={500}>Home</Link></li>
          <li><Link to="players" onClick={closeMenu} smooth={true} duration={500}>Players</Link></li>
          <li><Link to="matches" style={{padding:"5px 5px"}} smooth={true} duration={500}>Teams</Link></li>
          {( isAdmin || isplayer ) && <li><Link to="account" onClick={closeMenu} smooth={true} duration={500}>Account</Link></li>}
          {( !isAdmin && !isplayer ) && <li><Link to="register" onClick={closeMenu} smooth={true} duration={500}>register</Link></li>}
          <li><Link to="contact" onClick={closeMenu} smooth={true} duration={500}>Contact Us</Link></li>
          <li><button onClick={() => { closeMenu(); handleLogout(); }} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>Logout</button></li>
        </ul>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
