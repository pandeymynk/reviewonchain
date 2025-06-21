import React, { useState } from "react";
import { FiUpload, FiStar, FiImage, FiSend } from "react-icons/fi";
import { dCritique_backend } from "../../../declarations/dCritique_backend/index";
import "../Styles/ReviewForm.css";

export const ReviewForm = ({ onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    setLoading(true);
    try {
      await dCritique_backend.addReview(reviewText, rating, image || "");
      setReviewText("");
      setRating(0);
      setImage(null);
      setImagePreview(null);
      onReviewAdded();
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-container">
      <div className="review-form">
        <div className="form-header">
          <h2>Share Your Experience</h2>
          <p>Help others make informed decisions</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <div className="rating-section">
            <label>Rate your experience</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <FiStar />
                </button>
              ))}
            </div>
            <span className="rating-text">
              {rating > 0 && (
                <span className="rating-label">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              )}
            </span>
          </div>

          {/* Review Text */}
          <div className="text-section">
            <label htmlFor="review-text">Your Review</label>
            <textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your detailed experience..."
              rows={4}
              required
            />
            <div className="char-count">
              {reviewText.length}/500
            </div>
          </div>

          {/* Image Upload */}
          <div className="image-section">
            <label>Add Photos (Optional)</label>
            <div
              className={`image-upload ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <FiImage className="upload-icon" />
                  <p>Drag & drop an image here</p>
                  <span>or</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    id="image-input"
                  />
                  <label htmlFor="image-input" className="upload-btn">
                    <FiUpload /> Choose File
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={!reviewText.trim() || rating === 0 || loading}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <FiSend />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};