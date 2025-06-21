import React from "react";
import { FiStar, FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";
import "../Styles/StatsPanel.css";

export const StatsPanel = ({ stats }) => {
  const statItems = [
    {
      icon: <FiUsers />,
      label: "Total Reviews",
      value: stats.totalReviews,
      color: "blue",
      trend: "+12%"
    },
    {
      icon: <FiStar />,
      label: "Average Rating",
      value: `${stats.averageRating}★`,
      color: "yellow",
      trend: "+0.2"
    },
    {
      icon: <FiTrendingUp />,
      label: "Community Likes",
      value: stats.totalLikes,
      color: "green",
      trend: "+25%"
    },
    {
      icon: <FiAward />,
      label: "Trust Score",
      value: "98%",
      color: "purple",
      trend: "+3%"
    }
  ];

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <h2>Platform Analytics</h2>
        <p>Real-time insights from our decentralized review network</p>
      </div>
      
      <div className="stats-grid">
        {statItems.map((item, index) => (
          <div 
            key={index} 
            className={`stat-card ${item.color}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-icon">
              {item.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-trend">
                <span className="trend-indicator">↗</span>
                {item.trend}
              </div>
            </div>
            <div className="stat-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};