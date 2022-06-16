import styles from "../styles/submit.module.css"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Getquote = ({ saved, onClick }) => {


    function close() {
        saved(true);
    }

    return (
        <div className={styles.backgound}>
            <div className={styles.container}>
                <Image src="/lf20_cpjxufjf.json.svg" width="167" height="167" alt="Sent" />
                <h3 className={styles.title}>Request Sent</h3>
                <p className={styles.paragraph}>An email has been sent containing the details of your quote request</p>
                <div className={styles.hr}></div>
                <button onClick={close} className={styles.btn}>CLOSE</button>
            </div>
        </div>
    );
}
 
export default Getquote;