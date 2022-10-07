import React from "react";

import { NavLink } from "react-router-dom";
import styles from "./CountryCard.module.css";

export default function CountryCard({flag,id,name}) {
    return<div className={styles.card} >
         <NavLink to={`/country/${id}`} className={styles.link}> 
            <img src={flag} alt={id} className={styles.image}/>
         </NavLink> 
    </div>
}