import { actionTypesPokemon } from '../../globalVars';

const {
    ADD_POKEMONS_STARTED,
    ADD_POKEMONS_FAILURE,
    ADD_POKEMONS_SUCCESS
} = actionTypesPokemon;

const initialState = {
    loading: false,
    listPokemons: [],
    error: null
};

const pokemonsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POKEMONS_STARTED:
            return {
                ...state,
                loading: true
            };
        
        case ADD_POKEMONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                listPokemons: action.pokemons
            }
        
        case ADD_POKEMONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.err
            }

        default:
            return state;
    }
};

export default pokemonsReducer;