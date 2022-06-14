import styles from "../styles/subscription.module.css";
import { useState } from "react";
import Axios from "axios";

const Subscription = () => {

    const url = 'https://dot-insure.herokuapp.com/newsletter/subscribe';

    const [subscribe, setSubscribe] = useState({
        subscribeDetails: ""
    });
    const [formError, setFormError] = useState({});

    function errorChecker(values) {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.subscribeDetails) {
            errors.subscribeDetails = "Please enter your email address";
        } else if (!regex.test(values.subscribeDetails)) {
            errors.subscribeDetails = "Please enter a valid email address";
        }
        return errors;
    }

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
        setFormError(errorChecker(subscribe));
        if (Object.keys(formError).length === 0) {
            Axios.post(url, {
                email: subscribe.subscribeDetails
            })
        }
    }

    const errorMessage = {
        color: 'red',
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
                <button className={styles.btnSubscription}>Subscribe</button>
            </form>
            <p style={errorMessage}>{formError.subscribeDetails}</p>
        </div>
    );
}
 
export default Subscription;