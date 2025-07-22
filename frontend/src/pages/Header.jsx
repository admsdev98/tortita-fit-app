import React from "react";
import logo from "../assets/images/logo.png";
import Navigation from "../components/common/Navigation";

const Header = () => {
  return (
    <div>
      <div className="flex justify-end px-4 pb-4">
        <Navigation />
      </div>
      
      <div className="flex items-center justify-center p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Tu Tortita Fit Logo" className="w-64 h-64 object-contain"/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;