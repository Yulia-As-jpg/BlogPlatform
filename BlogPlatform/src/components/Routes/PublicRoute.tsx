import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface User {
  username: string
  email: string
  token: string
  image: string
}

interface UserState {
  user: User | null
}

interface RootState {
  user: UserState
}

const PublicRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.user?.user?.token)
  return token ? <Navigate to="/successful-message" replace state={{ from: 'sign-in' }} /> : <Outlet />
}

export default PublicRoute
