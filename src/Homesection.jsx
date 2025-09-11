import React from 'react';
import { motion } from 'motion/react';
import "./home.css"
import { Link } from 'react-router-dom';
const HomeSection = () => {
  return (
    <div id="home" style={{ height: '100vh', backgroundColor: '#524948',display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column",flex:"1 1 auto"}} className='home'>
      <motion.h1 style={{paddingTop:'50px',textAlign:'center',fontSize:'50px',color:"#7CB4B8"}}
       initial={
        {
          y:100,
          opacity:0
        }
       }
       animate={{
        y:0,
        opacity:1,
       }}
       transition={{
        duration:2,
        delay:1,
       }}
      >
            Welcome to DNCC
        </motion.h1>
        <p  style={{fontSize:'1.3rem',textAlign:'center',padding:'50px',color:"#7CB4B8",textWrap:'balance'}}>your hub for Box Cricket! Our association is dedicated to promoting cricketing talent, managing player data, and creating a platform where passion meets performance. Join us in celebrating the spirit of cricket, building strong teams, and taking the game to new heights.</p>
        <Link to='/history'><button className='btn-history' style={{padding:"10px 20px",backgroundColor:'yellowgreen',borderRadius:"8px",border:'none',color:"blue",transition:"2s all ease"}}> Dncc History</button></Link>
    </div>
  );
};

export default HomeSection;
