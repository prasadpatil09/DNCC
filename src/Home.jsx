import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './login.css'
import Navbar from './Navbar';
import HomeSection from './Homesection';
import PlayersSection from './PlayerSection';
import AccountSection from './AccountSection';
import ContactSection from './Contact';
import  Matches from './matches' 
import RequestRegister from './RequestRegister';
const Home = () => {
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
  return (
    <div className='home'>
      <div className="navbars">
        <Navbar/>
        <HomeSection/>
        <PlayersSection/>
        <Matches/>
       {(isAdmin || isplayer) && <AccountSection/>} 
        {(!isAdmin && !isplayer) && <RequestRegister/>} 
        
        <ContactSection/>
      </div>

      
    </div>
  );
};

export default Home;
