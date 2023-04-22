import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppShell() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>Copyright Trafix 2023</footer>
    </>
  );
}

export default AppShell;
