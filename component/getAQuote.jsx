import styles from "../styles/getAQuote.module.css"
import { useState } from "react";
import Quote from "../pages/quote";
import Getquote from "../pages/getQuote";

const GetAQuote = () => {

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
        <div className={styles.getAQuote}>
            <h1 className={styles.h1}>Why we you should trust your health with us</h1>
            <button onClick={open} className={styles.btnGetAQuote}>GET A QUOTE</button>
            {sav === true ? accept : <Getquote saved={onClos} />}
        </div>
    );
}
 
export default GetAQuote;