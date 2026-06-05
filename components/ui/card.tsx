import React from 'react'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={ounded-lg border border-gray-200 bg-white shadow-sm +""+${className || ''}+""+}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={p-6 +""+${className || ''}+""+} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={	ext-2xl font-bold +""+${className || ''}+""+} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={p-6 pt-0 +""+${className || ''}+""+} {...props} />
))
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }
