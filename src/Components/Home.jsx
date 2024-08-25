import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useGlobalContext } from "../Context/GlobalContext";

const Home = () => {
  const {
    loadingContext,
    photosContext,
    favPhotosContext,
    lightboxIndexContext,
    isLightboxOpenContext,
    queryContext,
    searchQueryContext,
  } = useGlobalContext();

  const { loading, setLoading } = loadingContext;
  const { photos, setPhotos } = photosContext;
  const { favPhotos, setFavPhotos } = favPhotosContext;
  const { lightboxIndex, setLightboxIndex } = isLightboxOpenContext;
  const { isLightboxOpen, setIsLightboxOpen } = queryContext;
  const { searchQuery, setSearchQuery } = searchQueryContext;

  const closeLightBox = () => {
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const clientID = "?client_id=AW3Og75vq_jqIfX-snfehkd6iLVRkaqE4tYA2e4gsRo";
      const mainUrl = "https://api.unsplash.com/photos/";
      let url = mainUrl + clientID;

      if (searchQuery) {
        url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        setPhotos(data.results || data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchPhotos();
  }, [searchQuery]);

  return (
    <main className="mt-28 mx-10">
      <section className="photos flex justify-evenly flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          photos.map((photo, index) => {
            return (
              <PhotoCard
                photo={photo}
                photos={photos}
                key={photo.id}
                index={index}
                favPhotos={favPhotos}
                setFavPhotos={setFavPhotos}
                setLightboxIndex={setLightboxIndex}
                setIsLightboxOpen={setIsLightboxOpen}
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

export default Home;
