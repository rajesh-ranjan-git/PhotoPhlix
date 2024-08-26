import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext("");

const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);
  const [searchedFav, setSearchedFav] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxArr, setLightboxArr] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <GlobalContext.Provider
      value={{
        loadingContext: { loading, setLoading },
        photosContext: { photos, setPhotos },
        favPhotosContext: { favPhotos, setFavPhotos },
        searchedFavContext: { searchedFav, setSearchedFav },
        lightboxIndexContext: { lightboxIndex, setLightboxIndex },
        lightboxArrContext: { lightboxArr, setLightboxArr },
        isLightboxOpenContext: { isLightboxOpen, setIsLightboxOpen },
        searchQueryContext: { searchQuery, setSearchQuery },
        pageContext: { page, setPage },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { useGlobalContext, GlobalContextProvider };
