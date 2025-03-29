export interface LogoTextProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function LogoText({ className = "", size = "medium" }: LogoTextProps) {
  // Size classes based on the size prop
  const sizeClasses = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl"
  };

  // Underline styling based on size - significantly increased thickness
  const lineHeight = size === 'large' ? '6px' : size === 'medium' ? '5px' : '4px';
  // Adjusted position to move much closer to text
  const baselinePosition = size === 'large' ? '0.08em' : '0.07em';

  return (
    <div className="relative inline-block">
      {/* Main text container */}
      <span className={`relative font-mogra text-sage-dark ${sizeClasses[size]} ${className}`}>
        {/* First part of text before the descending character */}
        <span className="inline-block">vielingo</span>
      </span>
      
      {/* The underline that will be broken by the g */}
      <div 
        className="absolute bg-sage-dark" 
        style={{ 
          height: lineHeight,
          left: 0,
          right: 0,
          bottom: baselinePosition,
          zIndex: 5
        }}
      ></div>
    </div>
  );
} 