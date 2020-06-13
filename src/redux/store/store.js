import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import pokemonsReducer from '../reducers/pokemons';
import typesReducer from '../reducers/types';
import searchInfoReducer from '../reducers/searchInfo';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            pokemons: pokemonsReducer,
            types: typesReducer,
            searchInfo: searchInfoReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}

