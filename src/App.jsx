import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
