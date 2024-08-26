import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ErrorNavbar = () => {
  const navigate = useNavigate();

  const handleFavorite = () => {
    navigate("/favorites");
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-10 h-auto">
              <img src="\favicon.webp" alt="logo" />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PhotoPhlix
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleFavorite}
            >
              Favorites
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ErrorNavbar;
