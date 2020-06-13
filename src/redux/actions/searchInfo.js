import { actionTypesFilterInfo } from '../../globalVars';

const {
    ADD_FILTERED_POKEMONS,
    ADD_FILTER_VALUE,
    ADD_SELECTED_POKEMON
} = actionTypesFilterInfo;

export const addFilterValue = filterValue => ({
    type: ADD_FILTER_VALUE,
    filterValue
});

export const addFilteredPokemons = filteredPokemons => ({
    type: ADD_FILTERED_POKEMONS,
    filteredPokemons
});

export const selectedPokemon = selectedPokemon => ({
    type: ADD_SELECTED_POKEMON,
    selectedPokemon
});
