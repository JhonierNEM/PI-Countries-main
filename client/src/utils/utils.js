import axios from "axios";

export const searchName = (element, elements) => {
  let value = elements.filter((x) => x.id === element);
  return value;
};

export const postActivities = (postActivities) => {
  postActivities.forEach(async(element) => {
      await axios.post(`http://localhost:3001/activities`, element)
      .then((res)=>res.data?true:false);
  });
};

export const getOtherAttributes = async (id)=>{
  return await axios(`https://restcountries.com/v3/alpha/${id}`)
  .then(({data})=>{
    return{
      official:data?.name?.official,
      mapLink: data?.maps ? data?.maps?.openStreetMaps:'No Found'
    }
  })
}

export const filterCountries = (countries,continent,orderBy)=>{
  let newCountries = countries;

  if (continent) newCountries = countries.filter(element=>element.continent === continent);
  
  switch (orderBy) {
    case 'A-Z':
      return newCountries.sort((a,b)=>a.name.localeCompare(b.name))
    
      case 'Z-A':
        return newCountries.sort((a,b)=>a.name.localeCompare(b.name)).reverse()

      case 'Major':
        return newCountries.sort((a,b)=>{return b.population - a.population})

      case 'Minor':
        return newCountries.sort((a,b)=>{return b.population - a.population}).reverse()
    default:
      return newCountries;
  }
}