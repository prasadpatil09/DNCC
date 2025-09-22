import React from 'react';
import { motion } from 'motion/react';
import "./home.css";
import { Link } from 'react-router-dom';

const HomeSection = () => {
  return (
    <div id="home" className="homes">
      
       <h1> WELCOME</h1>
      

      <div className="line"></div>

      <h2 className="subtitle">CRICKET CLUB WEBSITE</h2>
      <h3 className="subtext">DNCC</h3>

      <p className="description">
        Your hub for Box Cricket! Our association is dedicated to promoting
        cricketing talent, managing player data, and creating a platform where
        passion meets performance. Join us in celebrating the spirit of cricket,
        building strong teams, and taking the game to new heights.
      </p>

      <div className="buttons">
        <Link to="/history">
          <button className="btn-history">DNCC History</button>
        </Link>
        <Link to="/home/chat">
          <button className="btn-history">Chat</button>
        </Link>
      </div>

      {/* Stars */}
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
    </div>
  );
};

export default HomeSection;
