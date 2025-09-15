import React from "react";
import Image from "next/image";

interface AuthorInfoProps {
  author: string;
  publishedAt: string;
  avatar?: string;
  showBio?: boolean;
}

export default function AuthorInfo({
  author,
  publishedAt,
  avatar = "/Images/Trends/avatar1.png",
  showBio = false,
}: AuthorInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={avatar || "/Images/Trends/avatar1.png"}
          alt={author}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      <div>
        <div className="text-white font-saira-semibold text-lg">{author}</div>
        <div className="text-gray-400 text-sm font-saira-normal">
          {formatDate(publishedAt)}
        </div>

        {showBio && (
          <div className="text-gray-300 text-sm mt-2 max-w-md">
            Rap kültürü ve Türk müzik dünyası hakkında yazılar yazan deneyimli
            editör ve müzik analisti.
          </div>
        )}
      </div>
    </div>
  );
}
