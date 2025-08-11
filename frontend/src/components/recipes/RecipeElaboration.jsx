import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipesHeader from '../header/RecipesHeader'

const Bar = ({ label, value, color, max }) => {
  const percent = Math.min((parseInt(value) / max) * 100, 100)
  return (
    <div className="flex items-center space-x-2 w-full">
      <span className="text-xs font-medium text-gray-700 w-16">{label}</span>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%`, background: color }}
        ></div>
      </div>
      <span className="text-xs font-semibold text-gray-700 w-10 text-right">{value}g</span>
    </div>
  )
}

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-xl font-semibold text-gray-800 transition-colors duration-300"
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>▶</span>
      </button>
      {open && (
        <div className="p-4 bg-white rounded-b-xl border-t border-orange-100 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  )
}

const icons = ['🥣','🥚','🥛','🥄','🍳','🥞']
const colors = [
  'bg-orange-50', 'bg-blue-50', 'bg-green-50',
  'bg-purple-50', 'bg-pink-50', 'bg-yellow-50'
]

function StepZigzag({ steps, checked, onCheck }) {
  return (
    <div className="relative flex flex-col items-center">
      {steps.map((step, i) => (
        <div key={i} className={`w-full flex ${i%2===0 ? 'justify-start' : 'justify-end'} mb-6 relative z-10`}>
          <div className={`relative max-w-xs w-full p-4 rounded-2xl shadow-lg ${colors[i%colors.length]} transition-all duration-300
            ${checked[i] ? 'opacity-60 line-through' : ''} animate-fadeIn`}
            style={{animationDelay: `${i*80}ms`}}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{icons[i%icons.length]}</span>
              <span className="font-bold text-lg mr-2">Paso {i+1}</span>
              <span className="ml-auto text-gray-500 flex items-center text-sm">
                ⏱️ {step.time}
              </span>
            </div>
            <div className="mb-2 text-gray-800">{step.description}</div>
            <button
              onClick={() => onCheck(i)}
              className={`absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${checked[i] ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400 hover:bg-green-100 hover:border-green-400'} transition-all duration-200`}
              title={checked[i] ? 'Desmarcar paso' : 'Marcar paso'}
            >
              {checked[i] ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ))}
      {/* Línea de conexión vertical */}
      <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-orange-200 to-yellow-100 z-0 pointer-events-none" style={{transform: 'translateX(-50%)'}} />
    </div>
  )
}

const stepIcons = ['🍌','🥚','🥛','🥄','🍳','🥞']
const stepColors = [
  'from-orange-50 to-orange-100',
  'from-pink-50 to-pink-100',
  'from-green-50 to-green-100',
  'from-yellow-50 to-yellow-100',
  'from-blue-50 to-blue-100',
  'from-purple-50 to-purple-100'
]

