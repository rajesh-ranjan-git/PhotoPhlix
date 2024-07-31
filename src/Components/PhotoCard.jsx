import React from "react";
import { FaHeart, FaDownload, FaShare } from "react-icons/fa";

const PhotoCard = ({ photo }) => {
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 photo"
      key={photo.id}
    >
      <img
        className="h-auto max-w-lg transition-all duration-300 rounded-lg blur-none hover:blur-sm w-[100%]"
        src={photo.urls.regular}
        alt={photo.alt_description}
      />
      <div className="photo info">
        <div className="photo-header">
          <h4>{photo.user.name}</h4>
          <button className="favourite-btn">
            <FaHeart />
          </button>
        </div>
        <div className="photo-actions">
          <p>
            <FaHeart className="heart-icon" />
            {photo.likes}
          </p>
          <button className="sahre-btn">
            <FaShare />
          </button>
          <button className="download-btn">
            <FaDownload />
          </button>
        </div>
        <a href="{photo.user.portfolio_url}">
          <img
            src={photo.user.profile_image.medium}
            className="user-img"
            alt={photo.user.name}
          />
        </a>
      </div>
    </div>
  );
};

export default PhotoCard;