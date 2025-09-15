import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-white font-saira-normal">Yükleniyor...</div>
      </div>
    </div>
  );
}
