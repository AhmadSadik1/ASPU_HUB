import React from 'react'
import HeaderApp from '../HeaderApp/HeaderApp'
import './Home.css'
import { FaImages } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { Container } from 'react-bootstrap';
import { Box, CssBaseline } from '@mui/material';
import Posts from '../Posts/Posts';

 //import Posts from '../Posts/Posts';
function Home() {
  return (
    <div className='profile-container'>
      <HeaderApp />
    <div className='My-Home'>
    <button className="profile-personal">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Profile" />
          </button>
        <input type="text" placeholder='What do You think about ?' className='Post-profile' />     
        <div className='Icons-Home'>
      Code  <FaCode  />
      Images  <FaImages />
        </div>
    </div>
    <div className="custom-div">
    </div>
    <Posts />
    <Posts />
    <Posts />

    </div>

 )  
}   

export default Home
