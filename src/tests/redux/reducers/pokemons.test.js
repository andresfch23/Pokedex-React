import pokemonsReducer from '../../../redux/reducers/pokemons';
import { actionTypesPokemon } from '../../../globalVars';
import { pokemons } from '../data';

const {
    ADD_POKEMONS_STARTED,
    ADD_POKEMONS_FAILURE,
    ADD_POKEMONS_SUCCESS
} = actionTypesPokemon;

describe('Pokemons reducer', () => {
    it('Should set default state', () => {
        const state = pokemonsReducer(undefined, { type: '@INIT' });

        expect(state).toEqual({
            error: null,
            loading: false,
            listPokemons: []
        })
    });

    it('Should execute the starting of the request', () => {
        const action = {
            type: ADD_POKEMONS_STARTED,
        }
        
        const state = pokemonsReducer(undefined, action);

        expect(state).toEqual({
            error: null,
            loading: true,
            listPokemons: []
        });
    });

    it('Should execute the success of the request', () => {
        const action = {
            type: ADD_POKEMONS_SUCCESS,
            pokemons
        }
        
        const state = pokemonsReducer(undefined, action);

        expect(state).toEqual({
            error: null,
            loading: false,
            listPokemons: pokemons
        });
    });

    it('Should execute the failure of the request', () => {
        const action = {
            type: ADD_POKEMONS_FAILURE,
            err: 'error'
        };
        
        const state = pokemonsReducer(undefined, action);

        expect(state).toEqual({
            error: action.err,
            loading: false,
            listPokemons: []
        });
    });
});