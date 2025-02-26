import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './SuccessfulMessage.module.scss'
import { MessageKeys } from '../type'

const SuccessfulMessage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from as MessageKeys
  const articleSlug = location.state?.articleSlug

  const messages = {
    profile: {
      title: 'Profile Updated Successfully!',
      text: 'Redirecting to the login form...',
      redirectPath: '/sign-in',
    },
    'sign-up': {
      title: 'Registration Successful!',
      text: 'Redirecting to the login form...',
      redirectPath: '/sign-in',
    },
    'sign-in': {
      title: 'Welcome Back!',
      text: 'Redirecting you to the homepage shortly...',
      redirectPath: '/',
    },
    'new-article': {
      title: 'Article Published Successfully!',
      text: 'Redirecting you to your article...',
      redirectPath: `/article/${articleSlug}`,
    },
    'update-article': {
      title: 'Article Updated Successfully!',
      text: 'Redirecting you to your article...',
      redirectPath: `/article/${articleSlug}`,
    },
    'article-delete': {
      title: 'Article Deleted Successfully!',
      text: 'Redirecting you to the homepage shortly...',
      redirectPath: `/`,
    },
    default: {
      title: 'Success',
      text: '',
      redirectPath: '/',
    },
  }

  const { title, text, redirectPath } = messages[from] || messages.default

  useEffect(() => {
    const timer = setTimeout(() => navigate(redirectPath), 2000)
    return () => clearTimeout(timer)
  }, [navigate, from, redirectPath])

  return (
    <article className={styles.SuccessfulMessage}>
      <h2 className={styles.title}>{title}</h2>
      {text && <p className={styles.paragraph}>{text}</p>}
    </article>
  )
}

export default SuccessfulMessage
