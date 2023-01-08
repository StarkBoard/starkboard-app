import React from 'react'

type Props = {
  onClick?: () => void
  className?: string
  children: React.ReactNode
}
const Button = ({ onClick, children, className }: Props) => (
  <button onClick={onClick} type='button' className={`btn-anim-bg-clear border-0 rounded-1 ${className ?? ''}`}>
    {children}
  </button>
)

export default Button
