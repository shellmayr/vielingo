export function BackgroundClouds() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        className="absolute top-20 left-10 w-64 h-64 bg-white/30 rounded-full blur-3xl opacity-80"
        style={{ animation: "float 15s infinite ease-in-out" }}
      ></div>
      <div 
        className="absolute top-40 right-20 w-80 h-80 bg-white/30 rounded-full blur-3xl opacity-80"
        style={{ animation: "float 18s infinite ease-in-out reverse", animationDelay: "2s" }}
      ></div>
      <div 
        className="absolute bottom-20 left-1/4 w-72 h-72 bg-white/30 rounded-full blur-3xl opacity-80"
        style={{ animation: "float 20s infinite ease-in-out", animationDelay: "1s" }}
      ></div>
    </div>
  )
} 