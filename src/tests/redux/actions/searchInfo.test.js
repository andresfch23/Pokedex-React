import { addFilterValue, addFilteredPokemons, selectedPokemon } from '../../../redux/actions/searchInfo';
import { pokemons } from '../data';
import { actionTypesFilterInfo } from '../../../globalVars';

const { 
    ADD_FILTER_VALUE,
    ADD_FILTERED_POKEMONS,
    ADD_SELECTED_POKEMON
} = actionTypesFilterInfo;

describe('SearchInfo actions', () => {
    it('Should add the filter value', () => {
        const filterValue = 'testing';
        const action = addFilterValue(filterValue);

        expect(action).toEqual({
            type: ADD_FILTER_VALUE,
            filterValue
        })
    });

    it('Should add the filtered pokemons', () => {
        const action = addFilteredPokemons(pokemons);

        expect(action).toEqual({
            type: ADD_FILTERED_POKEMONS,
            filteredPokemons: pokemons
        })
    });

    it('Should add the selected pokemon', () => {
        const action = selectedPokemon(pokemons[0]);

        expect(action).toEqual({
            type: ADD_SELECTED_POKEMON,
            selectedPokemon: pokemons[0]
        })
    });
});