import Header from "../components/Header"
import ArticleList from "../components/ArticleList"
import Footer from "../components/Footer"
import { useArticles } from "../react-query"

export default function Home() {
    const { data, isLoading } = useArticles()
    const articles = data || []
    return (
        <div className='page'>
            <Header />
            <ArticleList articles={articles} />
            <Footer />
        </div>
    )
}