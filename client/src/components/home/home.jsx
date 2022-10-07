import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


import styles from "./Home.module.css";
import CountryCard from "../country/CountryCard.jsx";
import { getCountriesSearched,getActivities, GET_COUNTRIES } from "../../redux/actions/index";
import { filterCountries } from "../../utils/utils";
import { buttonStyle, divStyle } from "../../utils/changeStyles";

function Home() {
  let dispatch = useDispatch();
  const allCountries = useSelector(state=>state.allCountries)
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  let [state, setState] = useState({
    activity: "",
    continent: "",
    orderBy: '',
    page: 1,
    search: "",
  });

  useEffect(() => {
    dispatch(getActivities());
  },[]);

  const pagCountries = () => {
    return countries.slice((state.page - 1) * 10, (state.page - 1) * 10 + 10);
  };

  const nextPage = () => {
    if (countries.length > state.page * 10) {
      document.getElementById("page").value = "";
      setState((previus) => {
        return {
          ...previus,
          page: previus.page + 1,
        };
      });
    }
  };
  const prevPage = () => {
    if (state.page > 1) {
      document.getElementById("page").value = "";
      setState((previus) => {
        return {
          ...previus,
          page: previus.page - 1,
        };
      });
    }
  };

  const nextHandleChange = ({ target }, size) => {
    let pag = parseInt(target.value);

    if (pag > 0 && size > (pag - 1) * 10)
      setState((previus) => {
        return { ...previus, page: pag };
      });
    else document.getElementById("page").value = "";
  };

  const searchHanleChange = ({ target }) => {
    setState((previus) => {
      return { ...previus, page: 1 };
    });

    let value = target.value.toLowerCase().trimStart()
    setState(previus=>{
      return{
        ...previus,
        search:value
      }
    });
    if (!target.value) {
      //dispatch(getCountries(true));
      dispatch({type:GET_COUNTRIES,payload:allCountries})
    }
  };

  const submitSearch = (event) => {
    event.preventDefault();
    if (state.search) dispatch(getCountriesSearched(state.search));
    console.log("here");
  };

  const stateHandleChange =(event)=>{
    event.preventDefault();
    let {target} = event;
    setState(previus=>{
      return{
        ...previus,
        [target.name]: target.value
      }
    })
  }

  const onFilter =(event)=>{
    event.preventDefault();

    if (!state.activity && !state.continent && !state.orderBy) return console.log('No selected options');
    let newCountries;

    if (state.activity){
      let activity = activities.filter(element=>element.name.toLocaleLowerCase() === state.activity.toLocaleLowerCase())
      console.log(activity);
      if (activity&& activity.length>0) {
        newCountries = filterCountries(activity[0].countries,state.continent,state.orderBy)
      }else{
        newCountries = filterCountries(allCountries,state.continent,state.orderBy)
      }
    }else{
      newCountries = filterCountries(allCountries,state.continent,state.orderBy)
    }
    dispatch({type:GET_COUNTRIES,payload:newCountries})
  }

  return (
    <div className={styles.home}>
      {/* filter options */}
      <div className={styles.filterNone} id='filter'>
        {/* back filter */}
        <div className={styles.backFilter}>
          <button
            onClick={(e)=>{
              e.preventDefault()
              divStyle('filter',styles.containerForm,styles.filterNone,false)
              buttonStyle('openFilter',styles.openFilter,styles.filterNone,true)

            }}
          >X</button>
        </div>

        <form className={styles.form}
          onSubmit= {onFilter}
        >
          {/* Activities */}
          <div className={styles.activity}>
            <input
              list="activitiesA"
              id="activity"
              name="activity"
              placeholder="Select Activity"
              value={state.activity}
              onChange={stateHandleChange}
            />
            <datalist id="activitiesA">
              {activities && activities.length > 0 ? (
                activities.map((element,i) =><option key={i} value={element.name} />)
              ) : (
                <option value={"Without Activities"} />
                )}
            </datalist>
          </div>

          {/* Continent */}
          <div className={styles.continent}>
        
              <select name="continent" id="continents"
                value={state.continent}
                onChange={stateHandleChange}
              >
                <option value="">Continent</option>
                <option value="Oceania">Oceania</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
              </select>
            
          </div>

          {/* Order by: A-Z Z-A Major Minor */}
          <div className={styles.orderBy}>
            <label htmlFor="activity">Order By: </label>
            <select name="orderBy" id="orderBy"
              value={state.orderBy}
              onChange={stateHandleChange}
            >
                 <option value="">Order By</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                
                <option value="Major">Major to Minor</option>
                <option value="Minor">Minor to Major</option>
            </select>
          </div>

          {/* button to filter */}
          <div className={styles.buttonFilter}>
            <button type="submit">Filter</button>
          </div>
        </form>
      </div>

      {/* Countries */}

      <div className={styles.main}>
        {/* Search Countries by name */}
        <div className={styles.containerFormTwo}>
          <form className={styles.formTwo} onSubmit={submitSearch}>
            {/* search input */}
            <div className={styles.searchCountry}>
              <input
                type="text"
                placeholder="Search Country"
                value={state.search}
                onChange={searchHanleChange}
              />
            </div>

            {/* search button */}
            <div className={styles.searchButton}>
              <button type="submit">Search</button>
            </div>
          </form>
            
          {/* open filter */}
          <div className={styles.openFilter} id='openFilter'>
            <button
              onClick={(e)=>{
                e.preventDefault()
                divStyle('filter',styles.containerForm,styles.filterNone,true)
                buttonStyle('openFilter',styles.openFilter,styles.filterNone,false)
  
              }}
            >Filter</button>
          </div>
        </div>

        {/*All Countries*/}
        <div className={styles.cardsCountries}>
          {countries && Array.isArray(countries) ? (
            pagCountries().map((country) => (
              <CountryCard
                key={country.id}
                name={country.name}
                id={country.id}
                flag={country.flag}
              />
            ))
          ) : (
            <div>Without Countries </div>
          )}
        </div>

        {/*... */}
        <div className={styles.page}>
          {/*Prevent Page*/}
          <div className={styles.prevent}>
            <button onClick={prevPage}>{"<"}</button>
          </div>

          {/* input page */}
          <div className={styles.inputPage}>
            <input
              type="text"
              name="page"
              id="page"
              placeholder={state.page}
              onChange={(e) => nextHandleChange(e, countries.length)}
            />
          </div>

          {/* next page */}
          <div className={styles.next}>
            <button onClick={nextPage}>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;