import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetArticlesQuery } from '../../Api/blogApi'
import Article from '../Article'
import { Spinner } from 'react-bootstrap'
import styles from './Articles.module.scss'
import { ArticleProps } from '../type'

const Articles: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError } = useGetArticlesQuery((currentPage - 1) * 5)
  const navigate = useNavigate()

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumbers = (totalPages: number) => {
    const pageNumbers = []

    pageNumbers.push(
      <li key={1} className={`${styles.pageItem} ${currentPage === 1 ? styles.active : ''}`}>
        <button className={styles.pageLink} onClick={() => handlePageChange(1)}>
          1
        </button>
      </li>
    )

    if (currentPage > 2) {
      pageNumbers.push(
        <li key="prev-ellipsis" className={`${styles.pageItem} ${styles.disabled}`}>
          <span className={styles.pageLink}>...</span>
        </li>
      )
    }

    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`${styles.pageItem} ${currentPage === i ? styles.active : ''}`}>
          <button className={styles.pageLink} onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      )
    }

    if (currentPage < totalPages - 1) {
      pageNumbers.push(
        <li key="next-ellipsis" className={`${styles.pageItem} ${styles.disabled}`}>
          <span className={styles.pageLink}>...</span>
        </li>
      )
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key={totalPages} className={`${styles.pageItem} ${currentPage === totalPages ? styles.active : ''}`}>
          <button className={styles.pageLink} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        </li>
      )
    }

    return pageNumbers
  }

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

  if (isError) {
    navigate('/error-message')
    return null
  }

  const totalPages = Math.ceil((data?.articlesCount || 0) / 5)

  return (
    <>
      {data?.articles?.map((item: ArticleProps) => (
        <Article
          key={item.slug}
          title={item.title}
          description={item.description}
          tagList={item.tagList}
          updatedAt={item.updatedAt}
          image={item.author.image}
          favoritesCount={item.favoritesCount}
          author={item.author}
          slug={item.slug}
          favorited={item.favorited}
        />
      ))}
      <nav aria-label="Павигация по страницам">
        <ul className={styles.pagination}>
          <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ''}`}>
            <button
              className={styles.pageLink}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Предыдущая"
            >
              <i className="bi bi-chevron-left" aria-hidden="true"></i>
            </button>
          </li>
          {renderPageNumbers(totalPages)}
          <li className={`'${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ''}`}>
            <button
              className={styles.pageLink}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Следующая"
            >
              <i className="bi bi-chevron-right" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Articles
