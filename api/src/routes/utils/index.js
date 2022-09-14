const {Activity,Country} = require('../../db.js')
const {Op} = require('sequelize');
const { default: axios } = require('axios');

module.exports={
    getCountriesApi: async function() {
        let countries;
        await axios.get('https://restcountries.com/v3/all').then((response)=>{
            countries = response.data.map((element)=>{
                return {
                    id:element?.cca3,
                    name:element?.name.official.toLowerCase(),
                    flag:element?.flags[1],
                    continent: element?.continents[0],
                    capital:element?.capital ?element?.capital[0]:'without capital',
                    subRegion:element?.subregion,
                    area:element?.area,
                    population: element?.population
                }
            })
        })
        return countries;
    },
    getCountry: async function (id) {
        try {
            const country = await Country.findAll({
                where:{
                    id:id
                },
                include:{
                    model: Activity
                }
            })
            if(country) return country
        } catch (error) {
            throw error;
        }
    },
    getCountriesByQuery: async function(name){
        try {
            let countries = await Country.findAll({
                where:{
                    name: {[Op.substring]:name.toLowerCase()}
                }
            })
            return countries;
        } catch (error) {
            throw error;
        }
    },
    setActivity: async function(activity,countries) {
        try {
            if (activity) {
                let act = await Activity.create({...activity})
                act.addCountries([...countries])
                return 'Successfully Create'
            }
        } catch (error) {
            throw error;
        }
    },
    addCountriesToDataBase: async function(countries){
        countries.forEach(async element =>{
                try {
                    if(countries){
                      await Country.create({...element});
                      return {result:true};
                  }
              } catch (error) {
                  throw {err:error,result:false}
              }  
          
        })
    },
    getCountriesDB: async function(){
        try {
            const countries = await Country.findAll()
            if(countries) return countries
        } catch (error) {
            throw error;
        }
    }
}