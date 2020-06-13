import { actionTypes } from '../../globalVars';
import { fetchTypePokemons } from '../../requests/pokemons';

const {
    ADD_TYPES_STARTED,
    ADD_TYPES_SUCCESS,
    ADD_TYPES_FAILURE
} = actionTypes;

export const addTypes = () => {
    return dispatch => {
        dispatch(addTypesStarted());

        fetchTypePokemons()
        .then(res => {

            const names = res.reduce((acc, type) => {
                acc.push(type.name);
                return acc
            }, []);

            dispatch(addTypesSuccess(names));
        })
        .catch(error => {
            dispatch(addTypesFailure(error))
        });
    }
}

const addTypesStarted = () => ({
    type: ADD_TYPES_STARTED
});

const addTypesSuccess = types => ({
    type: ADD_TYPES_SUCCESS,
    types
});

const addTypesFailure = ({ error }) => ({
    type: ADD_TYPES_FAILURE,
    error
});