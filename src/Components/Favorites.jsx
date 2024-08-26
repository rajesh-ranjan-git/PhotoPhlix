import React from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import PhotoCard from "./PhotoCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const Favorites = () => {
  const {
    loadingContext,
    favPhotosContext,
    lightboxIndexContext,
    lightboxArrContext,
    isLightboxOpenContext,
    searchQueryContext,
  } = useGlobalContext();

  const { loading } = loadingContext;
  const { favPhotos } = favPhotosContext;
  const { lightboxIndex } = lightboxIndexContext;
  const { lightboxArr } = lightboxArrContext;
  const { isLightboxOpen, setIsLightboxOpen } = isLightboxOpenContext;
  const { searchQuery } = searchQueryContext;

  return (
    <main className="mt-28 mx-10">
      <section className="photos flex justify-evenly flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : favPhotos.length > 0 ? (
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
        ) : (
          <div className="flex justify-center items-center h-[85vh]">
            <p className="text-5xl">No Favorite Photos yet...</p>
          </div>
        )}
      </section>

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={lightboxArr}
          plugins={[Captions, Thumbnails]}
          index={lightboxIndex}
        />
      )}
    </main>
  );
};

export default Favorites;
