import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext("");

const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        loadingContext: { loading, setLoading },
        photosContext: { photos, setPhotos },
        favPhotosContext: { favPhotos, setFavPhotos },
        lightboxIndexContext: { lightboxIndex, setLightboxIndex },
        isLightboxOpenContext: { isLightboxOpen, setIsLightboxOpen },
        queryContext: { query, setQuery },
        searchQueryContext: { searchQuery, setSearchQuery },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { useGlobalContext, GlobalContextProvider };
