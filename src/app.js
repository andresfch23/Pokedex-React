import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/App-router';
import { getPokemons } from './requests/pokemons';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

getPokemons('pikachu');

ReactDOM.render(<AppRouter />, document.getElementById('app'));

// HOME
// 404
// pokemon/id