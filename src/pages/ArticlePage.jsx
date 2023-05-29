import Header from "../components/Header"
import Article from "../components/Article"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useArticleById } from "../react-query"

export default function ArticlePage() {
    const { articleId } = useParams()
    const { data, isLoading } = useArticleById(articleId)
    const article = data || []
    return (
        <div className='page'>
            <Header />
            <Article article={article} />
            <Footer />
        </div>
    )
}