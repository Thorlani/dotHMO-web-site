import Image from "next/image";
import styles from "../../styles/healthprovider.module.css";
import BecomeAProvider from "./becomeAProvider";
import { useState } from "react";
import HeroSection from "../../component/hpHeroSection";

const HealthProvider = () => {

    const [show, setShow] = useState(false);

    function display() {
        setShow(true);
    }

    function hide() {
        setShow(false);
    }

    return (
        <div className="container">
            <HeroSection display={display}/>
            <div className={styles.contentSection}>
                <h2 className={styles.h2}>Why you should join us</h2>
                {/* <p className={styles.paragraph2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, egestas fermentum tincidunt tellus sed vitae massa. Ultricies dignissim aliquet egestas suspendisse proin integer duis dignissim faucibus.</p> */}
                <button onClick={display} className={styles.btn}>Become a Provider</button>
            </div>
            <div className={styles.line}></div>
            <div className={styles.gridSection}>
                <Image src="/hospital.svg" width="347" height="362" />
                <Image src="/PHARMACIES.svg" width="347" height="362" />
                <Image src="/LABORATORIES.svg" width="347" height="362" />
                <Image src="/GYMWELLNESS.svg" width="347" height="362" />
                <Image src="/PHYSIOTHERAPISTS.svg" width="347" height="362" />
                <Image src="/DENTALS.svg" width="347" height="362" />
            </div>
            {show && <BecomeAProvider hide={hide} />}
        </div>
    );
}
 
export default HealthProvider;