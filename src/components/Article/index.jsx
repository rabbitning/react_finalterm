import styles from './article.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as sBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as rBookmark } from '@fortawesome/free-regular-svg-icons'
import _ from 'lodash'
import { useToggleBookMark, useUserInfo, useUserById } from '../../react-query'
import { Link } from 'react-router-dom'

export default function Article({ article }) {
    const { mutate } = useToggleBookMark()
    const { data: userInfo } = useUserInfo() || {}
    const { data: author } = useUserById(article.author)
    const Marked = userInfo.Marked || []
    let isMarked = _.includes(Marked, article.id)
    const toggleMark = () => {
        if (!!userInfo?.uid)
            mutate({ article: article.id, uid: userInfo?.uid })
    }
    return (
        <div className="container">
            <div className={styles.thumbnailBox}>
                <img src={article.thumbnail} alt="" className={styles.thumbnail} />
            </div>
            <div className={styles.article}>
                <div className={styles.titleBox}>
                    <div className={styles.title}>{article.articletitle}</div>
                    <div onClick={toggleMark} className={styles.bookMark}>
                        {
                            isMarked ?
                                (<FontAwesomeIcon icon={sBookmark} />)
                                :
                                (<FontAwesomeIcon icon={rBookmark} />)
                        }
                    </div>
                </div>
                <div>
                    Author：
                    <Link to={`/auth/id/${author?.id}`} className={styles.authorLink}>{author?.name}</Link>
                </div>
                <div className={styles.content}>
                    {article.contentNew && article.contentNew.map(paragraph => (
                        <div key={`${article.id}${paragraph.subtitle}`}>
                            {
                                paragraph.subtitle != "" && (
                                    <div className={styles.Subtitle}>
                                        <br />
                                        {paragraph.subtitle}
                                    </div>
                                )
                            }
                            {paragraph.subcontent && paragraph.subcontent.map(line => (
                                <div key={`${article.id}${paragraph.subtitle}${line}`}>
                                    <div className={styles.Subcontent}>{line}</div>
                                    <br />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}