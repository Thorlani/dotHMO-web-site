import HeroSection from "../../component/hpHeroSection";
import styles from "../../styles/thirdForm.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ThirdForm = () => {

    const [formData3, setFormData3] = useState({
        typeOfWard: "",
        typeOfWardTwo: "",
        noOfBedInHDU: "",
        noOfBedInICU: "",
        noOfBedInHDUTwo: "",
        noOfBedInICUTwo: "",
        ambulance: false,
        CTScanMachine: false,
        mammogram: false,
        haemodialysis: false,
        twoFourHrAmbulance: false,
        MRIMachine: false,
        UltrasoundScan: false,
        InhouseLaboratory: false,
        inhouseXRay: false,
        ICU: false,
    })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [displayNext, setDisplayNext] = useState(false);

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData3(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }


    function errorCkecker(validate) {
        const error = {};

        if(!validate.noOfBedInHDU) {
            error.noOfBedInHDU = "Please enter number of beds in HDU";
        }
        if(!validate.noOfBedInICU) {
            error.noOfBedInICU = "Please enter number of beds in ICU";
        }
        return error;
    }

    function handleSubmit(event) {
        event.preventDefault()
        setFormErrors(errorCkecker(formData3))
        setIsSubmit(true)
        if(displayNext === true) {
            console.log(formData3)
        } else {
            console.log("There is currently an Error Message!")
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
                    <p className={styles.title}>facility information</p>
                    <p className={styles.step}>step 3/4</p>
                </div>
                <div className={styles.line}></div>
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
            </div>
        </div>
    );
}
 
export default ThirdForm;