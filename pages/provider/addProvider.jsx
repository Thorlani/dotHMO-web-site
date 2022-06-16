import HeroSection from "../../component/hpHeroSection";
import Image from "next/image";
import styles from "../../styles/firstForm.module.css";
import styles2 from "../../styles/secondForm.module.css";
import styles3 from "../../styles/thirdForm.module.css";
import styles4 from "../../styles/fourthForm.module.css";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";
import { useDropzone } from "react-dropzone";
import ApplicationSubmitted from "./applicationSubmitted";
import FormData from "form-data";
import _ from "lodash";


const AddProvider = () => {

    const firstUrl = "https://dot-insure.herokuapp.com/provider/create";
    const secondUrl = "https://dot-insure.herokuapp.com/provider/update";
    
    const [facilities, setFacilites] = useState([])
    const [providerTypeID, setProviderTypeID] = useState([]);

    useEffect(() => {
        Axios.get("https://dot-insure.herokuapp.com/provider/provider-types")
        .then(res => {
            setProviderTypeID(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    // console.log(providerTypeID);

    let option = providerTypeID.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.typeName}</option>
        )
    })


    const [countryID, setCountryID] = useState({});
    const [stateID, setStateID] = useState([]);
    const [lga, setLga] = useState([]);
    const [policyType, setPolicyType] = useState([]);
    
    useEffect(() => {
        Axios.get('https://dot-insure.herokuapp.com/country/list')
        .then(res => setCountryID(res.data)).catch(err => console.log(err))
    },[]);

    useEffect(() => {
        Axios.get("https://dot-insure.herokuapp.com/state/list/1")
        .then(res => setStateID(res.data)).catch(err => console.log(err))
    },[]);

    let states = stateID.map((state) => {
        return (
            <option key={state.id} value={state.id}>{state.name}</option>
        )
    })



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

    const local = `https://dot-insure.herokuapp.com/lga/list/${formData.state}`


    const [anotherBranch, setAnotherBranch] = useState([]);
    const anotherlocal = `https://dot-insure.herokuapp.com/lga/list/${formData.anotherBranchState}`
    
    useEffect(() => {
        Axios.get(local).then(res => setLga(res.data)).catch(err => console.log(err))
    }, [formData.state])

    let lgas = lga.map((lga) => {
        return (
            <option key={lga.id} value={lga.id}>{lga.name}</option>
        )
    })

    useEffect(() => {
        Axios.get(anotherlocal).then(res => setAnotherBranch(res.data)).catch(err => console.log(err))
    }, [formData.anotherBranchState])

    let anotherLgas = anotherBranch.map((lga) => {
        return (
            <option key={lga.id} value={lga.id}>{lga.name}</option>
        )
    })

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

    const [providerId, setProviderId] = useState({})

    function handleSubmit(event) {
        event.preventDefault()
        setFormErrors(validate(formData))
        setIsSubmit(true)
        if(displayNext === true) {
            console.log("There is currently no Error Message!")
        } else {
            console.log("There is currently an Error Message!")
        }
        if (Object.keys(formErrors).length === 0 && displayNext) {
            Axios.post(firstUrl, {
                providerTypeId: parseInt(formData.providerType),
                providerName: formData.providerName,
                address: formData.providerAddress,
                lgaId: parseInt(formData.localGovernment),
                phone: formData.phoneNumber,
                email: formData.email
            }).then(res => {
                setProviderId(res.data)
                console.log("Sent successfully")
            })
        }
    }
    
    // console.log(providerId.id)

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
        if (Object.keys(formErrors2).length === 0 && displayNext2) {
            Axios.patch(secondUrl, {
                providerTypeId: parseInt(formData.providerType),
                providerName: formData.providerName,
                address: formData.providerAddress,
                lgaId: parseInt(formData.localGovernment),
                phone: formData.phoneNumber,
                email: formData.email,
                nameOfManagingDirector: formData2.nameOFManagingDirector,
                emailOfManagingDirector: formData2.emailOfManagingDirector,
                nameOfContactPerson: formData2.nameOfContactPerson,
                phoneOfContactPerson: formData2.mobileNumberOfContactPerson,
                nameOfSecondaryContactPerson: formData2.nameOfSecondaryContactPerson,
                phoneOfSecondaryContactPerson: formData2.mobileNumberOfSecondaryContactPerson,
                bankName: formData2.bankName,
                bankAccountNumber: formData2.bankAccountNumber,
                claimsPaymentFreq: formData2.claimsPaymentFrequency.toLowerCase(),
                branches: [
                    {
                    address: formData2.comments,
                    lgaId: 1,
                    id: 1
                    }
                ],
                id: providerId.id.toString()
            }).then(res => {
                // console.log(res.data)
                console.log("Successfully updated!")
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

    const providerTypeFeatures = `https://dot-insure.herokuapp.com/provider/features-by-type/${formData.providerType}`;

    useEffect(() => {
        Axios.get(providerTypeFeatures).then(res => {
            setFacilites(res.data)
            // console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [formData.providerType])

    // console.log(facilities)

    
    const url3 = "https://dot-insure.herokuapp.com/provider/update"
    const [formData3, setFormData3] = useState({
        typeOfWard: "",
        typeOfWardTwo: "",
        noOfBedInHDU: "",
        noOfBedInICU: "",
        noOfBedInHDUTwo: "",
        noOfBedInICUTwo: "",
    })
    // console.log(formData3)

    let amenities = facilities.map((facility) => {
        return <div key={facility.id} className={styles3.centralize}>
            <input 
                type="checkbox"
                id={facility.name}
                checked={formData3[facility.name] || false}
                name={facility.name}
                onChange={handleChange3}
                className={styles3.input}
            />
            <label className={styles3.label} htmlFor={facility.name}>{facility.name}</label>
        </div>
    })

    

    const [formErrors3, setFormErrors3] = useState({});
    const [isSubmit3, setIsSubmit3] = useState(false);
    const [displayNext3, setDisplayNext3] = useState(false);

    function handleChange3(event) {
        const { name, value, type, checked } = event.target
        setFormData3(prevFormData => {
            if (type === 'checkbox') {
                return {
                    ...prevFormData,
                    [name]: checked
                }
            }
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }


    function errorCkecker3(validate) {
        const error = {};

        if(!validate.noOfBedInHDU) {
            error.noOfBedInHDU = "Please enter number of beds in HDU";
        }
        if(!validate.noOfBedInICU) {
            error.noOfBedInICU = "Please enter number of beds in ICU";
        }
        return error;
    }

    function handleSubmit3(event) {
        event.preventDefault()
        setFormErrors3(errorCkecker3(formData3))
        setIsSubmit3(true)
        if(displayNext3 === true) {
            // console.log(formData3)
        } else {
            console.log("There is currently an Error Message!")
        }
        if (Object.keys(formErrors3).length === 0 && displayNext3) {
            Axios.patch(secondUrl, {
                providerTypeId: parseInt(formData.providerType),
                providerName: formData.providerName,
                address: formData.providerAddress,
                lgaId: parseInt(formData.localGovernment),
                phone: formData.phoneNumber,
                email: formData.email,
                nameOfManagingDirector: formData2.nameOFManagingDirector,
                emailOfManagingDirector: formData2.emailOfManagingDirector,
                nameOfContactPerson: formData2.nameOfContactPerson,
                phoneOfContactPerson: formData2.mobileNumberOfContactPerson,
                nameOfSecondaryContactPerson: formData2.nameOfSecondaryContactPerson,
                phoneOfSecondaryContactPerson: formData2.mobileNumberOfSecondaryContactPerson,
                bankName: formData2.bankName,
                bankAccountNumber: formData2.bankAccountNumber,
                claimsPaymentFreq: formData2.claimsPaymentFrequency.toLowerCase(),
                branches: [
                    {
                    address: formData2.comments,
                    lgaId: 1,
                    id: 1
                    }
                ],
                facilities: [
                    {
                      wardType: formData3.typeOfWard,
                      numberOfBedsHDU: parseInt(formData3.noOfBedInHDU),
                      numberOfBedsICU: parseInt(formData3.noOfBedInICU),
                      features: facilities.map(facility => formData3[facility.name] ? {id: facility.id} : null ).filter(facility => facility),
                    // id: 1
                    }
                  ],
                id: providerId.id.toString()
            }).then(res => {
                // console.log(res.data)
                console.log("This has been successfully updated!")
            })
        }
    }

    // console.log(facilities);

    function showButton3() {
        if(isSubmit3 === true && Object.keys(formErrors3).length === 0) {
            setDisplayNext3(true)
        } else {
            setDisplayNext3(false)
        }
    }
    
    const docs = `https://dot-insure.herokuapp.com/provider/documents/${providerId.id}`;
    
    
    const [files, setFiles] = useState([])

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach(file => {
            setFiles(prevState => [...prevState, file])
        });
    })

    // useEffect(() => {
    //     console.log(files)
    // }, [files])

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        maxFiles: 3,
        maxSize: 4242880,
        multiple: true,
        accept: {
            'image/png': ['.png', '.jpeg'],
            'text/plain': ['.pdf'],
        }
    });

    
  
    const filesAccepted = acceptedFiles.map(file => (
        <li className={styles4.li} key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    function handleSubmit4(event) {
        event.preventDefault();
        let formData = new FormData();

        for (let i = 0 ; i < files.length ; i++) {
            formData.append('files', files[i])
        }

        if(Object.keys(files).length === 3) {
            Axios.patch(docs, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                console.log(res.data)
                console.log("This documents have been uploaded")
                setShowSubmitted(true);
            }).catch(err => {
                console.log(err)
                console.log("This docs were NOT uploaded")
            })
        }
    }

    


    const [showSubmitted, setShowSubmitted] = useState(false);

    function handleClose4() {
        setShowSubmitted(true);
    }

    function handleClose4Submitted() {
        setShowSubmitted(false);
    }

    // styles

    let flex = {
        display: 'flex'
    }

    return (
        <div className="container">
            <HeroSection />
            <div className={styles.contentSection}>
                <div className={styles.provider}>
                    <p className={styles.title}>{
                        formStages === 1 && "Provider Information" ||
                        formStages === 2 && "CONTACT PERSON(S)" || 
                        formStages === 3 && "facility information" ||
                        formStages === 4 && "upload documents"
                    }</p>
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
                            required
                        >
                            <option value="">Select Provider Type</option>
                            {option}
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
                            required
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
                                required
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
                                required
                            >
                                <option value="">Select State</option>
                                {states}
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
                                required
                            >
                                <option value="">Select Local Government</option>
                                {lgas}
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
                                required
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
                                required
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
                                        required
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
                                        required
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
                                    >
                                    <option value="">Select State</option>
                                    {states}
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
                                    >
                                        <option value="">Select Local Government</option>
                                        {anotherLgas}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.linee}></div>
                        <p className={styles.addBranch}> + Add another branch</p>
                    </div>
                    <div className={styles.formNext}>
                        <div style={flex}  onClick={showButton}>
                        <Image src="/save.svg" width="18" height="18" />
                        <button type="submit" className={styles.save}>
                            SAVE AND CONTINUE
                        </button>
                        </div>
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
                            <div style={flex} onClick={showButton2}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button type="submit" className={styles2.save}>SAVE AND CONTINUE LATER</button>
                            </div>
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
                    <form className={styles3.form} onSubmit={handleSubmit3}>
                    <div className={styles3.ward}>
                        <label className={styles3.upperlabel}>type of ward</label>
                        <select
                            name="typeOfWard" 
                            id="typeOfWard" 
                            onChange={handleChange3}
                            value={formData3.typeOfWard}
                            className={styles3.typeOfWard}
                            required
                        >
                            <option> Select Room Type </option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    <div className={styles3.bed}>
                        <div className={styles3.hdu}>
                            <label className={styles3.upperlabel}>no of bed in HDU (Write 0 if you do n ot have a HDU)</label>
                            <input 
                                placeholder="Enter number of beds"
                                type="number"
                                name="noOfBedInHDU"
                                value={formData3.noOfBedInHDU}
                                onChange={handleChange3}
                                className={styles3.noOfBedInHDU}
                            />
                            <p className={styles3.errorMessage}>{formErrors3.noOfBedInHDU}</p>
                        </div>
                        <div className={styles3.icu}>
                            <label className={styles3.upperlabel}>no of bed in icu (Write 0 if you do n ot have a ICU)</label>
                            <input 
                                placeholder="Enter number of beds"
                                type="number"
                                name="noOfBedInICU"
                                value={formData3.noOfBedInICU}
                                onChange={handleChange3}
                                className={styles3.noOfBedInICU}
                            />
                            <p className={styles3.errorMessage}>{formErrors3.noOfBedInICU}</p>
                        </div>
                    </div>
                    <div className={styles3.ward}>
                        <label className={styles3.upperlabel}>type of ward</label>
                        <select
                            name="typeOfWardTwo" 
                            id="typeOfWardTwo" 
                            onChange={handleChange3}
                            value={formData3.typeOfWardTwo}
                            className={styles3.typeOfWard}
                            required
                        >
                            <option> Select Room Type </option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    <div className={styles3.bed}>
                        <div className={styles3.hdu}>
                            <label className={styles3.upperlabel}>no of bed in HDU (Write 0 if you do n ot have a HDU)</label>
                            <input 
                                placeholder="Enter number of beds"
                                type="number"
                                name="noOfBedInHDUTwo"
                                value={formData3.noOfBedInHDUTwo}
                                onChange={handleChange3}
                                className={styles3.noOfBedInHDU}
                            />
                        </div>
                        <div className={styles3.icu}>
                            <label className={styles3.upperlabel}>no of bed in icu (Write 0 if you do n ot have a ICU)</label>
                            <input 
                                placeholder="Enter number of beds"
                                type="number"
                                name="noOfBedInICUTwo"
                                value={formData3.noOfBedInICUTwo}
                                onChange={handleChange3}
                                className={styles3.noOfBedInICU}
                            />
                        </div>
                    </div>
                    <div className={styles3.formFoot}>
                        <p className={styles3.topic}>confirm the availability of the following</p>
                        <div className={styles3.gridCheck}>
                            {amenities}
                        </div>
                    </div>
                    <div className={styles3.button}>
                        <div className={styles3.back}>
                            <button onClick={decrementFormStage} className={styles3.backButton}>Back</button>
                        </div>
                        <div className={styles3.saveAndNext}>
                            <div style={flex} onClick={showButton3}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button className={styles3.save}>SAVE AND CONTINUE LATER</button>
                            </div>
                            { 
                                Object.keys(formErrors3).length === 0 && displayNext3 && <button onClick={incrementFormStage} className={styles3.next}>Next</button>
                            }
                            {/* { 
                                Object.keys(formErrors3).length === 0 && displayNext3 && <Link href="/provider/fourthForm">
                                    <a>
                                        <button type="submit" className={styles3.next}>Next</button>
                                    </a>
                                </Link>
                            } */}
                            {/* <Link href="/provider/fourthForm">
                                <a>
                                    <button className={styles3.next}>Next</button>
                                </a>
                            </Link> */}
                        </div>
                    </div>
                </form> : null 
                }
                {
                    formStages === 4 ? 
                <div>
                    <div className={styles4.end}>
                        <p className={styles4.topic}>Upload the following documents</p>
                        <ul>
                            <li className={styles4.uploads}>CAC Registration Certificate</li>
                            <li className={styles4.uploads}>Evidence of Registration with the relevant state accreditation agency</li>
                            <li className={styles4.uploads}>Certificate of Medical Indemnity Insurance as detailed under section 8 of this agreement</li>
                            <li className={styles4.uploads}>Practicing licenses of Professional Staff under your employ</li>
                        </ul>
                    </div>

                    <form className={styles4.form} onSubmit={handleSubmit4}>
                        <div className={styles4.wrapper}>
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <div className={styles4.flex}>
                                {isDragActive ? <p className={styles4.paragraph1}>Drop your documents </p> 
                                : <p className={styles4.paragraph1}>Drag & drop file here or </p> }
                                <button className={styles4.btn}>choose files</button>
                                </div>
                                <p className={styles4.paragraph2}>PNG, JPEG & PDF (Max 4mb)</p>
                            </div>
                            <aside>
                                <ul>{filesAccepted}</ul>
                            </aside>
                        </div>

                        <div className={styles4.button}>
                            <div className={styles4.back}>
                                <button onClick={decrementFormStage} className={styles4.backButton}>Back</button>
                                {/* <Link href="/provider/thirdForm">
                                    <a>
                                        <button onClick={decrementFormStage} className={styles4.backButton}>Back</button>
                                    </a>
                                </Link> */}
                            </div>
                            <div className={styles4.saveAndNext}>
                                {/* <Image src="/save.svg" width="18" height="18" />
                                <button type="submit" className={styles4.save}>SAVE AND CONTINUE</button> */}
                                <button type="submit" className={styles4.submit}>submit</button>
                            </div>
                        </div>
                    </form>
                    {showSubmitted && <ApplicationSubmitted close={handleClose4Submitted} />}
                </div> : null
                }
            </div>
        </div>
    );
}
 
export default AddProvider;