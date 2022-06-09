import HeroSection from "../../component/hpHeroSection";
import Image from "next/image";
import styles from "../../styles/firstForm.module.css";
import { useState } from "react";
import { useEffect } from "react";
import NaijaStates, { states } from 'naija-state-local-government';
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

    // let listOfState = NaijaStates.states().map(state => {
    //     return (
    //         <option key={state} value={state}>{state}</option>
    //     )
    // })

    // let localGovernment = NaijaStates.all()[0].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment2 = NaijaStates.all()[1].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment3 = NaijaStates.all()[2].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment4 = NaijaStates.all()[3].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment5 = NaijaStates.all()[4].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment6 = NaijaStates.all()[5].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment7 = NaijaStates.all()[6].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment8 = NaijaStates.all()[7].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment9 = NaijaStates.all()[8].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment10 = NaijaStates.all()[9].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment11 = NaijaStates.all()[10].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment12 = NaijaStates.all()[11].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment13 = NaijaStates.all()[12].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment14 = NaijaStates.all()[13].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment15 = NaijaStates.all()[14].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment16 = NaijaStates.all()[15].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment17 = NaijaStates.all()[16].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment18 = NaijaStates.all()[17].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment19 = NaijaStates.all()[18].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment20 = NaijaStates.all()[19].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment21 = NaijaStates.all()[20].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment22 = NaijaStates.all()[21].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment23 = NaijaStates.all()[22].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment24 = NaijaStates.all()[23].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment25 = NaijaStates.all()[24].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment26 = NaijaStates.all()[25].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment27 = NaijaStates.all()[26].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment28 = NaijaStates.all()[27].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment29 = NaijaStates.all()[28].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment30 = NaijaStates.all()[29].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment31 = NaijaStates.all()[30].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment32 = NaijaStates.all()[31].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment33 = NaijaStates.all()[32].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment34 = NaijaStates.all()[33].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment35 = NaijaStates.all()[34].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment36 = NaijaStates.all()[35].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })
    // let localGovernment37 = NaijaStates.all()[36].lgas.map(lga => {
    //     return(
    //         <option key={lga} value={lga}>{lga}</option>
    //     )
    // })


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
                                {/* {
                                    formData.state === "Abia" && localGovernment 
                                    || formData.state === "Adamawa" && localGovernment2
                                    || formData.state === "Akwa Ibom" && localGovernment3
                                    || formData.state === "Anambra" && localGovernment4
                                    || formData.state === "Bauchi" && localGovernment5
                                    || formData.state === "Bayelsa" && localGovernment6
                                    || formData.state === "Benue" && localGovernment7
                                    || formData.state === "Borno" && localGovernment8
                                    || formData.state === "Cross River" && localGovernment9
                                    || formData.state === "Delta" && localGovernment10
                                    || formData.state === "Ebonyi" && localGovernment11
                                    || formData.state === "Edo" && localGovernment12
                                    || formData.state === "Ekiti" && localGovernment13
                                    || formData.state === "Enugu" && localGovernment14
                                    || formData.state === "Federal Capital Territory" && localGovernment15
                                    || formData.state === "Gombe" && localGovernment16
                                    || formData.state === "Imo" && localGovernment17
                                    || formData.state === "Jigawa" && localGovernment18
                                    || formData.state === "Kaduna" && localGovernment19
                                    || formData.state === "Kano" && localGovernment20
                                    || formData.state === "Katsina" && localGovernment21
                                    || formData.state === "Kebbi" && localGovernment22
                                    || formData.state === "Kogi" && localGovernment23
                                    || formData.state === "Kwara" && localGovernment24
                                    || formData.state === "Lagos" && localGovernment25
                                    || formData.state === "Nasarawa" && localGovernment26
                                    || formData.state === "Niger" && localGovernment27
                                    || formData.state === "Ogun" && localGovernment28
                                    || formData.state === "Ondo" && localGovernment29
                                    || formData.state === "Osun" && localGovernment30
                                    || formData.state === "Oyo" && localGovernment31
                                    || formData.state === "Plateau" && localGovernment32
                                    || formData.state === "Rivers" && localGovernment33
                                    || formData.state === "Sokoto" && localGovernment34
                                    || formData.state === "Taraba" && localGovernment35
                                    || formData.state === "Yobe" && localGovernment36
                                    || formData.state === "Zamfara" && localGovernment37

                                } */}
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
                                        {/* {
                                            formData.state === "Abia" && localGovernment 
                                            || formData.anotherBranchState === "Adamawa" && localGovernment2
                                            || formData.anotherBranchState === "Akwa Ibom" && localGovernment3
                                            || formData.anotherBranchState === "Anambra" && localGovernment4
                                            || formData.anotherBranchState === "Bauchi" && localGovernment5
                                            || formData.anotherBranchState === "Bayelsa" && localGovernment6
                                            || formData.anotherBranchState === "Benue" && localGovernment7
                                            || formData.anotherBranchState === "Borno" && localGovernment8
                                            || formData.anotherBranchState === "Cross River" && localGovernment9
                                            || formData.anotherBranchState === "Delta" && localGovernment10
                                            || formData.anotherBranchState === "Ebonyi" && localGovernment11
                                            || formData.anotherBranchState === "Edo" && localGovernment12
                                            || formData.anotherBranchState === "Ekiti" && localGovernment13
                                            || formData.anotherBranchState === "Enugu" && localGovernment14
                                            || formData.anotherBranchState === "Federal Capital Territory" && localGovernment15
                                            || formData.anotherBranchState === "Gombe" && localGovernment16
                                            || formData.anotherBranchState === "Imo" && localGovernment17
                                            || formData.anotherBranchState === "Jigawa" && localGovernment18
                                            || formData.anotherBranchState === "Kaduna" && localGovernment19
                                            || formData.anotherBranchState === "Kano" && localGovernment20
                                            || formData.anotherBranchState === "Katsina" && localGovernment21
                                            || formData.anotherBranchState === "Kebbi" && localGovernment22
                                            || formData.anotherBranchState === "Kogi" && localGovernment23
                                            || formData.anotherBranchState === "Kwara" && localGovernment24
                                            || formData.anotherBranchState === "Lagos" && localGovernment25
                                            || formData.anotherBranchState === "Nasarawa" && localGovernment26
                                            || formData.anotherBranchState === "Niger" && localGovernment27
                                            || formData.anotherBranchState === "Ogun" && localGovernment28
                                            || formData.anotherBranchState === "Ondo" && localGovernment29
                                            || formData.anotherBranchState === "Osun" && localGovernment30
                                            || formData.anotherBranchState === "Oyo" && localGovernment31
                                            || formData.anotherBranchState === "Plateau" && localGovernment32
                                            || formData.anotherBranchState === "Rivers" && localGovernment33
                                            || formData.anotherBranchState === "Sokoto" && localGovernment34
                                            || formData.anotherBranchState === "Taraba" && localGovernment35
                                            || formData.anotherBranchState === "Yobe" && localGovernment36
                                            || formData.anotherBranchState === "Zamfara" && localGovernment37

                                        } */}

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