import React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "green" | "blue" | "purple"
}

export function Badge({ 
  children, 
  className = "", 
  variant = "default", 
  ...props 
}: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
  
  const variantStyles = {
    default: "bg-sage-dark/10 text-sage-dark",
    outline: "border border-sage-dark/20 text-sage-dark",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800"
  }
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`
  
  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  )
}
