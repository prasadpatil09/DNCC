import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import 'swiper/css';
import 'swiper/css/pagination';
import './account.css';

const PlayersSection = () => {
  const swiperRef = useRef(null);

  const [player, setPlayer] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check admin status from localStorage
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?.admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      console.error('Invalid user data in localStorage:', e);
      setIsAdmin(false);
    }
  }, []);

  // Fetch approved players
  useEffect(() => {
    Axios.get('http://localhost:8500/approve/player-request')
      .then((res) => {
        setPlayer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching players:', err);
        setError('Failed to load players.');
        setLoading(false);
      });
  }, []);

  // Optional: show loading indicator
  if (loading) {
    return (
      <div id="players"
        style={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          backgroundColor: '#1768AC'
        }}
      >
        <p>Loading players...</p>
      </div>
    );
  }

  return (
    <div
      id="players"
      style={{
        height: '80vh',
        backgroundColor: '#1768AC',
        padding: '40px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: '35px',
          marginBottom: '30px',
        }}
      >
        Players Info
      </h1>

      {error ? (
        <p style={{ color: 'white' }}>{error}</p>
      ) : player.length === 0 ? (
        <p style={{ color: 'white' }}>No players available.</p>
      ) : (
        <div
          className="cards"
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {player.map((player, index) => (
              <SwiperSlide key={index}>
                <div className="card">
                  <p><strong>Name:</strong> {player.playername}</p>
                  <p><strong>Role:</strong> {player.playertype}</p>
                  <p><strong>Age:</strong> {player.age}</p>
                 
                    <Link to={`/player/view/${player._id}`} style={{textDecoration:'none',color:'white'}}> <button className="see-more-btn">See More <FaArrowRightLong style={{ marginLeft: '8px' }} /></button></Link> 
                 
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Admin-only link */}
      {isAdmin && (
        <p style={{ marginTop: '20px' }}>
          <Link to="/player/admingrantreq" style={{ color: '#fff', fontWeight: 'bold' }}>
            VIEW REQUESTS
          </Link>
        </p>
      )}
    </div>
  );
};

export default PlayersSection;
