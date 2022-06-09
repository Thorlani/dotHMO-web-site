import Image from "next/image";
import styles from "../styles/heroSection.module.css";

const HeroSection = ({ display }) => {
    return (
        <div className={styles.heroSection}>
            <div className={styles.heroSectionLeft}>
                <h1 className={styles.h1}>Health Provider</h1>
                {/* <p className={styles.paragraph1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button onClick={display} className={styles.btn}>Become a Provider</button> */}
            </div>
            <div className={styles.heroSectionRight}>
                <Image src="/doctors.svg" width="600" height="413" alt="hospital" />
            </div>
        </div>
    );
}
 
export default HeroSection;