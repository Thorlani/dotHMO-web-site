import styles from "../styles/viewplan.module.css";
import Image from "next/image";
import { useState } from "react";
import Request from './request'
import Submitted from './submitted'

const Viewplan = () => {

    const [openModal, setOpenModal] = useState(false)

  function onRequest() {
    setOpenModal(true)
  }

  const [save, setSave] = useState(true)

  function onSave() {
    setSave(false)
  }

  function onClose() {
    setSave(true)
    setOpenModal(false)
  }


  const popUp = openModal && <Request closeModal={setOpenModal} savedd={onSave}/>;

    return (
        <div className="container">
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>For you, family and friends</h1>
                    <p className={styles.heroSubtitle}>Health insurance puts you and your loved ones at ease.</p>
                    {/* <button className={styles.heroButton}>View Plans</button> */}
                    {save === true ? popUp : <Submitted saved={onClose} />}
                </div>
                <div className={styles.Image}>
                    <Image src="/family.svg" width="800" height="497" />
                </div>
            </div>
            <div className={styles.planSection}>
                <h2 className={styles.planTitle}>Stay happy when you buy our plans</h2>
                <div className={styles.planContentContainer}>
                    <div className={styles.planContent}>
                        <p className={styles.span}>Dot Maestro Lite</p>
                        <div className={styles.line}></div>
                        <img className={styles.plansImage} src="/maestro-lite.svg" alt="maestro-lite image" width="350px" height="350px" />
                        <button onClick={onRequest} className={styles.planBtn}>Request Call</button>
                    </div>
                    <div className={styles.planContent}>
                        <p className={styles.span}>Dot Maestro Classic</p>
                        <div className={styles.line}></div>
                        <img className={styles.plansImage} src="/classic-lite.svg" alt="maestro-lite image" width="350px" height="350px" />
                        <button onClick={onRequest} className={styles.planBtn}>Request Call</button>
                    </div>
                    <div className={styles.planContent}>
                        <p className={styles.span}>Dot Ultimate</p>
                        <div className={styles.line}></div>
                        <img className={styles.plansImage} src="/ultimate.svg" alt="maestro-lite image" width="350px" height="350px" />
                        <button onClick={onRequest} className={styles.planBtn}>Request Call</button>
                    </div>
                    <div className={styles.planContent}>
                        <p className={styles.span}>Dot Executive</p>
                        <div className={styles.line}></div>
                        <img className={styles.plansImage} src="/executive.svg" alt="maestro-lite image" width="350px" height="350px" />
                        <button onClick={onRequest} className={styles.planBtn}>Request Call</button>
                    </div>
                </div>
            </div>
            <div className={styles.howItWorksSection}>
                <div className={styles.howItWorksSectionImage}>
                    <Image src="/practitioner.svg" width="431" height="444" />
                </div>
                <div className={styles.howItWorksSectionContent}>
                    <h2 className={styles.howItWorksTitle}>How it works:</h2>
                    <ul>
                        <li className={styles.listItem}>You choose a plan </li>
                        <li className={styles.listItem}>Pay a premium (add something like (!) that people can click on to understand what premium is). This will be a monthly payment.</li>
                        <li className={styles.listItem}>You pick your preferred hospital (list of hospital-s depending on address and then link to a more expansive list.)</li>
                        <li className={styles.listItem}>Bolding walk into your chosen hospital when you ill and you will be treated.</li>
                        <li className={styles.listItem}>We pick up your bill.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Viewplan;