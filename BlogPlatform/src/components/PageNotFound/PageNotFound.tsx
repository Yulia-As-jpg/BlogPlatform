import { Link } from 'react-router-dom'
import pageNotFound from '../../assets/icons/404error.png'

import styles from './PageNotFound.module.scss'

const PageNotFound: React.FC = () => {
  return (
    <article className={styles.PageNotFound}>
      <img src={pageNotFound} alt="404: page not found" />
      <Link to="/">
        <button className={styles.button}>Home page</button>
      </Link>
    </article>
  )
}

export default PageNotFound
