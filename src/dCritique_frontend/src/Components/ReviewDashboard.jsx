import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { ReviewForm } from "./ReviewForm";
import { ReviewGrid } from "./ReviewGrid";
import { StatsPanel } from "./StatsPanel";
import { dCritique_backend } from "../../../declarations/dCritique_backend/index";
import "../Styles/ReviewDashboard.css";

export const ReviewDashboard = ({ theme, setTheme }) => {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    totalLikes: 0
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await dCritique_backend.getReview();
      setReviews(res);
      
      // Calculate stats
      const totalReviews = res.length;
      const averageRating = totalReviews > 0 
        ? res.reduce((sum, review) => sum + parseInt(review.stars), 0) / totalReviews 
        : 0;
      
      setStats({
        totalReviews,
        averageRating: averageRating.toFixed(1),
        totalLikes: Math.floor(Math.random() * 1000) // Placeholder for likes
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewAdded = () => {
    fetchReviews();
    setShowForm(false);
  };

  return (
    <div className="review-dashboard">
      <Header 
        theme={theme} 
        setTheme={setTheme}
        onAddReview={() => setShowForm(!showForm)}
        showForm={showForm}
      />
      
      <div className="dashboard-content">
        <StatsPanel stats={stats} />
        
        {showForm && (
          <div className="form-container">
            <ReviewForm onReviewAdded={handleReviewAdded} />
          </div>
        )}
        
        <ReviewGrid reviews={reviews} loading={loading} />
      </div>
    </div>
  );
};