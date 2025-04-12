import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderApp from '../HeaderApp/HeaderApp';
import { IoSend } from "react-icons/io5";
import { FaCode, FaImages, FaArrowUp, FaArrowDown } from "react-icons/fa";

function Home() {
  const [newPostContent, setNewPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const token = localStorage.getItem('token');
  const communityId = 1;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/student/post/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const allPosts = [...response.data.post, ...response.data.user_post]
        .filter((post, index, self) => 
          index === self.findIndex((p) => p.id === post.id)
        );
      
      allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setPosts(allPosts);
      
      const inputs = {};
      allPosts.forEach(post => {
        inputs[post.id] = '';
      });
      setCommentInputs(inputs);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!title || !newPostContent) return alert("Please fill in both title and content");

    try {
      await axios.post('http://127.0.0.1:8000/api/student/post/Add', {
        title: title,
        content: newPostContent,
        typePost: "Ask",
        community_id: communityId,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTitle('');
      setNewPostContent('');
      fetchPosts();
    } catch (err) {
      console.error("Failed to publish post", err);
      alert("Error: Couldn't add post.");
    }
  };

  const handleComment = async (postId) => {
    if (!commentInputs[postId]?.trim()) return alert("Please write a comment");

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/student/AddComment', {
        post_id: postId,
        content: commentInputs[postId],
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            const newComment = {
              ...response.data.comment,
              user: response.data.user
            };
            return {
              ...post,
              comments: [...(post.comments || []), newComment]
            };
          }
          return post;
        });
      });

      setCommentInputs({...commentInputs, [postId]: ''});
    } catch (err) {
      console.error("Failed to add comment", err);
      alert("Error: Couldn't add comment.");
    }
  };

  const handleVote = async (postId, voteType) => {
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/api/student/VotePost', 
        {
          vote: voteType,
          postid: postId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                positiveVotes: response.data.votes.positive,
                negativeVotes: response.data.votes.negative 
              }
            : post
        )
      );
    } catch (err) {
      console.error("Failed to vote", err);
      alert("Error: Couldn't process your vote.");
    }
  };

  const displayUserName = (user) => {
    if (!user) return 'Anonymous';
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.name || `User#${user.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <HeaderApp />
      
      <div className="w-full max-w-2xl px-4 py-8 flex flex-col items-center gap-8">
        
        {/* Create Post Card */}
        <div className="w-full bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4">
            <img 
              src="https://randomuser.me/api/portraits/women/1.jpg" 
              alt="Profile" 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
            <div className="flex-1 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-medium"
              />
              <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
                rows="3"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-blue-500">
                    <FaCode />
                    <span className="text-sm font-medium">Code</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500">
                    <FaImages />
                    <span className="text-sm font-medium">Images</span>
                  </button>
                </div>
                <button 
                  onClick={handlePost}
                  className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <span className="font-medium">Post</span>
                  <IoSend />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="w-full flex flex-col gap-8">
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No posts available yet. Be the first to post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                {/* Post Header with Voting */}
                <div className="p-6 border-b border-gray-100 flex justify-between">
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
                  
                  {/* Voting UI */}
                  <div className="flex flex-col items-center gap-1">
                    <button 
                      onClick={() => handleVote(post.id, 'up')}
                      className="p-1 text-gray-500 hover:text-green-500 focus:outline-none"
                    >
                      <FaArrowUp className="text-lg" />
                    </button>
                    <span className="text-xs font-medium text-gray-600">
                      {post.positiveVotes || 0}
                    </span>
                    <button 
                      onClick={() => handleVote(post.id, 'down')}
                      className="p-1 text-gray-500 hover:text-red-500 focus:outline-none"
                    >
                      <FaArrowDown className="text-lg" />
                    </button>
                    <span className="text-xs font-medium text-gray-600">
                      {post.negativeVotes || 0}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                </div>

                {/* Comments Section */}
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                  <div className="flex flex-col gap-4">
                    {post.comments?.map(comment => (
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

                    {/* Comment Input */}
                    <div className="flex items-center gap-2 mt-4">
                      <img 
                        src="https://randomuser.me/api/portraits/women/1.jpg" 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({
                            ...commentInputs,
                            [post.id]: e.target.value
                          })}
                          className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        />
                        <button 
                          onClick={() => handleComment(post.id)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                          <IoSend size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;