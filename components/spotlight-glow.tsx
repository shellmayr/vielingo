export function SpotlightGlow() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 overflow-visible pointer-events-none">
      {/* Main spotlight glow - larger and more vibrant */}
      <div 
        className="w-[900px] h-[700px] relative"
      >
        {/* Outer glow */}
        <div 
          className="absolute inset-0 bg-gradient-radial from-yellow-300/70 via-orange-200/40 to-transparent rounded-full"
          style={{ 
            animation: "spotlight-pulse 6s infinite ease-in-out",
            filter: "blur(20px)"
          }}
        ></div>
      </div>
    </div>
  )
} 