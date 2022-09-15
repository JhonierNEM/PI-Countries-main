import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from '../reducer';
import thunk from   'redux-thunk'

const composeEnhacers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    rootReducer,
    composeEnhacers(applyMiddleware(thunk)),
)

export default store;