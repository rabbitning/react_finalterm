import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux"
import Home from './pages/Home'
import AuthorPage from './pages/AuthorPage'
import ArticlePage from './pages/ArticlePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Genre from './pages/Genre'
import CreateArticle from './pages/CreateArticle'
import { selectLightMode } from "./redux/colorSlice"
import identify from './palette'

export default function Router() {
    const Mode = useSelector(selectLightMode)
    identify(Mode)
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='articles'>
                    <Route path='genre/:genreName' element={<Genre />} />
                    <Route path='id/:articleId' element={<ArticlePage />} />
                </Route>
                <Route path='auth'>
                    <Route path='id/:uid' element={<AuthorPage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='createarticle' element={<CreateArticle />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}