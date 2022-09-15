import './App.css';

import {Route,Switch} from 'react-router-dom'
import Welcome from './components/welcome/Welcome.jsx'
import Home from './components/home/home.jsx'
import NavBar from './components/nav-bar/NavBar.jsx';
import Country from './components/country/Country.jsx';
import CreateActivity from './components/create-activity/CreateActivity.jsx'

function App() {
  return (
    <>
    <Switch>

      <Route exact path={'/'} render={()=><Welcome/>}/>
      <Route path={'/home'} render={()=><>
        <NavBar/>
        <Home/>
      </>}/>
      <Route path={'/country/:id'} render={()=><>
        <NavBar/>
        <Country/>
      </>}/>
      <Route path={'/create-activity'} render={()=><>
        <NavBar/>
        <CreateActivity/>
      </>}/>
      <Route path={''} render={()=><h1>Error Page no Found</h1>}/>
    </Switch>
    </>
  );
}

export default App;
