import React from "react";
import { useParams } from "react-router-dom";


export default function Country() {
    let {id} = useParams();
    return<>
        <h1>Country {id}</h1>
    </>
}