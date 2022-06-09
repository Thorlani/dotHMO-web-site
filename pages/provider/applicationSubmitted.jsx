import styles from "../../styles/applicationSubmitted.module.css";
import Image from "next/image";
import Link from "next/link";


const ApplicationSubmitted = ({ close }) => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Image src="/lf20_cpjxufjf.json.svg" width="167" height="167" />
                <h3 className={styles.title}>Application Submitted</h3>
                <p className={styles.paragraph}>We will contact you within 24 hours</p>
                <div className={styles.hr}></div>
                <Link href="/">
                    <a>
                        <button onClick={close} className={styles.btn}>CLOSE</button>
                    </a>
                </Link>
            </div>
        </div>
    );
}
 
export default ApplicationSubmitted;