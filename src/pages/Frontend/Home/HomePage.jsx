import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <p className="flex items-center justify-center font-extrabold text-2xl h-screen">
      <Link to={'/dashboard'}>Furniture Home page</Link>
    </p>
  )
}
