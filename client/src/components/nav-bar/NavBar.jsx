import React from "react";

import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css'

export default function NavBar(){

    
    return<div className={styles.navbar}>
        <NavLink to={'/'}
            className={()=>styles.link}
        ><h1>Countries App</h1></NavLink>
        <ul className={styles.nav}>

            <li><NavLink to={'/home'}
                className={()=>styles.link}
            >Home</NavLink></li>

            <li><NavLink to={'/create-activity'}
                className={()=>styles.link}
            >Create Activity</NavLink></li>
        </ul>
    </div>
}