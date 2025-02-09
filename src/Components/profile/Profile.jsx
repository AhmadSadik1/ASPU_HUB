import HeaderApp from '../HeaderApp/HeaderApp'
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Profile.css'
import Posts from '../Posts/Posts';
 import CommentSection from '../CommentSection/CommentSection';
const Profile = () => {

  const [activeTab, setActiveTab] = useState(null);
  return (
    <div className="profile-container">
      <HeaderApp />
      {/* Header */}
      <div className="profile-header"></div>
      {/* Profile Section */}
      <div className="profile-content">
      <button className="profile-btn">
            <img src="https://randomuser.me/api/portraits/women/1.jpg"  
            className='profile-avatar'  
            alt="Profile" />
          </button>

          {/* Profile Picture */}
          <div className='user-information'>
          <h1 className="profile-name">Jesselyn Wang</h1>
          <button className="profile-edit-button">✏️ Edit</button>
          </div>         
      </div>
      {/* Stats */}

      <div className="profile-stats">
          <p>Ai Enginering</p>
          <p>fourth Year</p>
          <p>
            <span className='Num-of-followers'> 6505 </span>  

             Followers</p>
      </div>

      <div className="profile-tabs">
      {/* Tabs Container */}
      <div className="tabs-container">
        <NavLink
          to="#"
          className={`tab ${activeTab === "posts" ? "active-tab" : ""}`}
          onClick={() => setActiveTab(activeTab === "posts" ? null : "posts")}
        >
          Posts
        </NavLink>

        <NavLink
          to="#"
          className={`tab ${activeTab === "comments" ? "active-tab" : ""}`}
          onClick={() => setActiveTab(activeTab === "comments" ? null : "comments")}
        >
          Comments
        </NavLink>
      </div>

      {/* Content Section (Appears Below the Tabs) */}
      <div className="content-section">
        {activeTab === "posts" && <Posts showComments={false} />}
        {activeTab === "comments" && <CommentSection />}
      </div>
    </div>
    </div>

  )
}
  
  
export default Profile;
