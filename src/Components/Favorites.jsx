import React from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import PhotoCard from "./PhotoCard";

const Favorites = () => {
  const {
    loadingContext,
    favPhotosContext,
    lightboxIndexContext,
    isLightboxOpenContext,
    searchQueryContext,
    pageContext,
  } = useGlobalContext();

  const { loading, setLoading } = loadingContext;
  const { favPhotos, setFavPhotos } = favPhotosContext;
  const { lightboxIndex, setLightboxIndex } = lightboxIndexContext;
  const { isLightboxOpen, setIsLightboxOpen } = isLightboxOpenContext;
  const { searchQuery } = searchQueryContext;
  const { page, setPage } = pageContext;

  return (
    <main className="mt-28 mx-10">
      <section className="photos flex justify-evenly flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          favPhotos.map((photo, index) => {
            return (
              <PhotoCard
                photo={photo}
                key={photo.id}
                index={index}
                className="photo"
              />
            );
          })
        )}
      </section>

      {isLightboxOpen && (
        <Lightbox
          close={closeLightBox}
          mainUrl={photos[lightboxIndex].urls.full}
        />
      )}
    </main>
  );
};

export default Favorites;
