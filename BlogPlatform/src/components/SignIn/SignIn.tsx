import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useExistingUserLoginMutation } from '../../Api/blogApi'
import { signInUser } from '../../stores/userSlice'
import { serverError } from '../../utils/serverError'
import { SignInForm, FetchBaseQueryError } from '../type'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>()

  const [loginUser, { data, isError, error, isSuccess }] = useExistingUserLoginMutation()

  const isAuthError = (error as FetchBaseQueryError)?.status === 422
  const errorMessage = 'Incorrect username or password.'

  const onSubmit = (user: SignInForm) => {
    loginUser({
      email: user.email.toLowerCase(),
      password: user.password,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(signInUser(data.user))
      localStorage.setItem('user-data', JSON.stringify(data.user))
      navigate('/successful-message', { state: { from: 'sign-in' } })
    }
    if (isError && !isAuthError) {
      navigate('/error-message')
    }
  }, [isSuccess, isError, data, navigate, dispatch, isAuthError])

  return (
    <form
      className="container mt-5"
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: 384, backgroundColor: '#fff', borderRadius: 6, padding: '48px 32px' }}
    >
      <h2 className="mb-4" style={{ fontSize: 20, textAlign: 'center' }}>
        Sign In
      </h2>
      <div className="mb-3">
        <label style={{ fontSize: 14 }} className="form-label">
          Email address
        </label>
        <input
          style={{ fontSize: 16 }}
          type="email"
          className="form-control"
          placeholder="Email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label style={{ fontSize: 14 }} className="form-label">
          Password
        </label>
        <input
          style={{ fontSize: 16 }}
          type="password"
          className="form-control"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errors.password && <p className="text-danger">{errors.password.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary d-grid gap-2 col-12 mx-auto">
        Login
      </button>
      <div className="mt-3" style={{ fontSize: 12, color: '#8C8C8C', textAlign: 'center' }}>
        {serverError(isError, isAuthError, errorMessage)}
        Don’t have an account?{' '}
        <Link to="/sign-up" className="text-decoration-none">
          Sign Up
        </Link>
      </div>
    </form>
  )
}

export default SignIn
