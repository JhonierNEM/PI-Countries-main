const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getCountriesApi, getCountriesByQuery, setActivity, getCountry, addCountriesToDataBase, getCountriesDB } = require('./utils/index.js');

let requestApi = false;

const router = Router();
router.get('/countries/:id',async(req,res)=>{
    const {id} = req.params;
    try{ 
        let response = await getCountry(id);
        return res.json(response);
    }catch (error) {
        res.status(400).json({error});
    }
})

router.get('/countries',async (req,res)=>{
    const {name} = req.query;
    if(name && requestApi){
        try {
            let countries = await getCountriesByQuery(name)
            if (countries) return res.status(200).json(countries)
            else return res.status(404).json({msg:'No Matches Found'})
        } catch (error) {
            res.status(400).json({err:'we do not know what happens'})
        }
    }else if(!requestApi){
        try {
            let countries = await getCountriesApi();
            await addCountriesToDataBase(countries);
            let countriesOfDB = await getCountriesDB();
            if (countriesOfDB) {
                requestApi = true;
                return res.send(countries);
            } 
        } catch (error) {
            res.status.json({err:error})
        } 
    }else res.status(400).json({msg:'Request was not made'})
})

router.post('/activities',async(req,res)=>{
    const {activity,countries} = req.body;
    try {
        let response = await setActivity(activity,countries)
        return res.send(response ? 'Successfully Create':'not Create')
    } catch (error) {
        res.sendStatus(400);
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
