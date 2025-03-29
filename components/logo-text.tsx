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

  return (
    <span className={`font-mogra text-sage-dark ${sizeClasses[size]} ${className}`}>
      vielingo
    </span>
  );
} 