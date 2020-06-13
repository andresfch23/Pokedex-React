import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addPokemons } from './redux/actions/pokemons';
import { addTypes } from './redux/actions/types';
import AppRouter from './router/App-router';
import configureStore from './redux/store/store';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// Fetching the initial data and type of pokemons
// store.dispatch(addPokemons());
store.dispatch(addTypes());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));