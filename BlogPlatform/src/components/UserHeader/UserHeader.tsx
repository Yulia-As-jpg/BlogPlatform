import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import { logOutUser } from '../../stores/userSlice'
import handleImageError from '../../utils/handleImageError'
import styles from './UserHeader.module.scss'
import { RootState } from '../type'

const UserHeader: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  return (
    <div className={styles.UserHeader}>
      <Link to="/new-article">
        <button
          type="button"
          className="btn btn-outline-success"
          style={{ padding: '6px 10px 5px', color: '#52C41A', borderColor: '#52C41A', backgroundColor: '#fff' }}
        >
          Create article
        </button>
      </Link>
      <Link to="/profile">
        <button
          type="button"
          className="btn btn-outline-dark"
          style={{ fontSize: 18, borderColor: '#fff', backgroundColor: '#fff', color: '#000' }}
        >
          {user.username}
        </button>
        <img className={styles.avatar} src={user?.image || defaultAvatar} alt="avatar" onError={handleImageError} />
      </Link>
      <Link to="/sign-in">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => dispatch(logOutUser())}
          style={{ padding: '6px 18px 10px', backgroundColor: '#fff' }}
        >
          Log Out
        </button>
      </Link>
    </div>
  )
}

export default UserHeader
