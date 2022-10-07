import axios from "axios";

let requestApi = false;

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ALL_COUNTRIES = "SEE_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_ACTIVITIES = "GET_ACTIVITIES";

export const SET_LOADING = "SET_LOADING";

export const getCountries = (send = false) => {
  if (send) {
    return function (dispatch) {
      dispatch(setLoading(true));
      return axios("http://localhost:3001/countries").then((response) => {
        dispatch(setLoading(false));
        if (!requestApi) {
          dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
          requestApi = true;
        }
        dispatch({ type: GET_COUNTRIES, payload: response.data });
      });
    };
  }
};

export const getCountryDetail = (id) => {
  return function (dispatch) {
    //dispatch(setLoading(true));

    return axios(`http://localhost:3001/countries/${id}`).then((response) => {
      dispatch({ type: GET_COUNTRY_DETAIL, payload: response.data[0] });
      //dispatch(setLoading(false));
    });
  };
};

export const getCountriesSearched = (value) => {
  return function (dispatch) {
    dispatch(setLoading(true));
    return axios(`http://localhost:3001/countries?name=${value}`).then(
      (response) => {
        dispatch({ type: GET_COUNTRIES, payload: response.data });
        dispatch(setLoading(false));
      }
    );
  };
};

export const getActivities = () => {
  return function (dispatch) {
    return axios("http://localhost:3001/activities").then((response) =>
      dispatch({ type: GET_ACTIVITIES, payload: response.data })
    );
  };
};

export const setLoading = (value) => {
  return {
    type: SET_LOADING,
    payload: value,
  };
};
