import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

/**
 * Button component sử dụng Bootstrap
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "primary" | "secondary" | "outline" | "danger" | "link"
  size?: "sm" | "lg"
  className?: string
}

const variantClass: Record<string, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  outline: "btn btn-outline-secondary",
  danger: "btn btn-danger",
  link: "btn btn-link",
}

const sizeClass: Record<string, string> = {
  sm: "btn-sm",
  lg: "btn-lg",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const sizeClassStr = size ? sizeClass[size] || "" : ""
    return (
      <Comp
        className={`${variantClass[variant] || variantClass.primary} ${sizeClassStr} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 
