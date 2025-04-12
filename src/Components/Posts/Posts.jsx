import React, { useState, useEffect } from 'react';
import { FaRegCopy } from "react-icons/fa";
import CommentSection from '../CommentSection/CommentSection';
import axios from 'axios';

function Posts({ showComments = true }) {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const displayUserName = (user) => {
    if (!user) return 'Anonymous';
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.name || `User#${user.id}`;
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/Getuserpost`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Make sure to use response.data.posts (as per your JSON structure)
        setUserPosts(response.data.posts || []);
      } catch (err) {
        console.error("Failed to fetch user posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [token]);

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (userPosts.length === 0) {
    return <div className="text-center py-8">No posts found in your communities.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {userPosts.map(post => (
        <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <img 
                src="https://randomuser.me/api/portraits/women/1.jpg" 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {displayUserName(post.user)}
                </p>
                <p className="text-xs text-gray-500">
                  {post.created_at ? new Date(post.created_at).toLocaleString() : 'No date'}
                </p>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h2 className="font-bold text-xl text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>

          {/* Comments Section */}
          {showComments && post.comments && post.comments.length > 0 && (
            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <h3 className="font-medium text-gray-800 mb-4">Comments</h3>
              <div className="space-y-4">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <img 
                      src="https://randomuser.me/api/portraits/women/1.jpg" 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover mt-1 flex-shrink-0"
                    />
                    <div className="bg-white p-3 rounded-lg shadow-sm flex-1">
                      <p className="font-medium text-sm text-gray-800">
                        {displayUserName(comment.user)}
                      </p>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {comment.created_at ? new Date(comment.created_at).toLocaleTimeString() : 'No date'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;