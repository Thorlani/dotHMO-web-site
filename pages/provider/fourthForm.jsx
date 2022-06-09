import HeroSection from "../../component/hpHeroSection";
import styles from "../../styles/fourthForm.module.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import Image from "next/image";
import ApplicationSubmitted from "./applicationSubmitted";


const FourthForm = () => {

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 3,
        maxSize: 4242880,
        multiple: true,
        accept: {
            'image/png': ['.png', '.jpeg'],
            'text/plain': ['.pdf'],
        }
    });

    console.log(acceptedFiles[0])
  
    const filesAccepted = acceptedFiles.map(file => (
        <li className={styles.li} key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));
    
    

    function handleSubmit(event) {
        event.preventDefault();
        console.log(filesAccepted);
    }


    const [showSubmitted, setShowSubmitted] = useState(false);

    function handleClose() {
        setShowSubmitted(true);
    }

    function handleCloseSubmitted() {
        setShowSubmitted(false);
    }

    return (
        <div className="container">
            <HeroSection />
            <div className={styles.contentSection}>
                <div className={styles.provider}>
                    <p className={styles.title}>upload documents</p>
                    <p className={styles.step}>step 4/4</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.end}>
                    <p className={styles.topic}>Upload the following documents</p>
                    <ul>
                        <li className={styles.uploads}>CAC Registration Certificate</li>
                        <li className={styles.uploads}>Evidence of Registration with the relevant state accreditation agency</li>
                        <li className={styles.uploads}>Certificate of Medical Indemnity Insurance as detailed under section 8 of this agreement</li>
                        <li className={styles.uploads}>Practicing licenses of Professional Staff under your employ</li>
                    </ul>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.wrapper}>
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <div className={styles.flex}>
                                <p className={styles.paragraph1}>Drag & drop file here or </p>
                                <button className={styles.btn}>choose files</button>
                            </div>
                            <p className={styles.paragraph2}>PNG, JPEG & PDF (Max 4mb)</p>
                        </div>
                        <aside>
                            <ul>{filesAccepted}</ul>
                        </aside>
                    </div>

                    <div className={styles.button}>
                        <div className={styles.back}>
                            <Link href="/provider/thirdForm">
                                <a>
                                    <button className={styles.backButton}>Back</button>
                                </a>
                            </Link>
                        </div>
                        <div className={styles.saveAndNext}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button className={styles.save}>SAVE AND CONTINUE LATER</button>
                            <Link href="#">
                                <a>
                                    <button onClick={handleClose} className={styles.submit}>submit</button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
                {showSubmitted && <ApplicationSubmitted close={handleCloseSubmitted} />}
            </div>
        </div>
    );
}
 
export default FourthForm;