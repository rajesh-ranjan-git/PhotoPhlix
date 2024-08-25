import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const closeLightBox = () => {
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const clientID = "?client_id=AW3Og75vq_jqIfX-snfehkd6iLVRkaqE4tYA2e4gsRo";
      const mainUrl = "https://api.unsplash.com/photos/";

      try {
        const response = await fetch(`${mainUrl}${clientID}`);
        const data = await response.json();

        setPhotos(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <main className="mt-28 mx-10">
      <section className="photos flex justify-evenly flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          photos.map((photo) => {
            return (
              <PhotoCard
                photo={photo}
                photos={photos}
                key={photo.id}
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
