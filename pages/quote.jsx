import styles from "../styles/quote.module.css";
import { useState } from "react";
import { useEffect } from "react";
import NaijaStates, { states } from 'naija-state-local-government';
import Axios from "axios";

const Quote = ({ closeModal, savedd }) => {

    const [selectedState, setSelectedState] = useState('');

    function cancel() {
        closeModal(false);
    }

    function submited() {
        savedd(false);
    }

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

    useEffect(() => {
        Axios.get("https://dot-insure.herokuapp.com/policy-type/list")
        .then(res => setPolicyType(res.data)).catch(err => console.log(err))
    }, [])

    // console.log(policyType)

    // let listOfState = NaijaStates.states().map(state => {
    //     return (
    //         <option key={state} value={state}>{state}</option>
    //     )
    // })

    let states = stateID.map((state) => {
        return (
            <option key={state.id} value={state.id}>{state.name}</option>
        )
    })


    let policyTypes = policyType.map((policy) => {
        return (
            <option key={policy.id} value={policy.id}>{policy.typeName}</option>
        )
    })

    
    const url = "https://dot-insure.herokuapp.com/get-quote";
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        state: [],
        localGovernment: [],
        typeOfPolicy: [],
        numberOfLives: []
    })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isThereError, setIsThereError] = useState(true);
    
    // useEffect(() => {
    //     Axios.get(`https://dot-insure.herokuapp.com/lga/list/${formData.state}`)
    //     .then(res => setLga(res.data)).catch(err => console.log(err))
    // },[])

    // console.log(lga)
    // console.log(formData.state)
    console.log(`https://dot-insure.herokuapp.com/lga/list/${formData.state}`)

    const local = `https://dot-insure.herokuapp.com/lga/list/${formData.state}`
    
    useEffect(() => {
        Axios.get(local).then(res => setLga(res.data)).catch(err => console.log(err))
    }, [formData.state])

    let lgas = lga.map((lga) => {
        return (
            <option key={lga.id} value={lga.id}>{lga.name}</option>
        )
    })

    function handleClick(event) {
        const {name, value, type, checked} = event.target
        if (name === 'state') {
            setSelectedState(value)
        }
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value
            }
        })
        // console.log(formData);
    }

    

    function handleSubmit(event) {
        event.preventDefault();
        setFormErrors(validate(formData));
        setIsSubmit(true);
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            Axios.post(url, {
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                state: formData.state,
                lgaId: formData.localGovernment,
                policyTypeId: formData.typeOfPolicy,
                numberOfLives: formData.numberOfLives
            })
            .then(res => {
                console.log(res.data)
                console.log("successfully submited")
                savedd(false);
            })
        } 
    }

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formData)
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
            errors.firstName = 'Firstname is required!';
        }
        if (!values.lastName) {
            errors.lastName = 'Lastname is required!';
        }
        if (!values.phone) {
            errors.phone = 'Phone number is required!';
        } else if (values.phone.length < 11) {
            errors.phone = 'Phone number cannot be below 11 numbers!'
        } else if (values.phone.length > 11) {
            errors.phone = 'Phone number must not exceed 11 numbers!'
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.address) {
            errors.address = 'This field cannot be empty'
        }
        if (!values.state) {
            errors.state = 'This field cannot be empty'
        }
        if (!values.localGovernment) {
            errors.localGovernment = 'This field cannot be empty'
        }
        if (!values.typeOfPolicy) {
            errors.typeOfPolicy = 'This field cannot be empty'
        }
        if (!values.numberOfLives) {
            errors.numberOfLives = 'This field cannot be empty'
        }
        return errors;
    }

    const errorMessage = Object.keys(formErrors).length === 0 && isSubmit



    return (
        <div className={styles.backgroundColor}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <span className={styles.span}>Get Quote</span>
                    <button onClick={cancel} className={styles.btn}>X</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputSectionOne}>
                        <div className={styles.inputSection}>
                            <label className={styles.label} htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleClick}
                                className={styles.input}
                                
                            />
                            <p className={styles.errorMessage}>{formErrors.firstName}</p>
                        </div>
                        <div className={styles.inputSection}>
                            <label className={styles.label} htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleClick}
                                className={styles.input}
                                
                            />
                            <p className={styles.errorMessage}>{formErrors.lastName}</p>
                        </div>
                        <div className={styles.inputSection}>
                            <label className={styles.label} htmlFor="phone">Phone Number</label>
                            <input 
                                type="text" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleClick}
                                className={styles.input}
                                
                            />
                            <p className={styles.errorMessage}>{formErrors.phone}</p>
                        </div>
                        <div className={styles.inputSection}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleClick}
                                className={styles.input}
                                
                            />
                            <p className={styles.errorMessage}>{formErrors.email}</p>
                        </div>
                    </div>
                    <div className={styles.inputSectionTwo}>
                        <label className={styles.label} htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleClick}
                            className={styles.addressInput}
                            
                        />
                        <p className={styles.errorMessage}>{formErrors.address}</p>
                    </div>
                    <div className={styles.inputSectionThree}>
                        <div className={styles.state}>
                            <label className={styles.label} htmlFor="state">State</label>
                            <br />
                            <select 
                                id="state"
                                name="state" 
                                value={formData.state}
                                onChange={handleClick}
                                className={styles.select}
                                required
                            >
                                <option value="">Select State</option>
                                {/* {listOfState} */}
                                {states}
                            </select>
                            <p className={styles.errorMessage}>{formErrors.state}</p>
                        </div>
                        <div className={styles.localGovernment}>
                            <label className={styles.label} htmlFor="localGovernment">Local Government</label>
                            <br />
                            <select 
                                id="localGovernment"
                                name="localGovernment" 
                                value={formData.localGovernment}
                                onChange={handleClick}
                                className={styles.select}
                                required
                                // placeholder="Select Local Government"
                            >
                                <option value="">Select Local Government</option>
                                {/* {
                                    selectedState ? NaijaStates.all().find((state) => state.state === selectedState).lgas.map((lga) => (
                                        <option key={lga} value={lga}>{lga}</option>
                                    ))
                                    : null} */}

                                {lgas}
                            </select>
                            <p className={styles.errorMessage}>{formErrors.localGovernment}</p>
                        </div>
                    </div>
                    <p className={styles.policy}>Policy Information</p>

                        <div className={styles.inputPolicySection}>
                            <div className={styles.typeOfPolicy}>
                                <label className={styles.label} htmlFor="typeOfPolicy">Type of Policy</label>
                                <br />
                                <select 
                                    id="typeOfPolicy"
                                    name="typeOfPolicy" 
                                    value={formData.typeOfPolicy}
                                    onChange={handleClick}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">Select Policy</option>
                                    {policyTypes}
                                </select>
                                <p className={styles.errorMessage}>{formErrors.typeOfPolicy}</p>
                            </div>
                            <div className={styles.numberOfLives}>
                                <label className={styles.label} htmlFor="numberOfLives">Number of Lives</label>
                                <br />
                                <select 
                                    id="numberOfLives"
                                    name="numberOfLives" 
                                    value={formData.numberOfLives}
                                    onChange={handleClick}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">Select Number</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <p className={styles.errorMessage}>{formErrors.numberOfLives}</p>
                            </div>
                        </div>

                    <div className={styles.line}></div>

                    <div className={styles.cancelOrSubmit}>
                        <button type="button" onClick={cancel} className={styles.cancel}>CANCEL</button>
                        {errorMessage
                             ? 
                            <button type="submit" className={styles.submit}>GET A QUOTE</button>
                             : 
                             <button type="submit" className={styles.submit}>GET A QUOTE</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Quote;