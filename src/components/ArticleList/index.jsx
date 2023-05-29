import styles from './articlelist.module.css'
import { Link } from 'react-router-dom'

export default function ArticleList({ articles }) {
    return (
        <div className='container'>
            <div className={styles.recommendList}>
                {articles.map(articledata => (
                    <Link to={`/articles/id/${articledata.id}`} key={articledata.id} className={styles.articleBox}>
                        <div className={styles.articleThumbnailBox}>
                            <img src={articledata.thumbnail} alt="" className={styles.articleThumbnail} />
                        </div>
                        <div className={styles.articletitle}>{articledata.articletitle}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}