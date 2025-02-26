import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUpdateCurrentUserMutation } from '../../Api/blogApi'
import { logOutUser } from '../../stores/userSlice'
import { RootState, UserProfileForm } from '../type'

const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user.user)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserProfileForm>({
    defaultValues: {
      username: userData?.username || '',
      email: userData?.email || '',
      password: '',
      avatar: userData?.image || '',
    },
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [updateCurrentUser, { isError, isSuccess }] = useUpdateCurrentUserMutation()

  useEffect(() => {
    reset({
      username: userData?.username || '',
      email: userData?.email || '',
      password: '',
      avatar: userData?.image || '',
    })
  }, [userData, reset])

  const onSubmit: SubmitHandler<UserProfileForm> = (user) => {
    updateCurrentUser({
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.avatar,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOutUser())
      navigate('/successful-message', { state: { from: 'profile' } })
    }
    if (isError) {
      navigate('/error-message')
    }
  }, [isSuccess, isError, dispatch, navigate])

  return (
    <form
      className="container mt-5"
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: 384, backgroundColor: '#fff', borderRadius: 6, padding: '48px 32px' }}
    >
      <h2 className="mb-4" style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        Edit Profile
      </h2>

      <div className="mb-3" style={{ fontSize: 14 }}>
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

      <div className="mb-3" style={{ fontSize: 14 }}>
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

      <div className="mb-3" style={{ fontSize: 14 }}>
        <label className="form-label">New password</label>
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

      <div className="mb-3" style={{ fontSize: 14 }}>
        <label className="form-label">Avatar image (url)</label>
        <input
          type="text"
          className="form-control"
          placeholder="Avatar image"
          {...register('avatar', {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: 'Invalid URL for avatar image',
            },
          })}
        />
        {errors.avatar && <p className="text-danger">{errors.avatar.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary col-12">
        Save
      </button>
    </form>
  )
}

export default UserProfile
