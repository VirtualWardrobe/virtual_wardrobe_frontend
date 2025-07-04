import React from "react";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import Testimonials from "./components/Testimonials";
import FaqComponent from "./components/Faqs";
import Team from "./components/Team";

const page = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <Testimonials />
      <FaqComponent />
      <Team />
    </div>
  );
};

export default page;
