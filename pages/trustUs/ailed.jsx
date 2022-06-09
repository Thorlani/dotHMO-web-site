import styles from "../../styles/ai-led.module.css";
import Image from "next/image"

const AiLed = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <div className={styles.heroText}>
                    <h1 className={styles.h1}>AI Led Insurtech</h1>
                    <p className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, egestas fermentum tincidunt tellus sed vitae massa. Ultricies dignissim aliquet egestas suspendisse proin integer duis dignissim faucibus.</p>
                </div>
                <div className={styles.heroImage}>
                    <Image src="/ailed.svg" width="500" height="550" />
                </div>
            </div>
            <div className={styles.contentsection}>
                <h2 className={styles.contentTitle}>Why we you should trust your health with us</h2>
                <p className={styles.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, egestas fermentum tincidunt tellus sed vitae massa. Ultricies dignissim aliquet egestas suspendisse proin integer duis dignissim faucibus.</p>
            </div>
            <div className={styles.contentsectionHeadings}>
                <div className={styles.grid1}>
                    <h2 className={styles.contentSectionHeadingTitleLeft}>Heading here</h2>
                    <p className={styles.contentSectionHeadingTextLeft}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, egestas fermentum tincidunt tellus sed vitae massa. Ultricies dignissim aliquet egestas suspendisse proin integer duis dignissim faucibus.
                    </p>
                </div>
                <div className={styles.grid2}>
                    <Image src="/Rectangle-4.svg" width="492" height="435" />
                </div>
                <div className={styles.grid3}>
                    <Image src="/Rectangle-4.svg" width="492" height="435" />
                </div>
                <div className={styles.grid4}>
                    <h2 className={styles.contentSectionHeadingTitleRight}>Heading here</h2>
                    <p className={styles.contentSectionHeadingTextRight}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, egestas fermentum tincidunt tellus sed vitae massa. Ultricies dignissim aliquet egestas suspendisse proin integer duis dignissim faucibus.
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default AiLed;