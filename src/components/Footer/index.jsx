import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <div className='container'>
                <div className={styles.footerLink}>
                    <div className={styles.footerLinkItem}><Link to='/'>About Us</Link></div>
                    <div className={styles.footerLinkItem}><Link to='/'>Privacy Policy</Link></div>
                    <div className={styles.footerLinkItem}><Link to='/'>Cookie Policy</Link></div>
                    <div className={styles.footerLinkItem}><Link to='/'>Terms and conditions</Link></div>
                </div>
                <div className={styles.hr}></div>
                <div className={styles.footerDescription}>© Future Publishing Limited Quay House, The Ambury, Bath BA1 1UA. All rights reserved. England and Wales company registration number 2008885.</div>
            </div>
        </footer>
    )
}