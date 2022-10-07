import {
  GET_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_ALL_COUNTRIES,
  SET_LOADING,
} from "../actions";

const initialState = {
  allCountries: ['cero'],
  countries: [],
  countryDetail: {},
  activities: [],
  loading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };

    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
