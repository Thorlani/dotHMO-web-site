import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Quote from "../pages/quote";
import Getquote from "../pages/getQuote";

const Navbar = () => {

    const [quote, setQuote] = useState(false);

    function open() {
        setQuote(true)
    }

    const [save, setSave] = useState(true)

    function saved() {
        setSave(false)
    }

    function onClose() {
        setSave(true)
        setQuote(false)
    }

    const accept = quote && <Quote closeModal={setQuote} savedd={saved} />

    const [nav, setNav] = useState(true)
    const [isremoveNav, setIsRemoveNav] = useState(true)

    function toggleNav() {
        setNav(!nav)
    }

    function removeNavbar() {
        setIsRemoveNav(!isremoveNav)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.section1}>
                <Link href="/">
                    <a>
                        <Image src="/HMOLogo.png" width="151" height="50" />
                    </a>
                </Link>
            </div>
            <div className={styles.section2}>
                <ul className={nav ? styles.unorderedList : styles.unorderedListActive}>
                    <li>
                        <Link href="/">
                            <a className={styles.listItemsActive}>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a className={styles.listItemsAbout}>About Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <a className={styles.listItemsContact}>Contact Us</a>
                        </Link>
                    </li>
                </ul>
                <button onClick={open}  className={nav ? styles.btn : styles.btnActive}>Get a quote</button>
                <div onClick={toggleNav} className={styles.menuIcon}>
                    <div className={nav ? styles.top : styles.topActive}></div>
                    <div className={nav ? styles.middle : styles.middleActive}></div>
                    <div className={nav ? styles.bottom : styles.bottomActive}></div>
                </div>
                {save === true ? accept : <Getquote saved={onClose} />}
            </div>
        </nav>
    );
}
 
export default Navbar;