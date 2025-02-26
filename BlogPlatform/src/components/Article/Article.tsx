import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import defaultAvatarSrc from '../../assets/images/defaultAvatar.svg'
import { useFavoriteAnArticleMutation, useUnfavoriteAnArticleMutation } from '../../Api/blogApi'
import { formatDate } from '../../utils/formatDate'
import handleImageError from '../../utils/handleImageError'
import AuthNotification from '../../utils/AuthNotification'
import LikeButton from '../../utils/likeButton'
import styles from './Article.module.scss'
import { RootState, ArticleProps } from '../type'

const Article: React.FC<ArticleProps> = ({
  slug,
  title,
  description,
  tagList,
  updatedAt,
  image,
  favoritesCount,
  author,
  favorited,
}) => {
  const navigate = useNavigate()
  const [favoriteAnArticle] = useFavoriteAnArticleMutation()
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation()
  const currentUser = useSelector((state: RootState) => state.user?.user?.username)

  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {}, [showNotification])

  const handleArticleOpenClick = () => {
    navigate(`/article/${slug}`)
  }

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

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  return (
    <article className={styles.Article}>
      <div className={styles['flex-body']}>
        <div className={styles['flex-title']}>
          <h2 className={styles.title} onClick={handleArticleOpenClick}>
            {title}
          </h2>
          <label className={styles.favorite}>
            <LikeButton onClick={handleFavoriteClick} disabled={!currentUser} isLiked={favorited} />
            <span>{favoritesCount}</span>
          </label>
        </div>
        <div>
          {tagList &&
            tagList.map((tag, index) => {
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
      <div className={styles['flex-profile']}>
        <div className={styles['flex-column']}>
          <span className={styles.username}>{author?.username || 'Unknown Author'}</span>
          <span className={styles['post-date']}>{formatDate(updatedAt)}</span>
        </div>
        <img className={styles.avatar} src={image || defaultAvatarSrc} alt="avatar" onError={handleImageError} />
      </div>
      {showNotification && <AuthNotification onClose={handleNotificationClose} />}{' '}
    </article>
  )
}

export default Article
