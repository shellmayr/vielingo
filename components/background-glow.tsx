export function BackgroundGlow() {
  return (
    <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
      {/* Main center glow */}
      <div 
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 
                  bg-glow-yellow rounded-full"
        style={{ animation: "pulse 8s infinite ease-in-out" }}
      ></div>
      
      {/* Bottom right corner glow */}
      <div 
        className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] 
                  bg-glow-teal rounded-full"
        style={{ animation: "pulse 12s infinite ease-in-out", animationDelay: "2s" }}
      ></div>
      
      {/* Top left corner glow */}
      <div 
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] 
                  bg-glow-blue rounded-full"
        style={{ animation: "pulse 10s infinite ease-in-out", animationDelay: "1s" }}
      ></div>
    </div>
  )
} 