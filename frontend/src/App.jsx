import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Calculator from './pages/Calculator'

function App() {
  const location = useLocation()

  return (
    <div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App 