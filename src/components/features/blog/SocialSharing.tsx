"use client";

import React from "react";

interface SocialSharingProps {
  title: string;
  url: string;
  size?: "small" | "large";
}

export default function SocialSharing({
  title,
  url,
  size = "small",
}: SocialSharingProps) {
  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: "𝕏",
      bgColor: "bg-black hover:bg-gray-800",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "f",
      bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "in",
      bgColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
      icon: "📱",
      bgColor: "bg-green-500 hover:bg-green-600",
    },
  ];

  const handleShare = (shareUrl: string, platform: string) => {
    // Web Share API desteği varsa kullan
    if (navigator.share && platform === "native") {
      navigator
        .share({
          title,
          url: fullUrl,
        })
        .catch(console.error);
      return;
    }

    // Popup window ile paylaş
    const width = 550;
    const height = 450;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      shareUrl,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      // Başarı feedback'i göster (toast vs.)
      alert("Link kopyalandı!");
    } catch (error) {
      console.error("Link kopyalanamadı:", error);
    }
  };

  const buttonSize =
    size === "large" ? "w-12 h-12 text-lg" : "w-10 h-10 text-sm";

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm font-saira-normal mr-2">
        Paylaş:
      </span>

      {shareLinks.map((link) => (
        <button
          key={link.name}
          onClick={() => handleShare(link.url, link.name.toLowerCase())}
          className={`
            ${buttonSize} ${link.bgColor}
            rounded-full flex items-center justify-center
            text-white font-bold transition-all duration-200
            hover:scale-110 hover:shadow-lg
          `}
          title={`${link.name}'da paylaş`}
          aria-label={`${link.name}'da paylaş`}
        >
          {link.icon}
        </button>
      ))}

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className={`
          ${buttonSize} bg-gray-600 hover:bg-gray-500
          rounded-full flex items-center justify-center
          text-white transition-all duration-200
          hover:scale-110 hover:shadow-lg
        `}
        title="Linki kopyala"
        aria-label="Linki kopyala"
      >
        🔗
      </button>
    </div>
  );
}





