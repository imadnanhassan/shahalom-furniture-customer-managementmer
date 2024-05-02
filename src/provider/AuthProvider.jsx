import { useEffect, useState } from 'react'
import { getFromLocalStorage } from '../utils/local-storage'
import { authkey } from '../constants/authkey'
import { AuthContext } from '../context/context'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const token = getFromLocalStorage(authkey)
  useEffect(() => {
    setLoading(true)
    if (token) {
      fetch(`${import.meta.env.VITE_BASE_URL}/checkAuth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data?.status === 200) {
            setUser(true)
          }
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          console.error(error)
        })
    } else setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(authkey)
    setUser(false)
  }

  const authInfo = {
    user,
    loading,
    logout: handleLogout,
    setUser,
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
