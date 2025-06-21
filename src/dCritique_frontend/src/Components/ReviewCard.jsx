import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiHeart, FiShare2, FiMoreHorizontal } from "react-icons/fi";
import "../Styles/ReviewCard.css";

export const ReviewCard = ({ review, index, viewMode }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50));
  const [dislikes, setDislikes] = useState(Math.floor(Math.random() * 10));

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
      >
        ⭐
      </span>
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'excellent';
    if (rating >= 3) return 'good';
    if (rating >= 2) return 'fair';
    return 'poor';
  };

  return (
    <div 
      className={`review-card ${viewMode}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header">
        <div className="user-info">
          <div className="avatar">
            {String.fromCharCode(65 + (index % 26))}
          </div>
          <div className="user-details">
            <h4>Anonymous User</h4>
            <span className="review-date">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="card-actions">
          <button
            className={`save-btn ${saved ? 'saved' : ''}`}
            onClick={() => setSaved(!saved)}
          >
            <FiHeart />
          </button>
          <button className="more-btn">
            <FiMoreHorizontal />
          </button>
        </div>
      </div>

      <div className="rating-section">
        <div className={`rating-badge ${getRatingColor(parseInt(review.stars))}`}>
          {renderStars(parseInt(review.stars))}
          <span className="rating-number">{review.stars}/5</span>
        </div>
      </div>

      {review.images && (
        <div className="review-image">
          <img src={review.images} alt="Review" />
        </div>
      )}

      <div className="review-content">
        <p>{review.review}</p>
      </div>

      <div className="card-footer">
        <div className="interaction-buttons">
          <button
            className={`interaction-btn ${liked ? 'active' : ''}`}
            onClick={handleLike}
          >
            <FiThumbsUp />
            <span>{likes}</span>
          </button>
          
          <button
            className={`interaction-btn ${disliked ? 'active' : ''}`}
            onClick={handleDislike}
          >
            <FiThumbsDown />
            <span>{dislikes}</span>
          </button>
          
          <button className="interaction-btn">
            <FiShare2 />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};