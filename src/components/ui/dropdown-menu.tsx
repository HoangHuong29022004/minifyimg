import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef(
  (props: any, ref: any) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        style={{
          zIndex: 9999,
          minWidth: '8rem',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '0.375rem',
          boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem'
        }}
        className={props.className}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
)
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef(
  (props: any, ref: any) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      style={{
        padding: '0.5rem 0.75rem',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out'
      }}
      className={`dropdown-item ${props.className || ''}`}
      {...props}
    />
  )
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuLabel = React.forwardRef(
  (props: any, ref: any) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={`fw-semibold px-3 py-2 ${props.className || ''}`}
      {...props}
    />
  )
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef(
  (props: any, ref: any) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`dropdown-divider ${props.className || ''}`}
      {...props}
    />
  )
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} 
