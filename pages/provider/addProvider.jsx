import HeroSection from "../../component/hpHeroSection";
import Image from "next/image";
import styles from "../../styles/firstForm.module.css";
import { useState } from "react";
import { useEffect } from "react";
import NaijaStates, { states } from 'naija-state-local-government';
import Link from "next/link";
import Axios from "axios";

const AddProvider = () => {

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

    const [providerTypeFeatures, setProviderTypeFeatures] = useState({});

    useEffect(() => {
        Axios.get("https://dot-insure.herokuapp.com/provider/features-by-type/1")
        .then(res => {
            setProviderTypeFeatures(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // console.log(providerTypeFeatures);

    const [countryID, setCountryID] = useState({});
    const [stateID, setStateID] = useState([]);
    const [lga, setLga] = useState([]);
    const [formStage, setFormStage] = useState(1);

    useEffect(() => {
        Axios.get('https://dot-insure.herokuapp.com/country/list')
        .then(res => setCountryID(res.data)).catch(err => console.log(err))
    },[]);

    useEffect(() => {
        Axios.get("https://dot-insure.herokuapp.com/state/list/1")
        .then(res => setStateID(res.data)).catch(err => console.log(err))
    },[]);

    useEffect(() => {
        Axios.get("https://dot-insure.herokuapp.com/lga/list/25")
        .then(res => setLga(res.data)).catch(err => console.log(err))
    },[])

    let states = stateID.map((state) => {
        return (
            <option key={state.id} value={state.id}>{state.name}</option>
        )
    })

    let lgas = lga.map((lga) => {
        return (
            <option key={lga.id} value={lga.id}>{lga.name}</option>
        )
    })
    
    const url = "https://dot-insure.herokuapp.com/provider/create"
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
            console.log(formData)
        } else {
            console.log("There is currently an Error Message!")
        }
        if(isSubmit === true && Object.keys(formErrors).length === 0) {
            Axios.post(url, {
                providerTypeId: formData.providerType,
                providerName: formData.providerName,
                address: formData.providerAddress,
                lgaId: formData.localGovernment,
                phone: formData.phoneNumber,
                email: formData.email,
            })
        }
    }

    function showButton() {
        if(isSubmit === true && Object.keys(formErrors).length === 0) {
            setDisplayNext(true)
        } else {
            setDisplayNext(false)
        }
    }
    
    
    return (
        <div className="container">
            <HeroSection />
            <div className={styles.contentSection}>
                <div className={styles.provider}>
                    <p className={styles.title}>provider information</p>
                    <p className={styles.step}>step {formStage}/4</p>
                </div>
                <div className={styles.line}></div>
                {
                    formStage === 1 && (
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
                                        {/* {listOfState} */}
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
                                            {/* {listOfState} */}
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
                                                // required
                                            >
                                                <option value="">Select Local Government</option>

                                                {lgas}

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
                                    Object.keys(formErrors).length === 0 && displayNext && <Link href="/provider/secondForm">
                                        <a>
                                            <button type="submit" className={styles.next}>Next</button>
                                        </a>
                                    </Link>
                                }
                            </div>
                        </form>
                    )
                }
                {
                    formStage === 2 && (
                        <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.nameAndEmail}>
                        <div className={styles.name}>
                            <label className={styles.label}>Name of Managing Director</label>
                            <input 
                                type="text" 
                                name="nameOFManagingDirector" 
                                value={formData2.nameOFManagingDirector} 
                                onChange={handleChange}
                                className={styles.nameOFManagingDirector}
                            />
                            
                        </div>
                        <div className={styles.email}>
                            <label className={styles.label}>email address OF MANAGING DIRECTOR</label>
                            <input 
                                type="email"
                                name="emailOfManagingDirector"
                                value={formData2.emailOfManagingDirector}
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className={styles.contactPerson}
                            />
                            <p className={styles.errorMessage}>{formErrors.nameOfContactPerson}</p>
                        </div>
                        <div className={styles.mobile}>
                            <label className={styles.label}>Mobile Number of Contact Person</label>
                            <input
                                type="number"
                                name="mobileNumberOfContactPerson"
                                value={formData2.mobileNumberOfContactPerson}
                                onChange={handleChange}
                                className={styles.mobilePerson}
                            />
                            <p className={styles.errorMessage}>{formErrors.mobileNumberOfContactPerson}</p>
                        </div>
                    </div>
                    <div className={styles.secondaryContactAndMobile}>
                        <div className={styles.secondaryContact}>
                            <label className={styles.label}>Name of Secondary Contact Person</label>
                            <input
                                type="text"
                                name="nameOfSecondaryContactPerson"
                                value={formData2.nameOfSecondaryContactPerson}
                                onChange={handleChange}
                                className={styles.secondaryContactPerson}
                            />
                        </div>
                        <div className={styles.secondaryMobile}>
                            <label className={styles.label}>Mobile Number of Secondary Contact Person</label>
                            <input 
                                type="number"
                                name="mobileNumberOfSecondaryContactPerson"
                                value={formData2.mobileNumberOfSecondaryContactPerson}
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className={styles.bankNameDetails}
                            />
                            <p className={styles.errorMessage}>{formErrors.bankName}</p>
                        </div>
                        <div className={styles.bankAccount}>
                            <label className={styles.label}>Bank Account Number</label>
                            <input 
                                type="number"
                                name="bankAccountNumber"
                                value={formData2.bankAccountNumber}
                                onChange={handleChange}
                                className={styles.bankAccountDetails}
                            />
                            <p className={styles.errorMessage}>{formErrors.bankAccountNumber}</p>
                        </div>
                        <div className={styles.claimsPayment}>
                            <label className={styles.label}>Bank Branch</label>
                            <input 
                                type="text"
                                name="comments"
                                value={formData2.comments}
                                onChange={handleChange}
                                className={styles.comments}
                            />
                        </div>
                        <div className={styles.claimsPaymentFrequency}>
                            <label className={styles.label}>Claims Payment Frequency</label>
                            <select 
                            name="claimsPaymentFrequency" 
                            id="claimsPaymentFrequency" 
                            onChange={handleChange}
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
                            <button onClick={showButton} className={styles.save}>SAVE AND CONTINUE LATER</button>
                            { 
                                Object.keys(formErrors).length === 0 && displayNext && <Link href="/provider/thirdForm">
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
                    )
                }
                {
                    formStage === 3 && (
                        <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.ward}>
                            <label className={styles.upperlabel}>type of ward</label>
                            <select
                                name="typeOfWard" 
                                id="typeOfWard" 
                                onChange={handleChange}
                                value={formData3.typeOfWard}
                                className={styles.typeOfWard}
                                required
                            >
                                <option> Select Room Type </option>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>
                        <div className={styles.bed}>
                            <div className={styles.hdu}>
                                <label className={styles.upperlabel}>no of bed in HDU (Write 0 if you do n ot have a HDU)</label>
                                <input 
                                    placeholder="Enter number of beds"
                                    type="number"
                                    name="noOfBedInHDU"
                                    value={formData3.noOfBedInHDU}
                                    onChange={handleChange}
                                    className={styles.noOfBedInHDU}
                                />
                                <p className={styles.errorMessage}>{formErrors.noOfBedInHDU}</p>
                            </div>
                            <div className={styles.icu}>
                                <label className={styles.upperlabel}>no of bed in icu (Write 0 if you do n ot have a ICU)</label>
                                <input 
                                    placeholder="Enter number of beds"
                                    type="number"
                                    name="noOfBedInICU"
                                    value={formData3.noOfBedInICU}
                                    onChange={handleChange}
                                    className={styles.noOfBedInICU}
                                />
                                <p className={styles.errorMessage}>{formErrors.noOfBedInICU}</p>
                            </div>
                        </div>
                        <div className={styles.ward}>
                            <label className={styles.upperlabel}>type of ward</label>
                            <select
                                name="typeOfWardTwo" 
                                id="typeOfWardTwo" 
                                onChange={handleChange}
                                value={formData3.typeOfWardTwo}
                                className={styles.typeOfWard}
                                required
                            >
                                <option> Select Room Type </option>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>
                        <div className={styles.bed}>
                            <div className={styles.hdu}>
                                <label className={styles.upperlabel}>no of bed in HDU (Write 0 if you do n ot have a HDU)</label>
                                <input 
                                    placeholder="Enter number of beds"
                                    type="number"
                                    name="noOfBedInHDUTwo"
                                    value={formData3.noOfBedInHDUTwo}
                                    onChange={handleChange}
                                    className={styles.noOfBedInHDU}
                                />
                            </div>
                            <div className={styles.icu}>
                                <label className={styles.upperlabel}>no of bed in icu (Write 0 if you do n ot have a ICU)</label>
                                <input 
                                    placeholder="Enter number of beds"
                                    type="number"
                                    name="noOfBedInICUTwo"
                                    value={formData3.noOfBedInICUTwo}
                                    onChange={handleChange}
                                    className={styles.noOfBedInICU}
                                />
                            </div>
                        </div>
                        <div className={styles.formFoot}>
                            <p className={styles.topic}>confirm the availability of the following</p>
                            <div className={styles.gridCheck}>
                                <div className={styles.grid1}>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="ambulance"
                                            checked={formData3.ambulance}
                                            name="ambulance"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="ambulance">Ambulance</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="CTScanMachine"
                                            checked={formData3.CTScanMachine}
                                            name="CTScanMachine"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="CTScanMachine">CT Scan Machine</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="mammogram"
                                            checked={formData3.mammogram}
                                            name="mammogram"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="mammogram">Mammogram</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="haemodialysis"
                                            checked={formData3.haemodialysis}
                                            name="haemodialysis"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="haemodialysis">Haemodialysis</label>
                                    </div>
                                </div>
                                <div className={styles.grid2}>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="twoFourHrAmbulance"
                                            checked={formData3.twoFourHrAmbulance}
                                            name="twoFourHrAmbulance"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="twoFourHrAmbulance">24-hr Ambulance</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="MRIMachine"
                                            checked={formData3.MRIMachine}
                                            name="MRIMachine"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="MRIMachine">MRI Machine</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="UltrasoundScan"
                                            checked={formData3.UltrasoundScan}
                                            name="UltrasoundScan"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="UltrasoundScan">Ultrasound Scan</label>
                                    </div>
                                </div>
                                <div className={styles.grid3}>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="InhouseLaboratory"
                                            checked={formData3.InhouseLaboratory}
                                            name="InhouseLaboratory"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="InhouseLaboratory">In-house Laboratory</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="inhouseXRay"
                                            checked={formData3.inhouseXRay}
                                            name="inhouseXRay"
                                            onChange={handleChange}
                                            className={styles.input}
                                            
                                        />
                                        <label className={styles.label} htmlFor="inhouseXRay">in-house X-Ray</label>
                                    </div>
                                    <div className={styles.centralize}>
                                        <input 
                                            type="checkbox"
                                            id="ICU"
                                            checked={formData3.ICU}
                                            name="ICU"
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                        <label className={styles.label} htmlFor="ICU">ICU</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <div className={styles.back}>
                                <Link href="/provider/secondForm">
                                    <a>
                                        <button className={styles.backButton}>Back</button>
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.saveAndNext}>
                                <Image src="/save.svg" width="18" height="18" />
                                <button onClick={showButton} className={styles.save}>SAVE AND CONTINUE LATER</button>
                                { 
                                    Object.keys(formErrors).length === 0 && displayNext && <Link href="/provider/fourthForm">
                                        <a>
                                            <button type="submit" className={styles.next}>Next</button>
                                        </a>
                                    </Link>
                                }
                                {/* <Link href="/provider/fourthForm">
                                    <a>
                                        <button className={styles.next}>Next</button>
                                    </a>
                                </Link> */}
                            </div>
                        </div>
                    </form>
                    )
                }
            </div>
        </div>
    );
}
 
export default AddProvider;