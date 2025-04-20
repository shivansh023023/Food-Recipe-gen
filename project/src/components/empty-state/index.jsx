import React from "react";

export default function EmptyState({ message, icon }) {
  return (
    <div className="empty-state">
      {icon && <div className="text-orange-600 mx-auto mb-6">{icon}</div>}
      <h3 className="empty-state-title">{message}</h3>
      <p className="empty-state-text">
        {message.includes("search") 
          ? "Try searching for your favorite dishes or ingredients." 
          : "Browse recipes and click the heart icon to save them here."}
      </p>
    </div>
  );
}