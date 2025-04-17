import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HeaderApp from "../HeaderApp/HeaderApp";
import Posts from "../Posts/Posts";
import CommentSection from "../CommentSection/CommentSection";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [profileData, setProfileData] = useState({
    major: "Engineering",
    year: "1st ",
    followers: 0,
    profile_image: "",
    bio: "This is my bio."
  });

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { firstName, lastName } = JSON.parse(storedUser);
      setName(`${firstName} ${lastName}`);
    }
  }, []);

  // Handle input changes for the name
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Save the name back to localStorage when the user stops editing
  const handleBlur = () => {
    const [firstName, lastName] = name.split(" ");
    localStorage.setItem('user', JSON.stringify({
      firstName,
      lastName,
    }));
    setIsEditing(false);
  };

  // When the user presses "Enter" after editing the name, save it
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="profile-container">
      <HeaderApp />

      {/* Profile Header */}
      <div className="profile-header"></div>

      {/* Profile Section */}
      <div className="profile-content">
        <button className="profile-btn">
          <img
            src={profileData.profile_image || "https://randomuser.me/api/portraits/women/1.jpg"}
            className="profile-avatar"
            alt="Profile"
          />
        </button>

        {/* User Information */}
        <div className="user-information">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              autoFocus
              className="edit-name-input"
            />
          ) : (
            <h1 className="profile-name" onClick={() => setIsEditing(true)}>
              {name}
            </h1>
          )}
          <button className="profile-edit-button" onClick={() => setIsEditing(true)}>
            ✏️ Edit
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <p>{profileData.major} Engineering</p>
        <p>{profileData.year} Year</p>
        <p>{profileData.bio}</p>
        <p>
          <span className="Num-of-followers">{profileData.followers}</span> Followers
        </p>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
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

        {/* Content Section */}
        <div className="content-section">
          {activeTab === "posts" && <Posts showComments={false} />}
          {activeTab === "comments" && <CommentSection showButton={false} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
