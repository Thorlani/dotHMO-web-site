import styles from "../styles/about.module.css";
import Image from "next/image"
import Head from "next/head";

const About = () => {
    return (
        <>
        <Head>
            <title>About Us | Dot HMO</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <div className="container">
            <div className={styles.heroSection}>
                <div className={styles.firstPart}>
                    <div className={styles.heroSectionLeft}>
                        <h1 className={styles.h1}>Making Health as Simple as a Dot</h1>
                        <p className={styles.paragraph}>Dot HMO, a subsidiary of the DOT Group, is an AI-led Health insurance company fully geared towards directly impacting the lives of our customers through simplified, top-tier digital solutions.</p>
                    </div>
                    <div className={styles.heroSectionRight}>
                        <Image src="/about.png" width="400" height="400" alt="About Us image" />
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <h2 className={styles.bodyh2}>Driven to Revolutionize Healthcare.</h2>
                <p className={styles.bodyParagraph}>We understand the average challenges that comes with accessing great healthcare, and how difficult it is for most to understand how insurance can making that access easier.</p>
                <br />
                <p className={styles.offerings}>To help with this, we have created these offerings:</p>
                <div className={styles.offeringContent}>
                    <div className={styles.flexContent}>
                        <div className={styles.flexContentLeft}>
                            <img className={styles.images} src="/globalCoverage.jpg" width="305" height="305" alt="Global coverage image" />
                        </div>
                        <div className={styles.flexContentRight}>
                            <span className={styles.offeringContentSpan}>Global Coverage</span>
                            <ul>
                                <li className={styles.offeringContentLi}>Access 1000+ Hospitals locally and outside Nigeria, locatable by GPS</li>
                                <li className={styles.offeringContentLi}>Connect to the best Consultants and General Practications across the globe.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.flexContent}>
                        <div className={styles.flexContentRight}>
                            <span className={styles.offeringContentSpan}>Roaming across Hospitals</span>
                            <ul>
                                <li className={styles.offeringContentLi}>Walk into any of the hospitals within our network</li>
                                <li className={styles.offeringContentLi}>Hospital prebooking service and appointment scheduling</li>
                                <li className={styles.offeringContentLi}>View Hospital History</li>
                                <li className={styles.offeringContentLi}>Concierge services.</li>
                            </ul>
                        </div>
                        <div className={styles.flexContentLeft}>
                            <img className={styles.images} src="/acrossHospitals.jpg" width="305" height="305" alt="Across hospitals image" />
                        </div>
                    </div>
                    <div className={styles.flexContent}>
                        <div className={styles.flexContentLeft}>
                            <img className={styles.images} src="/callService.jpg" width="305" height="305" alt="Call service image" />
                        </div>
                        <div className={styles.flexContentRight}>
                            <span className={styles.offeringContentSpan}>Easy Access to Care</span>
                            <ul>
                                <li className={styles.offeringContentLi}>Automated approval system on all care approval protocols.</li>
                                <li className={styles.offeringContentLi}>Digital HMO Cards</li>
                                <li className={styles.offeringContentLi}>Fully automated Call Center Service</li>
                                <li className={styles.offeringContentLi}>24-Hr Omni Channel Customer Support</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.flexContent}>
                        <div className={styles.flexContentRight}>
                            <span className={styles.offeringContentSpan}>Telemedicine</span>
                            <ul>
                                <li className={styles.offeringContentLi}>Digital (online and USSD-enabled) registration for all enrollees.</li>
                                <li className={styles.offeringContentLi}>Several Consultants available for Teleconsultation </li>
                            </ul>
                        </div>
                        <div className={styles.flexContentLeft}>
                            <img className={styles.images} src="/teleMedicine.jpg" width="305" height="305" alt="Telemedicine image" />
                        </div>
                    </div>
                    <div className={styles.flexContent}>
                        <div className={styles.flexContentLeft}>
                            <img className={styles.images} src="/pharmacy.jpg" width="305" height="305" alt="Pharmacy image"/>
                        </div>
                        <div className={styles.flexContentRight}>
                            <span className={styles.offeringContentSpan}>Pharmacy Benefit</span>
                            <ul>
                                <li className={styles.offeringContentLi}>Large pharmacy network to deliver drugs within your neighbourhood for quality drugs.</li>
                                <li className={styles.offeringContentLi}>Chronic Disease Management Program</li>
                                <li className={styles.offeringContentLi}>Drug Refills</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.flexContent}>
                        <div className={styles.flexContentRight}>
                            <span className={styles.offeringContentSpan}>Health Tracker</span>
                            <ul>
                                <li className={styles.offeringContentLi}>Health Screening</li>
                                <li className={styles.offeringContentLi}>Health-on-track programs synced with annual medicals to improve your wellness programs</li>
                            </ul>
                        </div>
                        <div className={styles.flexContentLeft}>
                            <img className={styles.images} src="/health.jpg" width="305" height="305" alt="Health tracker image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default About;