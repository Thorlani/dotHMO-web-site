import HeroSection from "../../component/hpHeroSection";
import styles4 from "../../styles/fourthForm.module.css";
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

    // console.log(acceptedFiles[0])
  
    const filesAccepted = acceptedFiles.map(file => (
        <li className={styles4.li} key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));
    
    

    function handleSubmit4(event) {
        event.preventDefault();
        console.log(filesAccepted);
    }


    const [showSubmitted, setShowSubmitted] = useState(false);

    function handleClose4() {
        setShowSubmitted(true);
    }

    function handleClose4Submitted() {
        setShowSubmitted(false);
    }

    return (
        <div className="container">
            <HeroSection />
            <div className={styles4.contentSection}>
                <div className={styles4.provider}>
                    <p className={styles4.title}>upload documents</p>
                    <p className={styles4.step}>step 4/4</p>
                </div>
                <div className={styles4.line}></div>
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
                                <p className={styles4.paragraph1}>Drag & drop file here or </p>
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
                            <Link href="/provider/thirdForm">
                                <a>
                                    <button className={styles4.backButton}>Back</button>
                                </a>
                            </Link>
                        </div>
                        <div className={styles4.saveAndNext}>
                            <Image src="/save.svg" width="18" height="18" />
                            <button className={styles4.save}>SAVE AND CONTINUE LATER</button>
                            <Link href="#">
                                <a>
                                    <button onClick={handleClose4} className={styles4.submit}>submit</button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
                {showSubmitted && <ApplicationSubmitted close={handleClose4Submitted} />}
            </div>
        </div>
    );
}
 
export default FourthForm;