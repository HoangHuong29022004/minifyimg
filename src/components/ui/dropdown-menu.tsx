import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef(
  (props: any, ref: any) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        style={{zIndex: 9999, minWidth: '8rem'}}
        className={`bg-light border rounded shadow-sm ${props.className || ''}`}
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
      className={`dropdown-item py-2 px-3 ${props.className || ''}`}
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
