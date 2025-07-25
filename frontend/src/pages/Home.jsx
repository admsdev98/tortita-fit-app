import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import HomeMain from "../components/home/HomeMain";
import HomeDescription from "../components/home/HomeDescription";
import PageTransition from "../components/common/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <div className="h-screen snap-start flex flex-col overflow-hidden">
          <HomeHeader />
          <HomeMain />
        </div>
        <div className="h-screen snap-start flex items-center justify-center px-4 overflow-hidden">
          <HomeDescription />
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;