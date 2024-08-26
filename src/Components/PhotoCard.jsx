import React from "react";
import { FaHeart, FaDownload, FaShare } from "react-icons/fa";
import { useGlobalContext } from "../Context/GlobalContext";
import { useLocation } from "react-router";

const PhotoCard = ({ photo, index }) => {
  const {
    photosContext,
    favPhotosContext,
    searchedFavContext,
    lightboxIndexContext,
    lightboxArrContext,
    isLightboxOpenContext,
  } = useGlobalContext();

  const { photos } = photosContext;
  const { favPhotos, setFavPhotos } = favPhotosContext;
  const { searchedFav } = searchedFavContext;
  const { setLightboxIndex } = lightboxIndexContext;
  const { setLightboxArr } = lightboxArrContext;
  const { setIsLightboxOpen } = isLightboxOpenContext;

  const { pathname } = useLocation();

  const openLightBox = (index) => {
    const photosArr = [];
    let tempPhotos = [];
    if (pathname == "/") {
      tempPhotos = photos;
    } else if (pathname == "/favorites") {
      if (searchedFav.length > 0) {
        tempPhotos = searchedFav;
      } else {
        tempPhotos = favPhotos;
      }
    }
    for (let i = 0; i < tempPhotos.length; i++) {
      const src = tempPhotos[i].urls.full;
      const title = tempPhotos[i].user.name;
      photosArr.push({ src, title });
    }
    setLightboxIndex(index);
    setLightboxArr(photosArr);
    setIsLightboxOpen(true);
  };

  const handleSetFavPhotos = (photoId) => {
    const existingIndex = favPhotos.findIndex(
      (favPhoto) => favPhoto.id === photoId
    );

    if (existingIndex !== -1) {
      const photoIdxToRemove = favPhotos.findIndex(
        (favPhoto) => favPhoto.id === photoId
      );
      const photosArr = [...favPhotos];
      photosArr.splice(photoIdxToRemove, 1);
      setFavPhotos(photosArr);
    } else {
      const photoToAdd = photos.find((photo) => photo.id === photoId);
      setFavPhotos((prevFavorites) => [...prevFavorites, photoToAdd]);
    }
  };

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
          className="h-auto w-[100%] m-auto max-w-lg object-cover transition-all duration-300 rounded-lg blur-none hover:blur-sm"
          src={photo.urls.regular}
          alt={photo.alt_description}
          onClick={() => openLightBox(index)}
        />
        <div className="photo info m-2">
          <div className="photo-header flex justify-between">
            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {photo.user.name}
            </h4>
            <button
              className={`favourite-btn ${
                favPhotos.some((favPhoto) => favPhoto.id === photo.id)
                  ? "text-red-800"
                  : ""
              }`}
              onClick={() => {
                handleSetFavPhotos(photo.id);
              }}
            >
              <FaHeart />
            </button>
          </div>
          <div className="flex justify-between">
            <div className="photo-actions flex justify-evenly w-[100%]">
              <div className="flex items-center">
                <div className="mx-2">
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
            </div>
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
