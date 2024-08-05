import React from "react";
import { FaHeart, FaDownload, FaShare } from "react-icons/fa";

const PhotoCard = ({ photo, handleSetFavPhotos, favPhotos, openLightbox }) => {
  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Checkout this awesome photo:${photoUrl}`
    )}`;
    window.open(shareUrl, `_blank`);
  };

  const handleDownload = (photoUrl, photoId) => {
    const link = document.createElement("a");
    link.href = photoUrl;
    link.download = `photo_${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article
      key={photo.id}
      className={`photo ${
        favPhotos.some((favPhoto) => favPhoto.id === photo.id)
          ? "favorite-photo"
          : ""
      }`}
    >
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
        <img
          className="h-auto max-w-lg transition-all duration-300 rounded-lg blur-none hover:blur-sm w-[100%]"
          src={photo.urls.regular}
          alt={photo.alt_description}
          onClick={() => openLightbox(index)}
        />
        <div className="photo info m-2">
          <div className="photo-header flex justify-between">
            <h4 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {photo.user.name}
            </h4>
            <button
              className={`favourite-btn ${
                favPhotos.some((favPhoto) => favPhoto.id === photo.id)
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                handleSetFavPhotos(photo.id);
              }}
            >
              <FaHeart />
            </button>
          </div>
          <div className="photo-actions flex justify-evenly">
            <div className="flex items-center">
              <div>
                <FaHeart className="heart-icon" />
              </div>
              <div>{photo.likes}</div>
            </div>
            <button
              className="sahre-btn"
              onClick={() => {
                handleShare(photo.urls.regular);
              }}
            >
              <FaShare />
            </button>
            <button
              className="download-btn"
              onClick={() => {
                handleDownload(photo.urls.full, photo.id);
              }}
            >
              <FaDownload />
            </button>
            <a href="{photo.user.portfolio_url}">
              <img
                src={photo.user.profile_image.medium}
                className="user-img rounded-lg"
                alt={photo.user.name}
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PhotoCard;
