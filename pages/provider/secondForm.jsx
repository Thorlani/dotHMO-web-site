import HeroSection from "../../component/hpHeroSection";
import styles from "../../styles/secondForm.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Axios from "axios"

const SecondForm = () => {

    const url = "https://dot-insure.herokuapp.com/provider/create"
    const [formData2, setFormData2] = useState({
        nameOFManagingDirector: "",
        emailOfManagingDirector: "",
        nameOfContactPerson: "",
        mobileNumberOfContactPerson: "",
        nameOfSecondaryContactPerson: "",
        mobileNumberOfSecondaryContactPerson: "",
        bankName: "",
        bankAccountNumber: "",
        comments: "",
        claimsPaymentFrequency: []
    })
    const [formErrors2, setFormErrors2] = useState({});
    const [isSubmit2, setIsSubmit2] = useState(false);
    const [displayNext2, setDisplayNext2] = useState(false);

    function handleChange2(event) {
        const { name, value, type, checked } = event.target
        setFormData2(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function errorChecker2(validate) {
        const errors= {};

        if (!validate.nameOfContactPerson) {
            errors.nameOfContactPerson = "Name of contact person is required"
        }
        if (!validate.mobileNumberOfContactPerson) {
            errors.mobileNumberOfContactPerson = "Mobile number of contact person is required"
        } else if (validate.mobileNumberOfContactPerson.length < 11) {
            errors.mobileNumberOfContactPerson = "Mobile number of contact person cannot be below 11 digits"
        } else if (validate.mobileNumberOfContactPerson.length > 11) {
            errors.mobileNumberOfContactPerson = "Mobile number of contact person cannot be above 11 digits"
        }
        if (!validate.bankName) {
            errors.bankName = "Bank name is required"
        }
        if (!validate.bankAccountNumber) {
            errors.bankAccountNumber = "Bank account number is required"
        } else if (validate.bankAccountNumber.length > 10) {
            errors.bankAccountNumber = "Bank account number cannot be above 11 digits"
        } else if (validate.bankAccountNumber.length < 10) {
            errors.bankAccountNumber = "Bank account number cannot be below 10 digits"
        }
        return errors;
    }

    

    function handleSubmit2(event) {
        event.preventDefault()
        setFormErrors2(errorChecker2(formData2))
        setIsSubmit2(true)
        if(displayNext2 === true) {
            // console.log(formData2)
        } else {
            console.log("There is currently an Error Message!")
        }
        if(isSubmit2 === true && Object.keys(formErrors2).length === 0) {
            Axios.post(url, {
                nameOfManagingDirector: formData2.nameOFManagingDirector,
                emailOfManagingDirector: formData2.emailOfManagingDirector,
                nameOfContactPerson: formData2.nameOfContactPerson,
                phoneOfContactPerson: formData2.mobileNumberOfContactPerson,
                nameOfSecondaryContactPerson: formData2.nameOfSecondaryContactPerson,
                phoneOfSecondaryContactPerson: formData2.mobileNumberOfSecondaryContactPerson,
                bankName: formData2.bankName,
                bankAccountNumber: formData2.bankAccountNumber,
                claimsPaymentFreq: formData2.claimsPaymentFrequency,
                branches: [
                    {
                        address: formData2.comments,
                        lgaId: formData2.comments
                    }
                ]
            })
        }
    }

    function showButton2() {
        if(isSubmit2 === true && Object.keys(formErrors2).length === 0) {
            setDisplayNext2(true)
        } else {
            setDisplayNext2(false)
        }
        
    }


    return (
        <div className="container">
            <HeroSection />
            <div className={styles.contentSection}>
                <div className={styles.provider}>
                    <p className={styles.title}>CONTACT PERSON(S)</p>
                    <p className={styles.step}>step 2/4</p>
                </div>
                <div className={styles.line}></div>
                <form className={styles.form} onSubmit={handleSubmit2}>
                    <div className={styles.nameAndEmail}>
                        <div className={styles.name}>
                            <label className={styles.label}>Name of Managing Director</label>
                            <input 
                                type="text" 
                                name="nameOFManagingDirector" 
                                value={formData2.nameOFManagingDirector} 
                                onChange={handleChange2}
                                className={styles.nameOFManagingDirector}
                            />
                            
                        </div>
                        <div className={styles.email}>
                            <label className={styles.label}>email address OF MANAGING DIRECTOR</label>
                            <input 
                                type="email"
                                name="emailOfManagingDirector"
                                value={formData2.emailOfManagingDirector}
                                onChange={handleChange2}
                                className={styles.emailOfManagingDirector}
                            />
                        </div>
                    </div>
                    <div className={styles.contactAndMobile}>
                        <div className={styles.contact}>
                            <label className={styles.label}>Name of Contact Person</label>
                            <input
                                type="text"
                                name="nameOfContactPerson"
                                value={formData2.nameOfContactPerson}
                                onChange={handleChange2}
                                className={styles.contactPerson}
                            />
                            <p className={styles.errorMessage}>{formErrors2.nameOfContactPerson}</p>
                        </div>
                        <div className={styles.mobile}>
                            <label className={styles.label}>Mobile Number of Contact Person</label>
                            <input
                                type="number"
                                name="mobileNumberOfContactPerson"
                                value={formData2.mobileNumberOfContactPerson}
                                onChange={handleChange2}
                                className={styles.mobilePerson}
                            />
                            <p className={styles.errorMessage}>{formErrors2.mobileNumberOfContactPerson}</p>
                        </div>
                    </div>
                    <div className={styles.secondaryContactAndMobile}>
                        <div className={styles.secondaryContact}>
                            <label className={styles.label}>Name of Secondary Contact Person</label>
                            <input
                                type="text"
                                name="nameOfSecondaryContactPerson"
                                value={formData2.nameOfSecondaryContactPerson}
                                onChange={handleChange2}
                                className={styles.secondaryContactPerson}
                            />
                        </div>
                        <div className={styles.secondaryMobile}>
                            <label className={styles.label}>Mobile Number of Secondary Contact Person</label>
                            <input 
                                type="number"
                                name="mobileNumberOfSecondaryContactPerson"
                                value={formData2.mobileNumberOfSecondaryContactPerson}
                                onChange={handleChange2}
                                className={styles.secondaryMobilePerson}
                            />
                        </div>
                    </div>
                    <div className={styles.bankDetails}>
                        <div className={styles.bankName}>
                            <label className={styles.label}>Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData2.bankName}
                                onChange={handleChange2}
                                className={styles.bankNameDetails}
                            />
                            <p className={styles.errorMessage}>{formErrors2.bankName}</p>
                        </div>
                        <div className={styles.bankAccount}>
                            <label className={styles.label}>Bank Account Number</label>
                            <input 
                                type="number"
                                name="bankAccountNumber"
                                value={formData2.bankAccountNumber}
                                onChange={handleChange2}
                                className={styles.bankAccountDetails}
                            />
                            <p className={styles.errorMessage}>{formErrors2.bankAccountNumber}</p>
                        </div>
                        <div className={styles.claimsPayment}>
                            <label className={styles.label}>Bank Branch</label>
                            <input 
                                type="text"
                                name="comments"
                                value={formData2.comments}
                                onChange={handleChange2}
                                className={styles.comments}
                            />
                        </div>
                        <div className={styles.claimsPaymentFrequency}>
                            <label className={styles.label}>Claims Payment Frequency</label>
                            <select 
                            name="claimsPaymentFrequency" 
                            id="claimsPaymentFrequency" 
                            onChange={handleChange2}
                            value={formData2.claimsPaymentFrequency}
                            className={styles.claimsPaymentFrequencyStyle}
                            required
                            >
                                <option value="">Select Provider Type</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <div className={styles.back}>
                            <Link href="/provider/firstForm">
                                <a>
                                    <button className={styles.backButton}>Back</button>
                                </a>
                            </Link>
                        </div>
                        <div className={styles.saveAndNext}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button onClick={showButton2} className={styles.save}>SAVE AND CONTINUE LATER</button>
                            { 
                                Object.keys(formErrors2).length === 0 && displayNext2 && <Link href="/provider/thirdForm">
                                    <a>
                                        <button type="submit" className={styles.next}>Next</button>
                                    </a>
                                </Link>
                            }
                            {/* <Link href="/provider/thirdForm">
                                <a>
                                    <button className={styles.next}>Next</button>
                                </a>
                            </Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default SecondForm;