import React from "react";
import logo from "../../assets/images/logo.png";
import Navigation from "../common/Navigation";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <img src={logo} alt="Tu Tortita Fit Logo" className="w-24 h-24 object-contain"/>
      </div>
      
      <Navigation />
    </div>
  )
};

export default Header;