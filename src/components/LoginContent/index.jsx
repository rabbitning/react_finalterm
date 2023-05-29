import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSignInWithEmailPassword } from "../../react-query"
import styles from './logincontent.module.css'

export default function LoginContent() {
    const { mutate, error, isLoading, isError, isSuccess, data } = useSignInWithEmailPassword()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const values = { email, password }
        mutate(values)
    }
    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        }
    }, [isSuccess])
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.formTitle}>Login</div>
                <div className="hr"></div>
                <label className={styles.loginLable}>
                    E-mail：
                    <input
                        className={styles.loginInput}
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className={styles.loginLable}>
                    Password：
                    <input
                        className={styles.loginInput}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className={styles.loginButton}>
                    Login
                </button>
                <div className={styles.orButton}>
                    or　<Link to='/auth/register' className={styles.orRegister}>register</Link>
                </div>
            </form>
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