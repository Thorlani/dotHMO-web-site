import styles from "../../styles/findProvider.module.css"
import Image from "next/image"
import { useState, useEffect } from "react";
import Axios from "axios";

const FindProvider = () => {

    const [searchResult, setSearchResult] = useState([]);

    
    useEffect(() => {
        Axios.get(`https://dot-insure.herokuapp.com/provider/search/${provider.hospitalSearch}`)
        .then(res => {
            setSearchResult(res.data);
            console.log("Here is your results")
        }).catch(err => {
            console.log(err);
        })
    }) 

    const [display, setDisplay] = useState(true);

    const [provider, setProvider] = useState({
        hospitalSearch: "",
    });

    function handleChange(event) {
        setProvider(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    function onSearch(event) {
        event.preventDefault();
    }

    function displayChange() {
        setDisplay(!display);
    }

    
    return (
        <div className={styles.FindProviderContainer}>
            <div className={styles.FindProviderHeader}>
                <div className={styles.FindProviderHeaderLeft}>
                    <h1 className={styles.h1}>Find Health Provider</h1>
                    {/* <p className={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, egestas fermentum tincidunt tellus sed vitae massa. Ultricies dignissim aliquet egestas suspendisse proin integer duis dignissim faucibus.
                    </p> */}
                </div>
                <div className={styles.FindProviderHeaderRight}>
                    <Image src="/hospital-building.svg" width="600" height="400" alt="Image of hospital building" />
                </div>
            </div>
            <div className={styles.FindProviderBody}>
                <form className={styles.FindProviderBodyContent} onSubmit={onSearch}>
                    <input 
                        type="search" 
                        placeholder="🔍 Search for hospitals, pharmacies, dentist etc"
                        name="hospitalSearch"
                        onChange={handleChange}
                        value={setProvider.hospitalSearch}
                        className={styles.input}
                     />
                    <button className={styles.btn} onClick={displayChange}>Search</button>
                </form>
                <div className={display ? styles.noResults : styles.results}>
                    {searchResult.filter((val) => {
                        if (provider.hospitalSearch == "") {
                            return val
                        } else if (val.hospital_name.toLocaleLowerCase().includes(provider.hospitalSearch.toLocaleLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return (
                            <div className={styles.searchResult} key={key}>
                                <div className={styles.searchResultLeft}>
                                    <h2 className={styles.searchResultTitle}>{val.company_name}</h2>
                                    <span className={styles.searchResultSpan}>Hospital</span>
                                </div>
                                <div className={styles.searchResultRight}>
                                    <div className={styles.searchResultRightTop}>
                                        <div className={styles.searchResultRightTopLeft}>
                                            <div className={styles.searchResultRightTopLeftOne}>
                                                <div className={styles.dotOne}></div>
                                                <p className={styles.locationOne}>{val.city}</p>
                                            </div>
                                        </div>
                                        <div className={styles.searchResultRightTopRight}>
                                            <div className={styles.dotTwo}></div>
                                            <p className={styles.locationTwo}>{val.country}</p>
                                        </div>
                                    </div>
                                    <button className={styles.getDirection}>Get Direction</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default FindProvider;