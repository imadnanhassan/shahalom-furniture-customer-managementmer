import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function FrontendLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/dashboard')
  }, [])
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </div>
  )
}
