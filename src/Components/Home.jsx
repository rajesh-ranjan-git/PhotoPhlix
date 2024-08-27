import React, { useEffect } from "react";
import PhotoCard from "./PhotoCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useGlobalContext } from "../Context/GlobalContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const {
    loadingContext,
    photosContext,
    lightboxIndexContext,
    lightboxArrContext,
    isLightboxOpenContext,
    searchQueryContext,
    pageContext,
  } = useGlobalContext();

  const { loading, setLoading } = loadingContext;
  const { photos, setPhotos } = photosContext;
  const { lightboxIndex } = lightboxIndexContext;
  const { lightboxArr } = lightboxArrContext;
  const { isLightboxOpen, setIsLightboxOpen } = isLightboxOpenContext;
  const { searchQuery } = searchQueryContext;
  const { page, setPage } = pageContext;

  const closeLightBox = () => {
    setIsLightboxOpen(false);
  };

  const fetchPhotos = async () => {
    const clientID = "?client_id=AW3Og75vq_jqIfX-snfehkd6iLVRkaqE4tYA2e4gsRo";
    const mainUrl = "https://api.unsplash.com/photos/";
    let url = mainUrl + clientID;

    if (searchQuery) {
      url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`;
    }

    url += `&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((photo) => [...photo, ...(data.results || data)]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchMoreData = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchPhotos();
  }, [searchQuery, page]);

  return (
    <main className="mt-28 mx-10">
      <section>
        <InfiniteScroll
          className="photos flex justify-evenly flex-wrap scroll-smooth"
          dataLength={photos.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {photos.map((photo, index) => {
            return (
              <PhotoCard
                photo={photo}
                key={photo.id}
                index={index}
                className="photo"
              />
            );
          })}
        </InfiniteScroll>
      </section>

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={closeLightBox}
          slides={lightboxArr}
          plugins={[Captions, Thumbnails]}
          index={lightboxIndex}
        />
      )}
    </main>
  );
};

export default Home;
