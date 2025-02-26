import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserHeader from '../UserHeader'
import styles from './Header.module.scss'
import { RootState } from '../type'

const Header: React.FC = () => {
  const token = useSelector((state: RootState) => state.user?.user?.token)
  return (
    <header className={styles.Header}>
      <Link to="/">
        <button type="button" className="btn" style={{ fontSize: 18, borderColor: '#fff' }}>
          Realworld Blog
        </button>
      </Link>
      {token ? (
        <UserHeader />
      ) : (
        <div className={styles.flex}>
          <Link to="/sign-in">
            <button type="button" className="btn" style={{ fontSize: 18 }}>
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button
              type="button"
              className="btn btn-outline-success"
              style={{ color: '#52c41a', borderColor: '#52C41A', background: 'unset' }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
