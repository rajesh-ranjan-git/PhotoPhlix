import React from "react";
import ErrorNavbar from "./ErrorNavbar";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <ErrorNavbar />
      <div className="flex flex-col justify-center items-center h-[85vh]">
        <img className="w-[15em] h-auto" src="\error.jpg" alt="Error" />
        <p className="text-4xl text-blue-700">
          Oopss! You were not supposed to be Here...
        </p>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm m-5 px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleHome}
        >
          Go Back Home
        </button>
      </div>
    </>
  );
};

export default Error;
