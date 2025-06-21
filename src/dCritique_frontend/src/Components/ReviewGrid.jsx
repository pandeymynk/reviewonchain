import React, { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import "../Styles/ReviewGrid.css";

export const ReviewGrid = ({ reviews, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");

  const filteredReviews = reviews
    .filter(review => 
      review.review.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRating === 0 || parseInt(review.stars) === filterRating)
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "highest") return parseInt(b.stars) - parseInt(a.stars);
      if (sortBy === "lowest") return parseInt(a.stars) - parseInt(b.stars);
      return 0;
    });

  if (loading) {
    return (
      <div className="reviews-section">
        <div className="loading-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="review-skeleton">
              <div className="skeleton-header"></div>
              <div className="skeleton-content"></div>
              <div className="skeleton-footer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>Community Reviews</h2>
        
        <div className="reviews-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={0}>All Ratings</option>
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>

            <div className="view-toggle">
              <button
                className={viewMode === "grid" ? "active" : ""}
                onClick={() => setViewMode("grid")}
              >
                <FiGrid />
              </button>
              <button
                className={viewMode === "list" ? "active" : ""}
                onClick={() => setViewMode("list")}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="no-reviews">
          <div className="no-reviews-icon">📝</div>
          <h3>No reviews found</h3>
          <p>Be the first to share your experience!</p>
        </div>
      ) : (
        <div className={`reviews-grid ${viewMode}`}>
          {filteredReviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};