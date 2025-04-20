import React from "react";

export default function Loading() {
  return (
    <div className="loading-state">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Preparing recipes...</p>
      </div>
    </div>
  );
}