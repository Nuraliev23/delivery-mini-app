"use client"

import React from "react"

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ${props.className || ''}`}
  >
    {children}
  </button>
)
