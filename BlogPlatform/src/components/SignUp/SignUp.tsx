import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterANewUserMutation } from '../../Api/blogApi'
import { serverError } from '../../utils/serverError'
import { SignUpForm, BaseQueryError } from '../type'

const isFetchBaseQueryError = (error: unknown): error is BaseQueryError => {
  return error !== undefined && (error as BaseQueryError).data !== undefined
}

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const [registerUser, { isError, error, isSuccess }] = useRegisterANewUserMutation()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>()

  const password = watch('password')
  const isAuthError = isFetchBaseQueryError(error) && error.status === 422

  const errorUsernameMessage =
    isFetchBaseQueryError(error) && error.data.errors?.username ? `Username ${error.data.errors.username}` : ''

  const errorEmailMessage =
    isFetchBaseQueryError(error) && error.data.errors?.email ? `Email ${error.data.errors.email}` : ''

  const [checkboxStatus, setCheckboxStatus] = useState(false)

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus)
  }

  const onSubmit = (data: SignUpForm) => {
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/successful-message', { state: { from: 'sign-up' } })
    }
  }, [isSuccess, navigate])

  return (
    <form
      style={{ width: 384, backgroundColor: '#fff', padding: '48px 32px' }}
      className="container mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} className="mb-4">
        Create new account
      </h2>
      <div style={{ fontSize: 14 }} className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your username must be no more than 20 characters.',
            },
          })}
        />
        {errors.username && <p className="text-danger">{errors.username.message}</p>}
      </div>
      <div style={{ fontSize: 14 }} className="mb-3">
        <label className="form-label">Email address</label>
        <input
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
      <div style={{ fontSize: 14 }} className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
          })}
        />
        {errors.password && <p className="text-danger">{errors.password.message}</p>}
      </div>
      <div style={{ fontSize: 14 }} className="mb-3">
        <label className="form-label">Repeat Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          {...register('confirmPassword', {
            required: 'You must confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={handleCheckboxChange}
          {...register('checkbox', {
            required: 'You must agree to the processing of personal information',
          })}
        />
        <label style={{ fontSize: 14 }} className="form-check-label">
          I agree to the processing of my personal information
        </label>
      </div>
      {errors.checkbox && <p className="text-danger">{errors.checkbox.message}</p>}
      <button type="submit" className="btn btn-primary d-grid gap-2 col-12 mx-auto">
        Create
      </button>
      {serverError(isError, isAuthError, errorUsernameMessage, errorEmailMessage)}
      <div style={{ fontSize: 12, textAlign: 'center', color: '#8C8C8C' }} className="mt-3">
        Already have an account?{' '}
        <Link to="/sign-in" className="text-decoration-none">
          Sign In
        </Link>
      </div>
    </form>
  )
}

export default SignUp
