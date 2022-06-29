import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/index.module.css'
import Request from './request'
import { useState, useEffect } from 'react'
import Submitted from './submitted'
import Quote from './quote'
import Getquote from './getQuote'
import { motion } from 'framer-motion'
import Aos from 'aos'
import 'aos/dist/aos.css'


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

    useEffect(() => {
      Aos.init({duration: 1000})
    },[])

    const [width, setWidth] = useState(0)
    useEffect(() => {
      setWidth(window.innerWidth < 768)
    })


    let boxVariants = {};
    if (!width) {
      boxVariants = {
        hidden: {
          scale: .4,
          opacity: 0,
          x: -200
        },
        visible: {
          scale: 1,
          opacity: 1,
          x: 0,
          transition: {
            delay: .4,
            duration: 1
          },
        }
      };
    }

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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
      <main className='container'>
        <div className={styles.heroSection}>
          <div className={styles.firstPart}>
            <div className={styles.sectionText}>
              <motion.div initial='hidden' animate={'visible'} variants={boxVariants}>
                <h1 className={styles.h1}>Health Insurance that makes sense</h1>
                <p className={styles.paragraph}>Insurance means more money in your pocket. Insurance equals smart. Get insurance products that puts you at ease and incharge.</p>
                <button className={styles.button} onClick={onRequest}>REQUEST A CALL</button>
                {save === true ? popUp : <Submitted saved={onClose} />}
                </motion.div>
            </div>
            <div className={styles.sectionTextTwo}>
              <h1 className={styles.h1}>Health Insurance that makes sense</h1>
              <p className={styles.paragraph}>Insurance means more money in your pocket. Insurance equals smart. Get insurance products that puts you at ease and incharge.</p>
              <button className={styles.button} onClick={onRequest}>REQUEST A CALL</button>
              {save === true ? popUp : <Submitted saved={onClose} />}
            </div>
            <div className={styles.sectionImage}>
              <motion.div initial='hidden' animate='visible' variants={{
                hidden: {
                  scale: .4,
                  opacity: 0,
                  x: 200
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .4,
                    duration: 1.1
                  },
                }
              }}>
                <Image src="/hero-section-image.svg" width="600" height="600" alt='Hero-section image'/>
              </motion.div>
            </div>
          </div>
          <div className={styles.secondPart}>
            <motion.div initial='hidden' animate='visible' variants={{
                hidden: {
                  scale: .8,
                  opacity: 0,
                  y: 200
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: .6,
                    duration: 1.4
                  },
                }
              }}>
              <div className={styles.grid1}>
                <Link href="/provider/findProvider">
                  <a>
                    <h2 className={styles.h2}>FIND YOUR PROVIDER</h2>
                    <div className={styles.hr}></div>
                    <p className={styles.para}>Our plans connects you to 1000+ healthcare providers. Pick the ones most suited to your needs.</p>
                  </a>
                </Link>
              </div>
            </motion.div>
            <motion.div initial='hidden' animate='visible' variants={{
                hidden: {
                  scale: .8,
                  opacity: 0,
                  y: 200
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: .6,
                    duration: 1.4
                  },
                }
              }}>
              <div onClick={onRequest} className={styles.grid1}>
                  <a>
                    <h2 className={styles.h2}>CONNECT TO A MEDICAL PROFESSIONAL</h2>
                    <div className={styles.hr}></div>
                    <p className={styles.para}>Our plans open you to a variety of General Practitioners and Specialists to provide you with top-notch healthcare.</p>
                  </a>
              </div>
            </motion.div>
            <motion.div initial='hidden' animate='visible' variants={{
                hidden: {
                  scale: .8,
                  opacity: 0,
                  y: 200
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: .6,
                    duration: 1.4
                  },
                }
              }}>
              <div className={styles.grid1}>
                <Link href="/provider/healthProvider">
                  <a>
                    <h2 className={styles.h2}>JOIN PROVIDER NETWORK</h2>
                    <div className={styles.hr}></div>
                    <p className={styles.para}>Want to partner with us as a premium healthcare provider? There’s no limit to the number of partners we can accomodate.</p>
                  </a>
                </Link>
              </div>
            </motion.div>
        </div>
      </div>

      <div data-aos='fade-up' className={styles.trustUs}>
        <h1 className={styles.trustUsPost}>Why you should trust your health with us</h1>
          <div className={styles.trustUsContainer}>
              <a>
                <div className='images'>
                  <motion.div whileHover={'zoomOut'} variants={{
                    zoomOut: {
                      scale: 1.1
                    }
                  }}>
                    <Image src="/group-2.svg" width="289" height="362px" alt='Zero delay, no preauthorization for care' />
                  </motion.div>
                </div>
              </a>
              <a>
                <div className='images'>
                  <motion.div whileHover={'zoomOut'} variants={{
                      zoomOut: {
                        scale: 1.1
                      }
                    }}>
                    <Image src="/group-3.svg" width="289" height="362px" alt='AI led insure tech' />
                  </motion.div>
                </div>
              </a>
              <a>
                <div className='images'>
                  <motion.div whileHover={'zoomOut'} variants={{
                      zoomOut: {
                        scale: 1.1
                      }
                    }}>
                    <Image src="/group-1.svg" width="289" height="362px" alt='Advance telemedicine' />
                  </motion.div>
                </div>
              </a>
              <a>
                <div className='images'>
                  <motion.div whileHover={'zoomOut'} variants={{
                      zoomOut: {
                        scale: 1.1
                      }
                    }}>
                    <Image src="/group-4.svg" width="289" height="362px" alt='Employee assistance programme' />
                  </motion.div>
                </div>
              </a>
          </div>
      </div>

      <div className={styles.offer}>
        <h3 data-aos='fade-up' className={styles.whatWeOffer}>We’ve Got Plans for Everyone</h3>
        <div className={styles.offerContainer}>
          <div className={styles.content}>
            <motion.div initial='hidden' whileInView={'visible'} variants={{
                hidden: {
                  opacity: 0,
                  x: -100
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .3,
                    duration: 1
                  }
                }
              }}>
              <div className={styles.offerImage}>
                <img src="/family.svg" alt='Family plan image' width="203.93px" height="126.66px" />
              </div>
              </motion.div>
            <div className={styles.offerText}>
              <motion.div  initial='hidden' whileInView={'visible'} variants={{
                hidden: {
                  opacity: 0,
                  x: 100
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .3,
                    duration: 1
                  }
                }
              }}>
                <h4 className={styles.offerTitle}>For you, family and friends</h4>
                <p className={styles.offerParagraph}>
                You, your family and friends can enjoy the best of healthcare, anytime anywhere, at a fraction of the cost.You can count on us to make it happen for you.
                </p>
                <Link href="/viewplan">
                  <a>
                    <button className={styles.familyBtn}>VIEW PLANS</button>
                  </a>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className={styles.content}>
            <motion.div initial='hidden' whileInView={'visible'} variants={{
                hidden: {
                  opacity: 0,
                  x: -100
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .3,
                    duration: 1
                  }
                }
              }}>
              <div className={styles.offerImage}>
                <img src="/business.svg" alt=' Business plan image' width="203.93px" height="126.66px"/>
              </div>
              </motion.div>
            <div className={styles.offerText}>
              <motion.div  initial='hidden' whileInView={'visible'} variants={{
                hidden: {
                  opacity: 0,
                  x: 100
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .3,
                    duration: 1
                  }
                }
              }}>
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
              </motion.div>
            </div>
          </div>
          <div className={styles.content}>
            <motion.div initial='hidden' whileInView={'visible'} variants={{
                hidden: {
                  opacity: 0,
                  x: -100
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .3,
                    duration: 1
                  }
                }
              }}>
              <div className={styles.offerImage}>
                <img src="/elderly.svg" alt='Elderly plan image' width="203.93px" height="126.66px"/>
              </div>
              </motion.div>
            <div className={styles.offerText}>
              <motion.div  initial='hidden' whileInView={'visible'} variants={{
                hidden: {
                  opacity: 0,
                  x: 100
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: .3,
                    duration: 1
                  }
                }
              }}>
              <h4 className={styles.offerTitle}>Senior Citizen-For your loved ones</h4>
              <p className={styles.offerParagraph}>
              Show love to the elderly in your life, by ensuring that their health is secured as they age. We offer healthcare plans that combines convenience with care.
              </p>
              <button className={styles.elderlyBtn} onClick={onRequest}>REQUEST A CALL BACK</button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  )
}
