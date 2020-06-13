import { actionTypesPokemon } from '../../globalVars';
import { fetchInitialInfo } from '../../requests/pokemons';

const {
    ADD_POKEMONS_SUCCESS,
    ADD_POKEMONS_STARTED,
    ADD_POKEMONS_FAILURE
} = actionTypesPokemon;

export const addPokemons = () => {
    return dispatch => {
        dispatch(addPokemonsStarted());

        fetchInitialInfo().then(res => {
            dispatch(addPokemonsSuccess(res));
        })
        .catch(err => {
            dispatch(addPokemonsFailure(err))
        });   
    }
}

const addPokemonsSuccess = (pokemons) => ({
    type: ADD_POKEMONS_SUCCESS,
    pokemons
});

const addPokemonsStarted = () => ({
    type: ADD_POKEMONS_STARTED,
});

const addPokemonsFailure = ({ err }) => ({
    type: ADD_POKEMONS_FAILURE,
    err
});

