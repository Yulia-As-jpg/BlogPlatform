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

const PrivateRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.user?.user?.token)
  return token ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
