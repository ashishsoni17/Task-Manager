import React from 'react'

function Button({
    children,
    type="button",
    bgBolor = "",
    textColor = "",
    className = "",
    ...props
}) {
  return (
    <button className={`${className} ${bgBolor} ${textColor}`} {...props}>
        {children}
    </button>
  )
}

export default Button