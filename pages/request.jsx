import styles from "../styles/request.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Submitted from "./submitted";

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

const Request = ({ closeModal, savedd }) => {

    function cancel() {
        closeModal(false);
    }

    function submit() {
        savedd(false);
    }

    const url = "https://dot-insure.herokuapp.com/request-call"
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        date: "",
        time: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const hasNoError = Object.keys(formErrors).length === 0 //&& isSubmit


    function handleClick(event) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }
    
    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0) {
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
        if (!values.date) {
            errors.date = 'This field is required'
        }
        if (!values.time) {
            errors.time = 'This field is required'
        }
        return errors;
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
                dateOfCall: formData.date,
                timeOfCall: tConvert(formData.time),
            }).then(res => {
                console.log(res);
                savedd(false);
            }).catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <div className={styles.backgound}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <span className={styles.span}>Request Call</span>
                    <button className={styles.btn} onClick={cancel}>X</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                {/* <form className={styles.form} onSubmit={(e) => {
                    e.preventDefault();
                    console.log('test2')
                }}> */}
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
                        <label className={styles.label} htmlFor="phoneNumber">Phone Number</label>
                        <input 
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleClick}
                            className={styles.input}
                        />
                        <p className={styles.errorMessage}>{formErrors.phone}</p>
                    </div>
                    <div className={styles.inputSection}>
                        <label className={styles.label} htmlFor="emailAddress">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleClick}
                            className={styles.input}
                        />
                        <p className={styles.errorMessage}>{formErrors.email}</p>
                    </div>
                    <div className={styles.inputSection}>
                        <label className={styles.label} htmlFor="dateOfCall">Date of call</label>
                        <input 
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleClick}
                            className={styles.input}
                        />
                        <p className={styles.errorMessage}>{formErrors.date}</p>
                    </div>
                    <div className={styles.inputSection}>
                            <label className={styles.label} htmlFor="timeOfCall">Time of call</label>
                        {/* <Flatpickr
                            options={{
                                enableTime: true,
                                noCalendar: true,
                                // dateFormat: "H:i",
                            }}
                            value={formData.time}
                            onChange={([date]) => {
                            console.log(date.);
                            }}
                        /> */}
                        <input 
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleClick}
                            className={styles.input}
                        />
                        <p className={styles.errorMessage}>{formErrors.time}</p>
                    </div>
                    <div></div>
                    <div className={styles.reverse}>
                        <button className={styles.btn2} onClick={cancel}>Cancel</button>
                        {/* <button type="submit" className={styles.btn3}>Submit</button> */}
                        {hasNoError ? <button type="submit" className={styles.btn3}>Submit</button> : <button type="submit" className={styles.btn3}>Submit</button>}
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Request;