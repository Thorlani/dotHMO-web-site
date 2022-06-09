import styles from "../styles/subscription.module.css";
import { useState } from "react";
import Head from "next/head"
import Script from "next/script"

const Subscription = () => {

    const [subscribe, setSubscribe] = useState({
        subscribeDetails: ""
    });

    function handleChange(event) {
        setSubscribe(prevSubscribe => {
            return {
                ...prevSubscribe,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className={styles.subscription}>
            <h1 className={styles.subscriptionText}>Stay tuned to news and stories from us</h1>
            <form className={styles.subscriptionForm} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your email" 
                    className={styles.subscriptionInput}
                    name="subscribeDetails"
                    value={subscribe.subscribeDetails}
                    onChange={handleChange}
                 />
                <button className={styles.btnSubscription}>Subcribe</button>
            </form>
        </div>
    );
}
 
export default Subscription;