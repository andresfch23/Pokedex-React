import searchInfoReducer from '../../../redux/reducers/searchInfo';
import { actionTypesFilterInfo } from '../../../globalVars';
import { pokemons } from '../data';

const {
    ADD_FILTERED_POKEMONS,
    ADD_FILTER_VALUE,
    ADD_SELECTED_POKEMON
} = actionTypesFilterInfo;

const initialState = {
    filterValue: '',
    filteredPokemons: {
        pokemons: []
    },
    selectedPokemon: {}
}

describe('Search reducer', () => {
    it('Should set default state', () => {
        const state = searchInfoReducer(initialState, { type: '@INIT' });

        expect(state).toEqual(initialState);
    });

    it('Should add the filtered Pokemons', () => {
        const action = {
            type: ADD_FILTERED_POKEMONS,
            filteredPokemons: pokemons
        }
        
        const state = searchInfoReducer(initialState, action);

        expect(state.filteredPokemons).toEqual({
           pokemons
        });
    });

    it('Should add the filter value', () => {
        const value = 'pokemon'
        const action = {
            type: ADD_FILTER_VALUE,
            filterValue: value
        }
        
        const state = searchInfoReducer(initialState, action);

        expect(state.filterValue).toEqual(value);
    });

    it('Should add the selected pokemon', () => {
        const action = {
            type: ADD_SELECTED_POKEMON,
            selectedPokemon: pokemons[0]
        }
        
        const state = searchInfoReducer(initialState, action);

        expect(state.selectedPokemon).toEqual(pokemons[0]);
    });
});