import React from "react";
import "./homepage.css";
import Badges from "../components/Badges";
import Promos from "../components/Promos";
import Categories from "../components/Categories";
import Hero from "../components/Hero";

function Homepage() {
  return (
    <>
      <Hero />
      <Badges />
      <Promos />
      <Categories />
    </>
  );
}

export default Homepage;
