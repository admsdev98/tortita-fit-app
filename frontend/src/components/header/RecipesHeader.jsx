import React from "react";
import logo from "../../assets/images/logo.png";
import Navigation from "../common/Navigation";
import { Link } from "react-router-dom";

const RecipesHeader = ({ isSearchOpen, setIsSearchOpen, searchTerm, setSearchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/recipes">
            <img src={logo} alt="Tu Tortita Fit Logo" className="w-24 h-24 object-contain"/>
          </Link>
        </div>
        <Navigation />
      </div>
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center px-4 py-4 z-30 bg-white shadow-2xl animate-fadeIn">
          <input
            autoFocus
            type="text"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); onSearchChange(e.target.value); }}
            onBlur={() => setIsSearchOpen(false)}
            className="w-full max-w-2xl px-6 py-3 rounded-full border-2 border-orange-500 bg-white shadow-lg text-base focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-orange-500 text-2xl font-bold px-2 py-1 rounded-full hover:bg-orange-100"
            tabIndex={-1}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
};

export default RecipesHeader;