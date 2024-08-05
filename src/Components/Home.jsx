import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);

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

  const handleSetFavPhotos = (photoId) => {
    const existingIndex = favPhotos.findIndex(
      (favPhoto) => favPhoto.id === photoId
    );

    if (existingIndex !== -1) {
      setFavPhotos((prevFavorites) => {
        prevFavorites.filter((favPhoto) => favPhoto.id != photoId);
      });
    } else {
      const photoToAdd = photos.find((photo) => photo.id !== photoId);
      setFavPhotos((prevFavorites) => [...prevFavorites, photoToAdd]);
      console.log(favPhotos);
    }
  };

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
                key={photo.id}
                favPhotos={favPhotos}
                setFavPhotos={setFavPhotos}
                handleSetFavPhoto={handleSetFavPhotos}
                className="photo"
              />
            );
          })
        )}
      </section>
    </main>
  );
};

export default Home;
