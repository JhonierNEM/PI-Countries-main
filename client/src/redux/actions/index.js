import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";

export const getCountries = ()=>{
    return function (dispatch) {
        return axios('http://localhost:3001/countries')
        .then(response => dispatch({type:GET_COUNTRIES,payload:response.data}))
    }
}