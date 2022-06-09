import styles from "../styles/footer.module.css";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <img className={styles.footerImage} src="/DotHMO.svg" width="256" height="99" />
            </div>
            <div className={styles.footerContent}>
                <h2 className={styles.footTitle}>Company</h2>
                <ul>
                    <li className={styles.footerList}>Products</li>
                    <li className={styles.footerList}>Careers</li>
                    <li className={styles.footerList}>News</li>
                </ul>
            </div>
            <div className={styles.footerContent}>
                <h2 className={styles.footTitle}>About Us</h2>
                <ul>
                    <li className={styles.footerList}>History</li>
                    <li className={styles.footerList}>Support</li>
                    <li className={styles.footerList}>FAQs</li>
                </ul>
            </div>
            <div className={styles.footerContent}>
                <h2 className={styles.footTitle}>Our Information</h2>
                <ul>
                    <li className={styles.footerList}>Terms & Conditions</li>
                    <li className={styles.footerList}>Privacy Policy</li>
                </ul>
            </div>
        </footer>
    );
}
 
export default Footer;