import styles from "../../styles/becomeprovider.module.css";
import Image from "next/image";
import Link from "next/link";

const BecomeAProvider = ({ hide }) => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <button onClick={hide} className={styles.btnX}>X</button>
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                    <Image src="/newReg.svg" width="99" height="85" alt="start" />
                    <span className={styles.span}>New Registration</span>
                    <Link href="/provider/addProvider">
                        <a>
                            <button className={styles.btnClick}>START</button>
                        </a>
                    </Link>
                    </div>
                    <div className={styles.contentRight}>
                        <Image src="/contReg.svg" width="99" height="85" alt="continue"/>
                        <span className={styles.span}>New Registration</span>
                        <button className={styles.btnClick}>CONTINUE</button>
                    </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.btnContainer}>
                    <button onClick={hide} className={styles.btnCancel}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}
 
export default BecomeAProvider;