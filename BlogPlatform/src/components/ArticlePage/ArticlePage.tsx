import { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import {
  useDeleteAnArticleMutation,
  useFavoriteAnArticleMutation,
  useGetAnArticleQuery,
  useUnfavoriteAnArticleMutation,
} from '../../Api/blogApi'
import { formatDate } from '../../utils/formatDate'
import handleImageError from '../../utils/handleImageError'
import AuthNotification from '../../utils/AuthNotification'
import styles from './ArticlePage.module.scss'
import LikeButton from '../../utils/likeButton'
import Markdown from 'react-markdown'
import { RootState, FetchBaseQueryError } from '../type'

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, error } = useGetAnArticleQuery(slug)
  const [favoriteAnArticle] = useFavoriteAnArticleMutation()
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation()
  const [deleteAnArticle, { isSuccess: isSuccessDelete, isError: isErrorDelete }] = useDeleteAnArticleMutation()
  const navigate = useNavigate()

  const [showNotification, setShowNotification] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    if (isSuccessDelete) {
      navigate('/successful-message', { state: { from: 'article-delete' } })
    }
    if (isErrorDelete) {
      navigate('/error-message')
    }
  }, [isSuccessDelete, isErrorDelete, navigate])

  const currentUser = useSelector((state: RootState) => state.user?.user?.username)
  const user = data?.article?.author?.username

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner animation="border" role="status" style={{ fontSize: 100, color: '#0d6efd' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return <div>{(error as FetchBaseQueryError).status}</div>
  }

  const { title, description, body, tagList, updatedAt, author, favoritesCount, favorited } = data.article

  const handleFavoriteClick = () => {
    if (!currentUser) {
      setShowNotification(true)
      return
    }
    if (!favorited) {
      favoriteAnArticle(slug)
    } else {
      unfavoriteAnArticle(slug)
    }
  }

  const handleDeleteConfirm = () => {
    deleteAnArticle(slug)
    setShowDeleteModal(false)
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  return (
    <section className={styles.ArticlePage}>
      <div className={styles['flex-container']}>
        <div className={styles['flex-body']}>
          <div className={styles['flex-title']}>
            <h2 className={styles.title}>{title}</h2>
            <label className={styles.favorite}>
              <LikeButton onClick={handleFavoriteClick} isLiked={favorited} />
              <span>{favoritesCount}</span>
            </label>
          </div>
          <div>
            {tagList &&
              tagList.map((tag: string, index: number) => {
                if (!tag.length) return null
                return (
                  <span className={styles.tag} key={index}>
                    {tag}
                  </span>
                )
              })}
          </div>
          <p className={styles.paragraph}>{description}</p>
        </div>
        <div className={styles.profile}>
          <div className={styles['flex-profile']}>
            <div className={styles['flex-column']}>
              <span className={styles.username}> {author?.username || 'Unknown Author'}</span>
              <span className={styles['post-date']}>{formatDate(updatedAt)} </span>
            </div>
            <img
              className={styles.avatar}
              src={author.image || defaultAvatar}
              alt="avatar"
              onError={handleImageError}
            />
          </div>
          {currentUser === user && (
            <div className={`${styles['flex-container']} ${styles['flex-button']}`}>
              <button type="button" className="btn btn-outline-danger" onClick={() => setShowDeleteModal(true)}>
                Delete
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => navigate(`/article/${slug}/edit`)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <Markdown className={styles.Markdown}>{body}</Markdown>
      {showNotification && <AuthNotification onClose={handleNotificationClose} />}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Body>
          <i className="bi bi-exclamation-circle-fill" style={{ fontSize: 20, color: '#ffa507', paddingRight: 8 }}></i>
          Are you sure you want to delete this article?
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none' }}>
          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </button>
          <button type="button" className="btn btn-primary" onClick={handleDeleteConfirm}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default ArticlePage
