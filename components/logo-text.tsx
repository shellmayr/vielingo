import Image from "next/image"

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
    <div className="relative inline-flex items-center gap-1">
      {/* Logo SVG */}
      <Image
        src="/images/logo-v.svg"
        alt="VieLinGo Logo"
        width={48}
        height={48}
        className="h-12 w-12"
      />
      
      {/* Main text container */}
      <span className={`relative font-mogra text-sage-dark ${sizeClasses[size]} ${className}`}>
        {/* First part of text before the descending character */}
        <span className="inline-block">vielingo</span>
      </span>
    </div>
  );
} 