function StepCarousel({ steps, checked, onCheck, tips, ingredients }) {
  const [current, setCurrent] = useState(0)
  const [showTip, setShowTip] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  // Iconos minimalistas según el tipo de paso
  const icons = steps.map((s, i) => {
    if (i === steps.length - 1) return '✅'
    const desc = s.description.toLowerCase()
    if (desc.includes('horno') || desc.includes('hornear') || desc.includes('cocina') || desc.includes('sartén') || desc.includes('fuego')) return '🔥'
    return '⚙️'
  })

  // Slides: primero ingredientes, luego pasos, último slide especial
  const slides = [
    { type: 'ingredients' },
    ...steps.map((s, i) => ({ type: 'step', step: s, icon: icons[i], tip: tips[i], checked: checked[i], idx: i })),
    { type: 'finish' }
  ]

  const isIngredients = current === 0
  const isFinish = current === slides.length - 1
  const step = slides[current].step
  const icon = slides[current].icon
  const tip = slides[current].tip
  const isChecked = slides[current].checked
  const idx = slides[current].idx

  let state = 'todo'
  if (!isIngredients && !isFinish) {
    if (isChecked) state = 'done'
    else if (idx === checked.findIndex(v => !v)) state = 'active'
    else if (idx === checked.findIndex(v => !v) + 1) state = 'next'
  }

  // Transición suave entre slides
  const [slideKey, setSlideKey] = useState(0)
  React.useEffect(() => { setSlideKey(current) }, [current])

  function goTo(idx) {
    setCurrent(idx)
  }

  // Swipe handlers
  function handleTouchStart(e) {
    if (e.touches && e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX)
      setTouchEndX(null)
    }
  }
  function handleTouchMove(e) {
    if (e.touches && e.touches.length === 1) {
      setTouchEndX(e.touches[0].clientX)
    }
  }
  function handleTouchEnd() {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX
      if (Math.abs(diff) > 50) { // Umbral mínimo para swipe
        if (diff > 0 && current < slides.length - 1) {
          goTo(current + 1) // Swipe izquierda: siguiente
        } else if (diff < 0 && current > 0) {
          goTo(current - 1) // Swipe derecha: anterior
        }
      }
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  // Mobile: solo tres circulitos visibles
  function getMobileCircles() {
    const total = slides.length
    if (total <= 3) return slides.map((s, i) => i)
    if (current === 0) return [0, 1, 2]
    if (current === total - 1) return [total - 3, total - 2, total - 1]
    return [current - 1, current, current + 1]
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center h-[320px] sm:h-[360px] md:h-[420px] overflow-visible">
      {/* Flecha izquierda (solo para navegar entre pasos, no volver atrás) */}
      {current > 0 && (
        <button
          onClick={() => goTo(current - 1)}
          className="hidden md:block absolute left-2 md:-left-6 top-2/3 md:top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white shadow-lg rounded-full text-orange-500 hover:bg-orange-100 z-20 transition-all duration-200"
          aria-label="Anterior"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {/* Flecha derecha (solo desktop, simétrica) */}
      {current < slides.length - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="hidden md:block absolute right-2 md:-right-6 top-2/3 md:top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white shadow-lg rounded-full text-orange-500 hover:bg-orange-100 z-20 transition-all duration-200"
          aria-label="Siguiente"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {/* Diapositiva actual con transición y swipe */}
      <div
        key={slideKey}
        className="absolute w-full flex flex-col items-center justify-center fade-slide"
        style={{
          zIndex: 10,
          animation: 'fade-slide-in 0.4s',
          position: 'relative',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isIngredients ? (
          <div className="relative w-full max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-orange-200 bg-white flex flex-col items-center justify-center mx-auto min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
            <h3 className="font-bold text-orange-600 mb-3 text-base sm:text-lg">Ingredientes</h3>
            {ingredients.length === 1 && ingredients[0].name === "Estamos preparando la mejor lista de la compra" ? (
              <div className="text-gray-500 text-sm sm:text-base">{ingredients[0].name}</div>
            ) : (
              <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-1 sm:space-y-2">
                {ingredients.map((ing, idx) => (
                  <li key={idx}><span className="font-medium">{ing.name}</span> <span className="text-gray-500">{ing.amount}</span></li>
                ))}
              </ul>
            )}
          </div>
        ) : isFinish ? (
          <div className="relative w-full max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-green-400 bg-white flex flex-col items-center justify-center mx-auto min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
            <span className="text-3xl sm:text-4xl md:text-5xl mb-4">✅</span>
            <div className="text-center font-bold text-lg sm:text-xl md:text-2xl text-green-700">Disfruta de tu plato</div>
          </div>
        ) : (
          <div className={`relative w-full max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border transition-all duration-300
            bg-white
            ${isChecked ? 'border-green-200 opacity-90' : state === 'active' ? 'border-orange-400' : 'border-gray-200'}
            flex flex-col items-center justify-center mx-auto min-h-[180px] sm:min-h-[200px] md:min-h-[220px]`}
          >
            {/* Botón de tips en la esquina superior izquierda */}
            {tip && (
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => setShowTip(v => !v)}
                  className="text-yellow-400 cursor-pointer hover:scale-125 transition-transform duration-200 text-xl sm:text-2xl"
                  title="Ver truco"
                >
                  💡
                </button>
                {showTip && (
                  <div className="absolute left-0 mt-2 w-48 sm:w-56 bg-white border border-yellow-200 rounded-xl shadow-lg p-3 z-20 text-xs text-gray-700 animate-fadeIn">
                    <span className="font-bold text-yellow-500">Tip:</span> {tip}
                  </div>
                )}
              </div>
            )}
            {/* Botón de check en la esquina superior derecha */}
            <button
              onClick={() => onCheck(idx)}
              className={`absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center
                ${isChecked ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400 hover:bg-green-100 hover:border-green-400'} transition-all duration-200`}
              title={isChecked ? 'Desmarcar paso' : 'Marcar paso'}
            >
              {isChecked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            {/* Icono grande minimalista */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full shadow text-xl sm:text-2xl md:text-3xl mb-2 mx-auto bg-gray-50">
              {icon}
            </div>
            {/* Título y tiempo */}
            <div className="text-center font-bold text-sm sm:text-base md:text-lg mb-2 text-gray-800">
              {step.description}
            </div>
            <div className="flex items-center justify-center text-xs sm:text-sm md:text-base text-gray-500 mb-2">
              <span className="mr-1">⏱️</span> {step.time}
            </div>
          </div>
        )}
      </div>
      {/* Mobile: solo tres circulitos y flechas */}
      <div className="flex md:hidden justify-center items-center space-x-2 mt-8 sm:mt-10 w-full">
        {current > 0 && (
          <button
            onClick={() => goTo(current - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border-2 text-xs font-bold focus:outline-none transition-all duration-200 bg-white border-gray-300 text-orange-500 hover:bg-orange-100"
            aria-label="Anterior"
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {getMobileCircles().map(i => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-xs font-bold focus:outline-none transition-all duration-200
              ${slides[i].type === 'finish' ? 'bg-green-500 border-green-500 text-white' : !slides[i].step ? 'bg-orange-100 border-orange-300 text-orange-700' : checked[slides[i].idx] ? 'bg-green-500 border-green-500 text-white' : i === current ? 'bg-orange-200 border-orange-400 text-orange-700' : 'bg-gray-100 border-gray-300 text-gray-400'}`}
            aria-label={`Ir al paso ${i + 1}`}
            type="button"
          >
            {slides[i].type === 'finish'
              ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>)
              : !slides[i].step
                ? <span className="text-lg">🥕</span>
                : checked[slides[i].idx]
                  ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>)
                  : i + 1
            }
          </button>
        ))}
        {current < slides.length - 1 && (
          <button
            onClick={() => goTo(current + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border-2 text-xs font-bold focus:outline-none transition-all duration-200 bg-white border-gray-300 text-orange-500 hover:bg-orange-100"
            aria-label="Siguiente"
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      {/* Desktop: todos los circulitos */}
      <div className={`hidden md:flex justify-center items-center space-x-4 mt-10 ${slides.length > 6 ? 'overflow-x-auto flex-nowrap' : ''}`}>
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-base font-bold focus:outline-none transition-all duration-200
              ${slide.type === 'finish' ? 'bg-green-500 border-green-500 text-white' : !slide.step ? 'bg-orange-100 border-orange-300 text-orange-700' : checked[slide.idx] ? 'bg-green-500 border-green-500 text-white' : i === current ? 'bg-orange-200 border-orange-400 text-orange-700' : 'bg-gray-100 border-gray-300 text-gray-400'}`}
            aria-label={`Ir al paso ${i + 1}`}
            type="button"
          >
            {slide.type === 'finish'
              ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>)
              : !slide.step
                ? <span className="text-lg">🥕</span>
                : checked[slide.idx]
                  ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>)
                  : i + 1
            }
          </button>
        ))}
      </div>
    </div>
  )
}

function LikeButton() {
  const [isFavorite, setIsFavorite] = useState(false)
  return (
    <button
      onClick={() => setIsFavorite(f => !f)}
      className={`bg-white shadow-lg rounded-full p-3 flex items-center text-red-500 hover:bg-red-100 transition-all duration-300 ${isFavorite ? 'bg-red-100' : ''}`}
      title={isFavorite ? 'Favorito' : 'Favoritos'}
    >
      <span className="text-2xl">{isFavorite ? '❤️' : '🤍'}</span>
    </button>
  )
}

function RecipeElaboration({ recipe, elaboration }) {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const [checkedSteps, setCheckedSteps] = useState([])
  // Elimina cualquier referencia a showIngredients y el botón de ingredientes
  // Mantén solo la diapositiva de ingredientes como la primera del carrusel

  const handleBack = () => {
    navigate(-1)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  if (!recipe || !elaboration) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando receta...</p>
        </div>
      </div>
    )
  }

  // Valores para las barras
  const protein = parseInt(elaboration.nutritionInfo?.protein || '0')
  const fat = parseInt(elaboration.nutritionInfo?.fat || '0')
  const carbs = parseInt(elaboration.nutritionInfo?.carbs || '0')
  const kcal = elaboration.nutritionInfo?.calories || 0
  const maxBar = Math.max(protein, fat, carbs, 1)
  const tips = elaboration.steps.map(s => s.tips || null)

  return (
    <div className="min-h-screen bg-gray-50">
      <RecipesHeader />
      <div className="relative max-w-4xl mx-auto px-4 py-6">
        {/* Botones de volver y like en mobile */}
        <div className="flex md:hidden justify-between items-center w-full max-w-3xl mx-auto mb-6">
          <button
            onClick={handleBack}
            className="bg-white shadow-lg rounded-full p-2 flex items-center text-orange-500 hover:bg-orange-100 transition-all duration-300"
          >
            <span className="text-xl">←</span>
          </button>
          <button
            onClick={toggleFavorite}
            className={`bg-white shadow-lg rounded-full p-2 flex items-center text-red-500 hover:bg-red-100 transition-all duration-300 ${isFavorite ? 'bg-red-100' : ''}`}
            title={isFavorite ? 'Favorito' : 'Favoritos'}
          >
            <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>
        {/* Botones de volver y like en desktop */}
        <div className="hidden md:flex flex-col items-center fixed right-8 top-40 z-30 space-y-4">
          <button
            onClick={handleBack}
            className="bg-white shadow-lg rounded-full p-3 flex items-center text-orange-500 hover:bg-orange-100 transition-all duration-300"
          >
            <span className="text-2xl">←</span>
          </button>
          <button
            onClick={toggleFavorite}
            className={`bg-white shadow-lg rounded-full p-3 flex items-center text-red-500 hover:bg-red-100 transition-all duration-300 ${isFavorite ? 'bg-red-100' : ''}`}
            title={isFavorite ? 'Favorito' : 'Favoritos'}
          >
            <span className="text-2xl">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>
        {/* Título centrado */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          {recipe.title}
        </h1>
        {/* Minibarras de vida y calorías + ingredientes */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6 gap-4">
          <div className="flex flex-col space-y-2 w-full md:w-2/3">
            <Bar label="Proteínas" value={protein} color="#34d399" max={maxBar} />
            <Bar label="Grasas" value={fat} color="#fbbf24" max={maxBar} />
            <Bar label="Carbs" value={carbs} color="#60a5fa" max={maxBar} />
          </div>
          <div className="flex flex-row items-end justify-end gap-4">
            <div className="flex flex-col items-center justify-center bg-orange-100 rounded-xl px-6 py-3 shadow">
              <span className="text-2xl font-bold text-orange-500">{kcal}</span>
              <span className="text-xs text-gray-500">kcal / 100gr</span>
            </div>
          </div>
        </div>
        {/* Iconos informativos */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-lg">⏱️</span>
            <span className="text-xs text-gray-500">{recipe.total_time}</span>
          </div>
        </div>
        {/* Descripción */}
        <p className="text-gray-600 mb-8 text-center text-sm sm:text-base">
          {recipe.description}
        </p>
        {/* Carrusel de pasos con transición suave */}
        <div className="mb-8">
          <StepCarousel
            steps={elaboration.steps}
            checked={elaboration.steps.map((s, i) => checkedSteps.includes(s.step))}
            onCheck={i => {
              const stepNum = elaboration.steps[i].step
              setCheckedSteps(checkedSteps.includes(stepNum)
                ? checkedSteps.filter(s => s !== stepNum)
                : [...checkedSteps, stepNum])
            }}
            tips={tips}
            ingredients={elaboration.ingredients}
          />
        </div>
      </div>
      <style>{`
      .fade-slide-enter {
        opacity: 0;
        transform: translateY(30px);
      }
      .fade-slide-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 400ms, transform 400ms;
      }
      .fade-slide-exit {
        opacity: 1;
        transform: translateY(0);
      }
      .fade-slide-exit-active {
        opacity: 0;
        transform: translateY(-30px);
        transition: opacity 400ms, transform 400ms;
      }
      `}</style>
    </div>
  )
}

export default RecipeElaboration
