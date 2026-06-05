import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={px-3 py-2 border border-gray-300 rounded +""+${className || ''}+""+}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
