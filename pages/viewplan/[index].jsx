import styles from "../../styles/viewplan.module.css";
import Image from "next/image";
import { useState } from "react";
import Request from "../request";
import Submitted from "../submitted";
import { useRouter } from "next/router";

const Viewplan = () => {
  const route = useRouter();
  const path = route.query.index;
  const [openModal, setOpenModal] = useState(false);

  function onRequest() {
    setOpenModal(true);
  }

  const [save, setSave] = useState(true);

  function onSave() {
    setSave(false);
  }

  function onClose() {
    setSave(true);
    setOpenModal(false);
  }

  const popUp = openModal && (
    <Request closeModal={setOpenModal} savedd={onSave} />
  );

  return (
    <div className="container">
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>For you, family and friends</h1>
          <p className={styles.heroSubtitle}>
            Health insurance puts you and your loved ones at ease.
          </p>
          {/* <button className={styles.heroButton}>View Plans</button> */}
          {save === true ? popUp : <Submitted saved={onClose} />}
        </div>
        <div className={styles.Image}>
          <Image
            src="/family.svg"
            width="800"
            height="497"
            alt="Family image"
          />
        </div>
      </div>
      <div className={styles.planSection}>
        <h2 className={styles.planTitle}>Stay happy when you buy our plans</h2>
        <div className={styles.planContentContainer}>
          <div className={styles.planContent}>
            <p className={styles.span}>
              {path === "individual"
                ? "Waso"
                : path === "business"
                ? "Coral Plan"
                : path === "senior"
                ? "Senior Coral"
                : ""}
            </p>
            <div className={styles.line}></div>
            <img
              className={styles.plansImage}
              src="/maestro-lite.svg"
              alt="Dot maestro-lite image"
              width="350px"
              height="350px"
            />
            <button onClick={onRequest} className={styles.planBtn}>
              Request Call
            </button>
          </div>
          <div className={styles.planContent}>
            <p className={styles.span}>
              {path === "individual"
                ? "Jolly"
                : path === "business"
                ? "Dot Emerald"
                : path === "senior"
                ? "Senior Beryl"
                : ""}
            </p>
            <div className={styles.line}></div>
            <img
              className={styles.plansImage}
              src="/classic-lite.svg"
              alt="Dot classic-lite image"
              width="350px"
              height="350px"
            />
            <button onClick={onRequest} className={styles.planBtn}>
              Request Call
            </button>
          </div>
          <div className={styles.planContent}>
            <p className={styles.span}>
              {path === "individual"
                ? "Better-life"
                : path === "business"
                ? "Dot Beryl"
                : path === "senior"
                ? "Senior Diamond"
                : ""}
            </p>
            <div className={styles.line}></div>
            <img
              className={styles.plansImage}
              src="/ultimate.svg"
              alt="Dot ultimate  image"
              width="350px"
              height="350px"
            />
            <button onClick={onRequest} className={styles.planBtn}>
              Request Call
            </button>
          </div>
          {path === "senior" ? null : (
            <div className={styles.planContent}>
              <p className={styles.span}>
                {path === "individual"
                  ? "Awoof"
                  : path === "business"
                  ? "Dot Diamond"
                  : path === "senior"
                  ? ""
                  : ""}
              </p>
              <div className={styles.line}></div>
              <img
                className={styles.plansImage}
                src="/executive.svg"
                alt="Dot executive image"
                width="350px"
                height="350px"
              />
              <button onClick={onRequest} className={styles.planBtn}>
                Request Call
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.howItWorksSection}>
        <div className={styles.howItWorksSectionImage}>
          <Image
            src="/practitioner.svg"
            width="431"
            height="444"
            alt="Medical practitioner image"
          />
        </div>
        <div className={styles.howItWorksSectionContent}>
          <h2 className={styles.howItWorksTitle}>How it works:</h2>
          <ul>
            <li className={styles.listItem}>Select a plan.</li>
            <li className={styles.listItem}>
              Enter your information for a call back.
            </li>
            <li className={styles.listItem}>
              Dot sale agents will contact you at your preferred time.
            </li>
            <li className={styles.listItem}>
              You can negotiate further and purchase a plan.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Viewplan;
