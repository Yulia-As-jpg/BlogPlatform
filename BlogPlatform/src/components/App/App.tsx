import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'
import ArticlePage from '../../components/ArticlePage'
import Articles from '../../components/Articles'
import CreateArticle from '../../components/CreateArticle'
import ErrorPage from '../../components/ErrorPage'
import Header from '../../components/Header'
import PageNotFound from '../../components/PageNotFound'
import PrivateRoute from '../../components/Routes/PrivateRoute'
import PublicRoute from '../../components/Routes/PublicRoute'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import SuccessfulMessage from '../../components/SuccessfulMessage'
import UserProfile from '../../components/UserProfile'
import { checkUserAuth } from '../../stores/userSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/article/:slug" element={<ArticlePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/article/:slug/edit" element={<CreateArticle />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
        <Route path="/error-message" element={<ErrorPage />} />
        <Route path="/successful-message" element={<SuccessfulMessage />} />
      </Routes>
    </div>
  )
}

export default App
