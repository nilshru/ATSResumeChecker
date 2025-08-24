import React from "react";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Works from "../components/Works/Works";
import Testimonials from "../components/Testimonials/Testimonials";

// import FeedBackSection from '../components/FeedBackSection/FeedBackSection'

function Home() {
 
  return (
    <>
      <Hero />
      <Features />
      <Works />
      <Testimonials />
      {/* <FeedBackSection/> */}
    </>
  );
}

export default Home;
 