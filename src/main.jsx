import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Error from "./Components/Error";
import Favorites from "./Components/Favorites.jsx";
import { GlobalContextProvider } from "./Context/GlobalContext.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
