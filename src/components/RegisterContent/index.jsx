import { Link, useNavigate } from "react-router-dom"
import { useRegisterWithEmailPassword } from "../../react-query"
import { useState, useEffect } from "react"
import styles from './registercontent.module.css'

export default function RegisterContent() {
    const { mutate, error, isLoading, isError, isSuccess, data } = useRegisterWithEmailPassword()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            name,
            email,
            password,
        }
        mutate(userData)
    }
    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        }
    }, [isSuccess])
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <div className={styles.formTitle}>Register</div>
                <div className="hr"></div>
                <label className={styles.registerLable}>
                    Name：
                    <input
                        className={styles.registerInput}
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label className={styles.registerLable}>
                    E-mail：
                    <input
                        className={styles.registerInput}
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className={styles.registerLable}>
                    Password：
                    <input
                        className={styles.registerInput}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {/* <label className={styles.registerLable}>
                    Re-enter Password：
                    <input
                        className={styles.registerInput}
                        type="password"
                        placeholder="re-enter password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                    />
                </label> */}
                <button type="submit" className={styles.registerButton}>
                    Register
                </button>
                <div className={styles.orButton}>
                    or　<Link to='/auth/login' className={styles.orLogin}>login</Link>
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