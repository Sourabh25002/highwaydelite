import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import OtpVerification from "./components/Otp";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/OtpVerification",
    element: <OtpVerification />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
