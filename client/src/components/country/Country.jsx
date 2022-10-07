import React from "react";
import { useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

import styles from './Country.module.css'
import { useEffect } from "react";
import { getCountryDetail, GET_COUNTRY_DETAIL } from "../../redux/actions";

export default function Country() {
    let {id} = useParams();
    let countryDetail = useSelector(state=>state.countryDetail);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountryDetail(id));
        return ()=>{
            dispatch({type: GET_COUNTRY_DETAIL,payload:[]})
        }
    },[])

    return<div className={styles.country}>

        {/* country detail */}
        <div className={styles.countryDetail}>
            <div className={styles.title}> <h1>{countryDetail?.name}</h1></div>
            <div className={styles.img}><img src={countryDetail?.flag} alt={countryDetail?.id} /></div>
            <div className={styles.attributes}>
                <h2>{countryDetail?.capital}</h2>
                <p>Continent: {countryDetail?.continent}</p>
                <p>Subregion: {countryDetail?.subRegion}</p>
                <p>Area: {countryDetail?.area} Km</p>
                <p>Population: {countryDetail?.population} M</p>
            </div>
        </div>

        {/* activities in the country */}
        <div className={styles.activities}>
            <div className={styles.title}>
                <h1>Activities</h1>
            </div>
            <div className={styles.containerTable}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th><th>Difficulty</th><th>Duration</th><th>Season</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countryDetail?.activities && countryDetail?.activities.length > 0?countryDetail?.activities.map((element,i)=><tr key={i}>
                            <td>{element.name}</td>
                            <td>{element.difficulty}</td>
                            <td>{element.duration} h</td>
                            <td>{element.season} </td>
                        </tr>):<tr><td>Without Activities</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}