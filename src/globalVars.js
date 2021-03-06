export const noSpecialCharacters = new RegExp('[^a-zA-Z0-9]', 'gm');

export const noZeroatBegin = new RegExp('^(0*)');

export const actionTypesPokemon = {
    ADD_POKEMONS_SUCCESS: 'ADD_POKEMONS_SUCCESS',
    ADD_POKEMONS_STARTED: 'ADD_POKEMONS_STARTED',
    ADD_POKEMONS_FAILURE: 'ADD_POKEMONS_FAILURE'
};

export const actionTypes = {
    ADD_TYPES_SUCCESS: 'ADD_TYPES_SUCCESS',
    ADD_TYPES_STARTED: 'ADD_TYPES_STARTED',
    ADD_TYPES_FAILURE: 'ADD_TYPES_FAILURE'
};

export const actionTypesFilterInfo = {
    ADD_FILTERED_POKEMONS: 'ADD_FILTERED_POKEMONS',
    ADD_FILTER_VALUE: 'ADD_FILTER_VALUE',
    ADD_SELECTED_POKEMON: 'ADD_SELECTED_POKEMON'
};

export const positionImages = ['left', 'mid-left', 'mid-right', 'right'];