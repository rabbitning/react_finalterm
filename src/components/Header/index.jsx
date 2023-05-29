import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { selectLightMode, setColorMode } from "../../redux/colorSlice"
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useUserInfo, useLogout } from '../../react-query'

export default function Header() {
    const [burger, setBurger] = useState(false)
    const navigate = useNavigate()
    const { data: userInfo } = useUserInfo()
    const [genre, setGenre] = useState(false)
    const [profile, setProfile] = useState(false)
    const handleSearch = () => {

    }
    const lightMode = useSelector(selectLightMode)
    const dispatch = useDispatch()
    const toggleColor = () => {
        dispatch(setColorMode(!lightMode))
    }
    const goToProfile = () => {
        if (userInfo?.name) {
            navigate(`/auth/id/${userInfo?.uid}`)
        }
        else {
            navigate('/auth/login')
        }
    }
    const logout = useLogout()
    const onLogout = () => {
        logout.mutate()
        navigate("/")
    }
    return (
        <header>
            <div className={styles.headerContent}>
                <div className={styles.burgerMenu}>
                    <div className={styles.mobileTitle}>
                        <Link to='/' className={styles.mobileTitleText}>
                            KnowEdge
                        </Link>
                    </div>
                    <div onClick={() => { setBurger(!burger), setProfile(false), setGenre(false) }} className={styles.toggleBurgerBtn}>
                        {!burger ?
                            <div className={styles.openBurgerBtnBox}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            :
                            <div className={styles.closeBurgerBtnBox}>
                                <span></span>
                                <span></span>
                            </div>
                        }
                    </div>
                    {burger ?
                        <div className={styles.burgerMenuList}>
                            <div className={styles.navItem}>
                                <div onClick={() => setGenre(!genre)} className={styles.burgerMenuItemText}>
                                    Genre
                                </div>
                                {genre ?
                                    <div className={styles.genreList}>
                                        <div className={styles.genreListTitle}>Genre</div>
                                        <div className="hr"></div>
                                        <Link className={styles.genreListItem} to='/articles/genre/astrology'>astrology</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/biology'>biology</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/chemistry'>chemistry</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/geography'>geography</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/geometry'>geometry</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/history'>history</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/neuropsychology'>neuropsychology</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/philosophy'>philosophy</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/psychology'>psychology</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/physiology'>physiology</Link>
                                        <Link className={styles.genreListItem} to='/articles/genre/others'>others</Link>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                            <Link to='/' className={styles.navItem}>
                                <div className={styles.burgerMenuItemText}>
                                    Contact
                                </div>
                            </Link>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div className={styles.navigator}>
                    <Link to='/' className={`${styles.navHomeBtn} ${styles.navItem}`}>
                        <div className={styles.navItemText}>
                            KnowEdge
                        </div>
                    </Link>
                    <div className={styles.navItem}>
                        <div onClick={() => setGenre(!genre)} className={styles.navItemText}>
                            Genre
                        </div>
                        {genre ?
                            <div className={styles.genreList}>
                                <div className={styles.genreListTitle}>Genre</div>
                                <div className="hr"></div>
                                <Link className={styles.genreListItem} to='/articles/genre/astrology'>astrology</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/biology'>biology</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/chemistry'>chemistry</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/geography'>geography</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/geometry'>geometry</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/history'>history</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/neuropsychology'>neuropsychology</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/philosophy'>philosophy</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/psychology'>psychology</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/physiology'>physiology</Link>
                                <Link className={styles.genreListItem} to='/articles/genre/others'>others</Link>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    <Link to='/' className={styles.navItem}>
                        <div className={styles.navItemText}>
                            Contact
                        </div>
                    </Link>
                </div>
                <div className={styles.searchBox}>
                    <form onSubmit={handleSearch}></form>
                    <input type="text" placeholder='search' className={styles.searchBar} />
                </div>
                <div className={styles.userCorner}>
                    <div className={styles.userProfileBox}>
                        <div onClick={() => { setProfile(!profile), setBurger(false), setGenre(false) }} className={styles.userIconBox}>
                            {userInfo?.email ?
                                <div className={styles.userIcon}>
                                    <span className={styles.userIconName}>
                                        {userInfo?.name}
                                    </span>
                                    <FontAwesomeIcon icon={faCircleUser} />
                                </div>
                                :
                                <div className={styles.userIcon}>
                                    <span className={styles.userIconName}>
                                        Guest
                                    </span>
                                    <FontAwesomeIcon icon={faCircleUser} />
                                </div>
                            }
                        </div>
                        {profile ?
                            <div className={styles.userProfile}>
                                <div onClick={goToProfile} className={styles.userProfileLink}>
                                    <div className={styles.userProfileIcon}>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                    </div>
                                    <div className={styles.userProfileName}>
                                        {userInfo?.name ?
                                            userInfo.name
                                            :
                                            "Guest"
                                        }
                                    </div>
                                </div>
                                <div onClick={() => toggleColor()} className={styles.setColorBtn}>
                                    Toggle color
                                </div>
                                {userInfo?.email ?
                                    <div className={styles.userActions}>
                                        <Link to='/auth/createarticle' className={styles.userActionsItem}>Post</Link>
                                        <div onClick={onLogout} className={styles.userActionsItem}>Logout</div>
                                    </div>
                                    :
                                    <div className={styles.userActions}>
                                        <Link to='/auth/login' className={styles.userActionsItem}>Login</Link>
                                        <Link to='/auth/register' className={styles.userActionsItem}>Register</Link>
                                    </div>
                                }
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        </header >
    )
}