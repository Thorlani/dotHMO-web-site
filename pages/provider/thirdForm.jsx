import HeroSection from "../../component/hpHeroSection";
import styles3 from "../../styles/thirdForm.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Axios from "axios"

const ThirdForm = () => {

    const url3 = "https://dot-insure.herokuapp.com/provider/update"
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
    const [formErrors3, setFormErrors3] = useState({});
    const [isSubmit3, setIsSubmit3] = useState(false);
    const [displayNext3, setDisplayNext3] = useState(false);

    function handleChange3(event) {
        const { name, value, type, checked } = event.target
        setFormData3(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
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
            console.log(formData3)
        } else {
            console.log("There is currently an Error Message!")
        }
        if(Object.keys(formErrors3).length === 0 && displayNext3) {
            Axios.patch(url3, {
                facilities: [
                    {
                      wardType: formData3.typeOfWard,
                      numberOfBedsHDU: 0,
                      numberOfBedsICU: 0,
                      features: [
                        {
                          id: 1
                        }
                      ],
                      id: 1
                    }
                  ],
                  id: "string"
            })
        }
    }

    function showButton3() {
        if(isSubmit3 === true && Object.keys(formErrors3).length === 0) {
            setDisplayNext3(true)
        } else {
            setDisplayNext3(false)
        }
    }


    return (
        <div className="container">
            <HeroSection />
            <div className={styles3.contentSection}>
                <div className={styles3.provider}>
                    <p className={styles3.title}>facility information</p>
                    <p className={styles3.step}>step 3/4</p>
                </div>
                <div className={styles3.line}></div>
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
                            <div className={styles3.grid1}>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="ambulance"
                                        checked={formData3.ambulance}
                                        name="ambulance"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="ambulance">Ambulance</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="CTScanMachine"
                                        checked={formData3.CTScanMachine}
                                        name="CTScanMachine"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="CTScanMachine">CT Scan Machine</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="mammogram"
                                        checked={formData3.mammogram}
                                        name="mammogram"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="mammogram">Mammogram</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="haemodialysis"
                                        checked={formData3.haemodialysis}
                                        name="haemodialysis"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="haemodialysis">Haemodialysis</label>
                                </div>
                            </div>
                            <div className={styles3.grid2}>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="twoFourHrAmbulance"
                                        checked={formData3.twoFourHrAmbulance}
                                        name="twoFourHrAmbulance"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="twoFourHrAmbulance">24-hr Ambulance</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="MRIMachine"
                                        checked={formData3.MRIMachine}
                                        name="MRIMachine"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="MRIMachine">MRI Machine</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="UltrasoundScan"
                                        checked={formData3.UltrasoundScan}
                                        name="UltrasoundScan"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="UltrasoundScan">Ultrasound Scan</label>
                                </div>
                            </div>
                            <div className={styles3.grid3}>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="InhouseLaboratory"
                                        checked={formData3.InhouseLaboratory}
                                        name="InhouseLaboratory"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="InhouseLaboratory">In-house Laboratory</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="inhouseXRay"
                                        checked={formData3.inhouseXRay}
                                        name="inhouseXRay"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                        
                                    />
                                    <label className={styles3.label} htmlFor="inhouseXRay">in-house X-Ray</label>
                                </div>
                                <div className={styles3.centralize}>
                                    <input 
                                        type="checkbox"
                                        id="ICU"
                                        checked={formData3.ICU}
                                        name="ICU"
                                        onChange={handleChange3}
                                        className={styles3.input}
                                    />
                                    <label className={styles3.label} htmlFor="ICU">ICU</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles3.button}>
                        <div className={styles3.back}>
                            <Link href="/provider/secondForm">
                                <a>
                                    <button className={styles3.backButton}>Back</button>
                                </a>
                            </Link>
                        </div>
                        <div className={styles3.saveAndNext}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button onClick={showButton3} className={styles3.save}>SAVE AND CONTINUE LATER</button>
                            { 
                                Object.keys(formErrors3).length === 0 && displayNext3 && <Link href="/provider/fourthForm">
                                    <a>
                                        <button type="submit" className={styles3.next}>Next</button>
                                    </a>
                                </Link>
                            }
                            {/* <Link href="/provider/fourthForm">
                                <a>
                                    <button className={styles3.next}>Next</button>
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