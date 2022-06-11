import HeroSection from "../../component/hpHeroSection";
import styles2 from "../../styles/secondForm.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Axios from "axios"

const SecondForm = () => {

    const url = "https://dot-insure.herokuapp.com/provider/update"
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
            Axios.patch(url, {
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
                        lgaId: 1,
                        id: 1,
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
            <div className={styles2.contentSection}>
                <div className={styles2.provider}>
                    <p className={styles2.title}>CONTACT PERSON(S)</p>
                    <p className={styles2.step}>step 2/4</p>
                </div>
                <div className={styles2.line}></div>
                <form className={styles2.form} onSubmit={handleSubmit2}>
                    <div className={styles2.nameAndEmail}>
                        <div className={styles2.name}>
                            <label className={styles2.label}>Name of Managing Director</label>
                            <input 
                                type="text" 
                                name="nameOFManagingDirector" 
                                value={formData2.nameOFManagingDirector} 
                                onChange={handleChange2}
                                className={styles2.nameOFManagingDirector}
                            />
                            
                        </div>
                        <div className={styles2.email}>
                            <label className={styles2.label}>email address OF MANAGING DIRECTOR</label>
                            <input 
                                type="email"
                                name="emailOfManagingDirector"
                                value={formData2.emailOfManagingDirector}
                                onChange={handleChange2}
                                className={styles2.emailOfManagingDirector}
                            />
                        </div>
                    </div>
                    <div className={styles2.contactAndMobile}>
                        <div className={styles2.contact}>
                            <label className={styles2.label}>Name of Contact Person</label>
                            <input
                                type="text"
                                name="nameOfContactPerson"
                                value={formData2.nameOfContactPerson}
                                onChange={handleChange2}
                                className={styles2.contactPerson}
                            />
                            <p className={styles2.errorMessage}>{formErrors2.nameOfContactPerson}</p>
                        </div>
                        <div className={styles2.mobile}>
                            <label className={styles2.label}>Mobile Number of Contact Person</label>
                            <input
                                type="number"
                                name="mobileNumberOfContactPerson"
                                value={formData2.mobileNumberOfContactPerson}
                                onChange={handleChange2}
                                className={styles2.mobilePerson}
                            />
                            <p className={styles2.errorMessage}>{formErrors2.mobileNumberOfContactPerson}</p>
                        </div>
                    </div>
                    <div className={styles2.secondaryContactAndMobile}>
                        <div className={styles2.secondaryContact}>
                            <label className={styles2.label}>Name of Secondary Contact Person</label>
                            <input
                                type="text"
                                name="nameOfSecondaryContactPerson"
                                value={formData2.nameOfSecondaryContactPerson}
                                onChange={handleChange2}
                                className={styles2.secondaryContactPerson}
                            />
                        </div>
                        <div className={styles2.secondaryMobile}>
                            <label className={styles2.label}>Mobile Number of Secondary Contact Person</label>
                            <input 
                                type="number"
                                name="mobileNumberOfSecondaryContactPerson"
                                value={formData2.mobileNumberOfSecondaryContactPerson}
                                onChange={handleChange2}
                                className={styles2.secondaryMobilePerson}
                            />
                        </div>
                    </div>
                    <div className={styles2.bankDetails}>
                        <div className={styles2.bankName}>
                            <label className={styles2.label}>Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData2.bankName}
                                onChange={handleChange2}
                                className={styles2.bankNameDetails}
                            />
                            <p className={styles2.errorMessage}>{formErrors2.bankName}</p>
                        </div>
                        <div className={styles2.bankAccount}>
                            <label className={styles2.label}>Bank Account Number</label>
                            <input 
                                type="number"
                                name="bankAccountNumber"
                                value={formData2.bankAccountNumber}
                                onChange={handleChange2}
                                className={styles2.bankAccountDetails}
                            />
                            <p className={styles2.errorMessage}>{formErrors2.bankAccountNumber}</p>
                        </div>
                        <div className={styles2.claimsPayment}>
                            <label className={styles2.label}>Bank Branch</label>
                            <input 
                                type="text"
                                name="comments"
                                value={formData2.comments}
                                onChange={handleChange2}
                                className={styles2.comments}
                            />
                        </div>
                        <div className={styles2.claimsPaymentFrequency}>
                            <label className={styles2.label}>Claims Payment Frequency</label>
                            <select 
                            name="claimsPaymentFrequency" 
                            id="claimsPaymentFrequency" 
                            onChange={handleChange2}
                            value={formData2.claimsPaymentFrequency}
                            className={styles2.claimsPaymentFrequencyStyle}
                            required
                            >
                                <option value="">Select Provider Type</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles2.button}>
                        <div className={styles2.back}>
                            <Link href="/provider/firstForm">
                                <a>
                                    <button className={styles2.backButton}>Back</button>
                                </a>
                            </Link>
                        </div>
                        <div className={styles2.saveAndNext}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button onClick={showButton2} className={styles2.save}>SAVE AND CONTINUE LATER</button>
                            { 
                                Object.keys(formErrors2).length === 0 && displayNext2 && <Link href="/provider/thirdForm">
                                    <a>
                                        <button type="submit" className={styles2.next}>Next</button>
                                    </a>
                                </Link>
                            }
                            {/* <Link href="/provider/thirdForm">
                                <a>
                                    <button className={styles2.next}>Next</button>
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