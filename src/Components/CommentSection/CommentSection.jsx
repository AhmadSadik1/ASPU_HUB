import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSend } from "react-icons/io5";

function UserComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/Getusercomment`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(response.data.comments || []);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [token]);

  const displayUserName = (user) => {
    if (!user) return 'Anonymous';
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.name || `User#${user.id}`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading your comments...</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center py-8">You haven't made any comments yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Comments</h2>
      
      {comments.map(comment => (
        <div key={comment.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {comment.user?.first_name?.charAt(0) || 'U'}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">
                  {displayUserName(comment.user)}
                </p>
                <span className="text-xs text-gray-500">
                  {comment.created_at ? new Date(comment.created_at).toLocaleString() : 'No date'}
                </span>
              </div>
              
              <p className="text-gray-700 mt-2">{comment.content}</p>
              
              <div className="mt-3 text-sm text-blue-600">
                On post: #{comment.post_id}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserComments;