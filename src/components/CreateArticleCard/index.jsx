import styles from './createarticlecard.module.css'
import { useUserInfo, useCreateArticle } from '../../react-query'
import { useState } from 'react'

export default function CreateArticleCard() {
    const { data: user } = useUserInfo()
    const { mutate, error, isError, isSuccess } = useCreateArticle()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [genre, setGenre] = useState("")
    const [content, setContent] = useState("")
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const articleData = {
            author: user?.id,
            articletitle: title,
            genre: genre,
            contentNew: [
                {
                    subtitle: subtitle,
                    subcontent: [
                        content
                    ]
                }
            ]
        }
        mutate(articleData)
    }
    return (
        <div className='container'>
            <form onSubmit={handleCreateSubmit} className={styles.postForm}>
                <div className={styles.formTitle}>Post</div>
                <label className={styles.poatLable}>
                    title：
                    <input
                        className={styles.postInput}
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className={styles.poatLable}>
                    subtitle：
                    <input
                        className={styles.postInput}
                        type="text"
                        placeholder="subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                </label>
                <label className={styles.poatLable}>
                    genre：
                    <select
                        className={styles.poatGenre}
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    >
                        <option value="">— select genre —</option>
                        <option value="astrology">astrology</option>
                        <option value="biology">biology</option>
                        <option value="chemistry">chemistry</option>
                        <option value="geography">geography</option>
                        <option value="geometry">geometry</option>
                        <option value="history">history</option>
                        <option value="neuropsychology">neuropsychology</option>
                        <option value="philosophy">philosophy</option>
                        <option value="psychology">psychology</option>
                        <option value="physiology">physiology</option>
                        <option value="others">others</option>
                    </select>
                </label>
                <label className={styles.poatTextareaLable}>
                    content：
                    <textarea
                        className={styles.postTextarea}
                        rows={10}
                        placeholder="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className={styles.postButton}>Create Article</button>
            </form>
            {isSuccess ?
                "Uploaded Successful !!!"
                :
                <div></div>
            }
            {!isError ?
                <div></div>
                :
                <div className={styles.errorText}>
                    {error.message}
                </div>
            }
        </div>
    )
}