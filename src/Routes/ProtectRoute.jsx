import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/context'
import PreLoader from '../common/Loader/PreLoader'

const ProtectRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading && !user) {
    return <PreLoader />
  }

  if (user) {
    return children
  }

  return (
    <Navigate
      to="/dashboard/signin"
      state={{ from: location }}
      replace
    ></Navigate>
  )
}

export default ProtectRoute
