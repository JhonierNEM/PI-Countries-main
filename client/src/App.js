import './App.css';

import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {Route,Switch} from 'react-router-dom';
import { getCountries } from './redux/actions';

import Welcome from './components/welcome/Welcome.jsx';
import Home from './components/home/Home.jsx';
import NavBar from './components/nav-bar/NavBar.jsx';
import Country from './components/country/Country.jsx';
import CreateActivity from './components/create-activity/CreateActivity.jsx';
import Loading from './components/loading/Loading';

function App() {
  let request = false;
  let dispatch = useDispatch();
  let loading = useSelector((state)=>state.loading)
  
  useEffect(()=>{
    if (!request) {
      dispatch(getCountries(!request))
      request = true;
    }else{
      console.log('The call has been made');
    }
    return
  },[])

  return (
    <div className='App'>
    <Switch>

      <Route exact path={'/'} render={()=><Welcome/>}/>
      <Route path={'/home'} render={()=><>
        <NavBar/>
        {loading ? <Loading/>:<Home/>}
      </>}/>
      <Route path={'/country/:id'} render={()=><>
        <NavBar/>
        {loading ? <Loading/>:<Country/>}        
      </>}/>
      <Route path={'/create-activity'} render={()=><>
        <NavBar/>
        <CreateActivity/>
      </>}/>
      <Route path={'/loading'} render={()=><Loading/>}/>
      <Route path={'*'} render={()=><h1>Error Page no Found</h1>}/>
        
    </Switch>
    </div>
  );
}

export default App;
