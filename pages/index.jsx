import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/index.module.css'
import Request from './request'
import { useState } from 'react'
import Submitted from './submitted'
import Quote from './quote'
import Getquote from './getQuote'


export default function Home() {

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

  const [quote, setQuote] = useState(false);

    function open() {
        setQuote(true)
    }

    const [sav, setSav] = useState(true)

    function saved() {
        setSav(false)
    }

    function onClos() {
        setSav(true)
        setQuote(false)
    }

    const accept = quote && <Quote closeModal={setQuote} savedd={saved} />


  return (
    <>
    <Head>
      <title>DotHMO</title>
      <meta name='DotHMO' content='DotHMO website' />
      <link rel='icon' href='/favicon.ico' />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
      <div className='container'>
        <div className={styles.heroSection}>
          <div className={styles.firstPart}>
            <div className={styles.sectionText}>
              <h1 className={styles.h1}>Health Insurance that makes sense</h1>
              <p className={styles.paragraph}>Insurance means more money in your pocket. Insurance equals smart. Get insurance products that puts you at ease and incharge.</p>
              <button className={styles.button} onClick={onRequest}>REQUEST A CALL</button>
              {save === true ? popUp : <Submitted saved={onClose} />}
            </div>
            <div className={styles.sectionImage}>
              <Image src="/hero-section-image.svg" width="600" height="600"/>
            </div>
          </div>
          <div className={styles.secondPart}>
            {/* <div className={styles.grid1}>
              <Link href="/provider/findProvider">
                <a>
                  <h2 className={styles.h2}>GET YOUR ID CARD</h2>
                  <div className={styles.hr}></div>
                  <p className={styles.para}>Aww yeah, you successfully read this important alert message.</p>
                </a>
              </Link>
            </div> */}
            <div className={styles.grid1}>
              <Link href="/provider/findProvider">
                <a>
                  <h2 className={styles.h2}>FIND YOUR PROVIDER</h2>
                  <div className={styles.hr}></div>
                  <p className={styles.para}>Our plans connects you to 1000+ healthcare providers. Pick the ones most suited to your needs.</p>
                </a>
              </Link>
            </div>
            <div onClick={onRequest} className={styles.grid1}>
                <a>
                  <h2 className={styles.h2}>CONNECT TO A MEDICAL PROFESSIONAL</h2>
                  <div className={styles.hr}></div>
                  <p className={styles.para}>Our plans open you to a variety of General Practitioners and Specialists to provide you with top-notch healthcare.</p>
                </a>
            </div>
            <div className={styles.grid1}>
              <Link href="/provider/healthProvider">
                <a>
                  <h2 className={styles.h2}>JOIN PROVIDER NETWORK</h2>
                  <div className={styles.hr}></div>
                  <p className={styles.para}>Want to partner with us as a premium healthcare provider? There’s no limit to the number of partners we can accomodate.</p>
                </a>
              </Link>
            </div>
        </div>
      </div>

      <div className={styles.trustUs}>
        <h1 className={styles.trustUsPost}>Why you should trust your health with us</h1>
          <div className={styles.trustUsContainer}>
              <a>
                <div className='images'>
                <Image src="/group-2.svg" width="289" height="362px" />
                </div>
              </a>
              <a>
                <div className='images'>
                <Image src="/group-3.svg" width="289" height="362px" />
                </div>
              </a>
              <a>
                <div className='images'>
                <Image src="/group-1.svg" width="289" height="362px" />
                </div>
              </a>
              <a>
                <div className='images'>
                <Image src="/group-4.svg" width="289" height="362px" />
                </div>
              </a>
          </div>
      </div>

      <div className={styles.offer}>
        <h3 className={styles.whatWeOffer}>We’ve Got Plans for Everyone</h3>
        <div className={styles.offerContainer}>
          <div className={styles.content}>
            <div className={styles.offerImage}>
              <img src="/family.svg" alt='plan image' width="203.93px" height="126.66px"/>
            </div>
            <div className={styles.offerText}>
              <h4 className={styles.offerTitle}>For you, family and friends</h4>
              <p className={styles.offerParagraph}>
              You, your family and friends can enjoy the best of healthcare, anytime anywhere, at a fraction of the cost.You can count on us to make it happen for you.
              </p>
              <Link href="/viewplan">
                <a>
                  <button className={styles.familyBtn}>VIEW PLANS</button>
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.offerImage}>
              <img src="/business.svg" alt='plan image' width="203.93px" height="126.66px"/>
            </div>
            <div className={styles.offerText}>
              <h4 className={styles.offerTitle}>For Businesses</h4>
              <p className={styles.offerParagraph}>
              A healthy worker can do their best and more. Show them you consider them important by giving them healthcare that can adequately attend to their needs.
              </p><br />
              <p className={styles.offerParagraph}>Our plans will assure your staff get:</p>
              <ul>
                <li className={styles.offerListItem}>Prority Treatment</li>
                <li className={styles.offerListItem}>Dedicated Support</li>
                <li className={styles.offerListItem}>Rewarded for Staying Healthy </li>
              </ul>
              <button onClick={open} className={styles.businessBtn}>GET QUOTE</button>
              {sav === true ? accept : <Getquote saved={onClos} />}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.offerImage}>
              <img src="/elderly.svg" alt='plan image' width="203.93px" height="126.66px"/>
            </div>
            <div className={styles.offerText}>
              <h4 className={styles.offerTitle}>Senior Citizen-For your loved ones</h4>
              <p className={styles.offerParagraph}>
              Show love to the elderly in your life, by ensuring that their health is secured as they age. We offer healthcare plans that combines convenience with care.
              </p>
              <button className={styles.elderlyBtn} onClick={onRequest}>REQUEST A CALL BACK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
