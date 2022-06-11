import HeroSection from "../../component/hpHeroSection";
import Image from "next/image";
import styles from "../../styles/firstForm.module.css";
import styles2 from "../../styles/secondForm.module.css";
import styles3 from "../../styles/thirdForm.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";

const AddProvider = () => {

    const [formStages, setFormStages] = useState(1);

    function incrementFormStage() {
        setFormStages(prevState => prevState + 1);
    }

    function decrementFormStage() {
        setFormStages(prevState => prevState - 1);
    }

    const [formData, setFormData] = useState({
        providerType: [],
        providerName: "",
        providerAddress: "",
        state: [],
        localGovernment: [],
        phoneNumber: "",
        email: "",
        DoYouHaveBranches: "",
        anotherBranchAddress: "",
        anotherBranchState: [],
        anotherBranchLG: [],
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [displayNext, setDisplayNext] = useState(false);


    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        // console.log(formData)
    }
 


    function validate(values) {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!values.providerName) {
            errors.providerName = 'Provider name is required!';
        }
        if(!values.providerAddress) {
            errors.providerAddress = 'Provider address is required';
        }
        if(!values.phoneNumber) {
            errors.phoneNumber = 'Provider phone number is required';
        } else if (values.phoneNumber.length < 11) {
            errors.phoneNumber = 'Phone number cannot be below 11 numbers!'
        } else if (values.phoneNumber.length > 11) {
            errors.phoneNumber = 'Phone number must not exceed 11 numbers!'
        }
        if(!values.email) {
            errors.email = 'Provider email is required';
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        return errors;
    }


    function handleSubmit(event) {
        event.preventDefault()
        setFormErrors(validate(formData))
        setIsSubmit(true)
        if(displayNext === true) {
            console.log("There is currently no Error Message!")
        } else {
            console.log("There is currently an Error Message!")
        }
        // if(isSubmit === true && Object.keys(formErrors).length === 0) {
        //     Axios.post(url, {
        //         providerTypeId: formData.providerType,
        //         providerName: formData.providerName,
        //         address: formData.providerAddress,
        //         lgaId: formData.localGovernment,
        //         phone: formData.phoneNumber,
        //         email: formData.email,
        //     })
        // }
    }

    function showButton() {
        if(isSubmit === true && Object.keys(formErrors).length === 0) {
            setDisplayNext(true)
        } else {
            setDisplayNext(false)
        }
    }


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
        // if(isSubmit2 === true && Object.keys(formErrors2).length === 0) {
        //     Axios.patch(url, {
        //         nameOfManagingDirector: formData2.nameOFManagingDirector,
        //         emailOfManagingDirector: formData2.emailOfManagingDirector,
        //         nameOfContactPerson: formData2.nameOfContactPerson,
        //         phoneOfContactPerson: formData2.mobileNumberOfContactPerson,
        //         nameOfSecondaryContactPerson: formData2.nameOfSecondaryContactPerson,
        //         phoneOfSecondaryContactPerson: formData2.mobileNumberOfSecondaryContactPerson,
        //         bankName: formData2.bankName,
        //         bankAccountNumber: formData2.bankAccountNumber,
        //         claimsPaymentFreq: formData2.claimsPaymentFrequency,
        //         branches: [
        //             {
        //                 address: formData2.comments,
        //                 lgaId: 1,
        //                 id: 1,
        //             }
        //         ]
        //     })
        // }
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
                    <p className={styles.title}>provider information</p>
                    <p className={styles.step}>step {formStages}/4</p>
                </div>
                <div className={styles.line}></div>
                {
                    formStages === 1 ? 
                    <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.providerTypeContainer}>
                        <label htmlFor="providerType">Provider Type</label>
                        <select 
                            name="providerType" 
                            id="providerType" 
                            onChange={handleChange}
                            value={formData.providerType}
                            className={styles.selectProviderType}
                            // required
                        >
                            <option value="">Select Provider Type</option>
                        </select>
                    </div>
                    <div className={styles.providerName}>
                        <label htmlFor="providerName">Provider Name</label>
                        <input
                            type="text"
                            name="providerName"
                            value={formData.providerName}
                            onChange={handleChange}
                            className={styles.inputProviderName}
                            // required
                        />
                        <p className={styles.errorMessage}>{formErrors.providerName}</p>
                    </div>
                    <div className={styles.addressStateLG}>
                        <div className={styles.address}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="providerAddress"
                                value={formData.providerAddress}
                                onChange={handleChange}
                                className={styles.inputAddress}
                                // required
                            />
                            <p className={styles.errorMessage}>{formErrors.providerAddress}</p>
                        </div>
                        <div className={styles.state}>
                            <label htmlFor="state">State</label>
                            <select
                                name="state" 
                                id="state"
                                onChange={handleChange}
                                value={formData.state}
                                className={styles.selectState}
                                // required
                            >
                                <option value="">Select State</option>
                            </select>
                        </div>
                        <div className={styles.lg}>
                            <label htmlFor="lg">LGA</label>
                            <select
                                name="localGovernment"
                                id="localGovernment"
                                onChange={handleChange}
                                value={formData.localGovernment}
                                className={styles.selectLG}
                                // required
                            >
                                <option value="">Select Local Government</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.phoneNumberAndEmail}>
                        <div className={styles.phoneNumber}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={styles.inputPhoneNumber}
                                // required
                            />
                            <p className={styles.errorMessage}>{formErrors.phoneNumber}</p>
                        </div>
                        <div className={styles.email}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.inputEmail}
                                // required
                            />  
                            <p className={styles.errorMessage}>{formErrors.email}</p>
                        </div>
                    </div>
                    <div className={styles.formFoot}>
                        <div className={styles.radio}>
                            <label>Do you have Branches</label>
                            <div className={styles.radioBtn}>
                                <div className="no">
                                    <input
                                        type="radio"
                                        id="No"
                                        name="DoYouHaveBranches"
                                        value="No"
                                        check={formData.DoYouHaveBranches === "No"}
                                        className={styles.no}
                                        onChange={handleChange}
                                        // required
                                    />
                                    <label htmlFor="No">No</label>
                                </div>
                                <div className="yes">
                                    <input
                                        type="radio"
                                        id="Yes"
                                        name="DoYouHaveBranches"
                                        value="Yes"
                                        check={formData.DoYouHaveBranches === "Yes"}
                                        className={styles.yes}
                                        onChange={handleChange}
                                        // required
                                    />
                                    <label  htmlFor="Yes">Yes</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.anotherBranchAddresses}>
                            <div className={styles.place}>
                                <div className={styles.flexColumn}>
                                    <label htmlFor="place">Address</label>
                                    <input
                                        type="text"
                                        name="anotherBranchAddress"
                                        value={formData.anotherBranchAddress}
                                        onChange={handleChange}
                                        className={styles.inputPlace}
                                        // required
                                    />
                                </div>
                                <div className={styles.flexColumnState}>
                                    <label htmlFor="state">State</label>
                                    <select
                                        name="anotherBranchState" 
                                        id="anotherBranchState"
                                        onChange={handleChange}
                                        value={formData.anotherBranchState}
                                        className={styles.selectanotherBranchState}
                                        // required
                                    >
                                    <option value="">Select State</option>
                                    </select>
                                </div>
                                <div className={styles.flexColumnLG}>
                                    <label htmlFor="lga">LGA</label>
                                    <select
                                        name="anotherBranchLG"
                                        id="anotherBranchLG"
                                        onChange={handleChange}
                                        value={formData.anotherBranchLG}
                                        className={styles.selectanotherBranchLG}
                                        // required
                                    >
                                        <option value="">Select Local Government</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.linee}></div>
                        <p className={styles.addBranch}> + Add another branch</p>
                    </div>
                    <div className={styles.formNext}>
                        <Image src="/save.svg" width="18" height="18" />
                        <button onClick={showButton} className={styles.save}>
                            SAVE AND CONTINUE
                        </button>
                        { 
                            Object.keys(formErrors).length === 0 && displayNext && <button onClick={incrementFormStage} className={styles.next}>Next</button>
                        }
                        {/* { 
                            Object.keys(formErrors).length === 0 && displayNext && <Link href="/provider/secondForm">
                                <a>
                                    <button type="submit" className={styles.next}>Next</button>
                                </a>
                            </Link>
                        } */}
                        {/* <Link href="/provider/secondForm">
                            <a>
                                <button type="submit" className={styles.next}>Next</button>
                            </a>
                        </Link> */}
                        {/* {
                            Object.keys(formErrors).length === 0 ? <button type="submit" className={styles.next}>Submit</button> : <button type="submit" className={styles.next}>Save</button>
                        } */}
                    </div>
                    </form> : 
                    null
                }
                {
                    formStages === 2 ? 
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
                        <button onClick={decrementFormStage} className={styles2.backButton}>Back</button>
                            {/* <Link href="/provider/firstForm">
                                <a>
                                    <button className={styles2.backButton}>Back</button>
                                </a>
                            </Link> */}
                        </div>
                        <div className={styles2.saveAndNext}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button onClick={showButton2} className={styles2.save}>SAVE AND CONTINUE LATER</button>
                            {
                                Object.keys(formErrors2).length === 0 && displayNext2 && <button onClick={incrementFormStage} className={styles2.next}>Next</button>
                            }
                            {/* { 
                                Object.keys(formErrors2).length === 0 && displayNext2 && <Link href="/provider/thirdForm">
                                    <a>
                                        <button type="submit" className={styles2.next}>Next</button>
                                    </a>
                                </Link>
                            } */}
                            {/* <Link href="/provider/thirdForm">
                                <a>
                                    <button className={styles2.next}>Next</button>
                                </a>
                            </Link> */}
                        </div>
                    </div>
                </form> : null
                }
                {
                    formStages === 3 ? 
                    <div>
                        <h1>Form THREE</h1>
                        <button onClick={incrementFormStage}>add me</button>
                        <button onClick={decrementFormStage}>Remove me</button>
                    </div> : null
                }
                {
                    formStages === 4 ? 
                    <div>
                        <h1>Form FOUR</h1>
                        <button onClick={decrementFormStage}>Remove me</button>
                    </div> : null
                }
            </div>
        </div>
    );
}
 
export default AddProvider;