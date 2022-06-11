import styles from "../styles/submit.module.css"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Submitted = ({ saved }) => {


    function close() {
        saved(true);
    }

    return (
        <div className={styles.backgound}>
            <div className={styles.container}>
                <Image src="/lf20_cpjxufjf.json.svg" width="167" height="167" />
                <h3 className={styles.title}>Request Sent</h3>
                <p className={styles.paragraph}>A sales agent will contact you at your preferred time</p>
                <div className={styles.hr}></div>
                <button onClick={close} className={styles.btn}>CLOSE</button>
            </div>
        </div>
    );
}
 
export default Submitted;