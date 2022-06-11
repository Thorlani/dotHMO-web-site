import HeroSection from "../../component/hpHeroSection";
import Image from "next/image";
import styles from "../../styles/firstForm.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";

const FirstForm = () => {

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
                    <p className={styles.step}>step 1/4</p>
                </div>
                <div className={styles.line}></div>
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
                        {/* <Link href="/provider/secondForm">
                            <a>
                                <button type="submit" className={styles.next}>Next</button>
                            </a>
                        </Link> */}
                        {/* {
                            Object.keys(formErrors).length === 0 ? <button type="submit" className={styles.next}>Submit</button> : <button type="submit" className={styles.next}>Save</button>
                        } */}
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default FirstForm;