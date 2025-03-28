export function Logo() {
  return (
    <div className="w-10 h-10 relative">
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        {/* Speech bubble */}
        <path
          d="M5 20C5 11.7157 11.7157 5 20 5C28.2843 5 35 11.7157 35 20C35 24.7403 32.7083 28.9238 29.2776 31.4076C29.6025 33.2743 30.6108 35.5 32.5 36.5C29.5 37.5 26.5736 35.9393 25.5 34.5C23.7478 34.8346 21.9066 35 20 35C11.7157 35 5 28.2843 5 20Z"
          fill="#3a523a"
        />

        {/* Character face - updated to match VieLinGo */}
        <circle cx="20" cy="20" r="8" fill="#f5efd5" />
        <circle cx="17" cy="18" r="1.5" fill="#3a523a" />
        <circle cx="23" cy="18" r="1.5" fill="#3a523a" />
        <path
          d="M16 23C16 23 18 25 20 25C22 25 24 23 24 23"
          stroke="#3a523a"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* V shape for VieLinGo */}
        <path d="M15 14L20 18L25 14" stroke="#f5efd5" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

