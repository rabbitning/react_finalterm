import Header from "../components/Header"
import AuthorInfo from "../components/AuthorInfo"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useUserById } from "../react-query"

export default function AuthorPage() {
    const { uid } = useParams()
    const { data, isLoding } = useUserById(uid)
    const user = data
    return (
        <div className='page'>
            <Header />
            <AuthorInfo user={user} />
            <Footer />
        </div>
    )
}