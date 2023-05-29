import Header from "../components/Header"
import ArticleList from "../components/ArticleList"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useArticlesByGenre } from "../react-query"

export default function Genre() {
    const { genreName } = useParams()
    const { data, isLoading } = useArticlesByGenre(genreName)
    const articles = data || []
    return (
        <div className='page'>
            <Header />
            <ArticleList articles={articles} />
            <Footer />
        </div>
    )
}