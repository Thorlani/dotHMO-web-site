import styles from "../styles/contact.module.css"
import Image from "next/image"
import { useState } from "react";
import Axios from "axios"
import styles2 from "../styles/submit.module.css"
import Link from "next/link";


const Contact = () => {

    const url = "https://dot-insure.herokuapp.com/contact-us"
    const [contactForm, setContactForm] = useState({
        name: "",
        phone: "",
        message: ""
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    function handleChange() {
        const {name, value, type, checked} = event.target
        setContactForm(prevState => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function errorChecker(validate) {
        const error = {};

        if(!validate.phone) {
            error.phone = "Phone number is required"
        } else if (validate.phone.length > 11) {
            error.phone = "Phone number is above 11 digits"
        } else if (validate.phone.length < 11) {
            error.phone = "Phone number is below 11 digits"
        }
        return error
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsSubmit(true)
        setFormErrors(errorChecker(contactForm));
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            Axios.post(url, {
                name: contactForm.name,
                phone: contactForm.phone,
                message: contactForm.message
            })
            .then(res => {
                console.log("successfully sent")
                setShowSuccess(true)
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    }

    const [showSuccess, setShowSuccess] = useState(false)

    function close() {
        setShowSuccess(false)
    }


    return (  
        <div className={styles.container}>
            {
                showSuccess 
                &&
                <div className={styles2.backgound}>
                    <div className={styles2.container}>
                        <Image src="/lf20_cpjxufjf.json.svg" width="167" height="167" alt="Successful" />
                        <h3 className={styles2.title}>Request Sent</h3>
                        <p className={styles2.paragraph}>Thank you for contacting us</p>
                        <div className={styles2.hr}></div>
                        <Link href='/'>
                            <a>
                                <button onClick={close} className={styles2.btn}>CLOSE</button>
                            </a>
                        </Link>
                    </div>
                </div>
            }
            <div className={styles.heroSection}>
                <div className={styles.leftHeroSection}>
                    <p className={styles.smallText}>contact us</p>
                    <h1 className={styles.bigText}>How can we help you?</h1>
                    <p className={styles.smallTextt}>Fill the form or send us an email</p>
                </div>
                <div className={styles.rightHeroSection}>
                    <Image src="/contactImage.svg" width="570" height="300" alt="Contact Us"/>
                </div>
            </div>
            <div className={styles.bodySection}>
                <div className={styles.leftBodySection}>
                    <div>
                        <span className={styles.span}>mobile number</span>
                        <ul>
                            <li className={styles.listItem}>0700DOTHMO</li>
                            <li className={styles.listItem}>+234 808 154 4406</li>
                        </ul>
                    </div>
                    <div>
                        <span className={styles.span}>email address</span>
                        <ul>
                            <li className={styles.listItem}>care@dothmo.com</li>
                        </ul>
                    </div>
                    <div>
                        <span className={styles.span}>office Address</span>
                        <ul>
                            <li className={styles.listItem}>MJS Building,366 Murtala Muhammed Way (Opposite Polaris Bank),Yaba bus stop.Sabo yaba,101245,Lagos</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rightBodySection}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <div className={styles.flex}>
                                <label className={styles.label} htmlFor="Name">Name</label>
                                <input 
                                    type="text"
                                    name="name"
                                    className={styles.name}
                                    onChange={handleChange}
                                    value={contactForm.name}
                                />
                            </div>
                            <div className={styles.flex}>
                                <label className={styles.label} htmlFor="phoneNumber">phone number</label>
                                <input 
                                    type="number"
                                    name="phone"
                                    className={styles.phone}
                                    onChange={handleChange}
                                    value={contactForm.phone}
                                />
                                <p className={styles.errorMessage}>{formErrors.phone}</p>
                            </div>
                            <div className={styles.flex}>
                                <label className={styles.label} htmlFor="message">message</label>
                                <textarea 
                                    type="text"
                                    name="message"
                                    className={styles.message}
                                    onChange={handleChange}
                                    value={contactForm.message} 
                                />
                            </div>
                            <button className={styles.btn} type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Contact;