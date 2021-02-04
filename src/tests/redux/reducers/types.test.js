import typesReducer from '../../../redux/reducers/types';
import { actionTypes } from '../../../globalVars';
import { pokemons } from '../data';

const {
    ADD_TYPES_STARTED,
    ADD_TYPES_SUCCESS,
    ADD_TYPES_FAILURE
} = actionTypes;

const initialState = {
    loading: false,
    listTypes: [],
    error: null
};

const types = [
    'normal',
    'fairy'
];

describe('Pokemon Types reducer', () => {
    it('Should set default state', () => {
        const state = typesReducer(initialState, { type: '@INIT' });

        expect(state).toEqual(initialState);
    });

    it('Should execute the starting of the request', () => {
        const action = {
            type: ADD_TYPES_STARTED,
        }
        
        const state = typesReducer(initialState, action);

        expect(state).toEqual({
            error: null,
            loading: true,
            listTypes: []
        });
    });

    it('Should execute the success of the request', () => {
        const action = {
            type: ADD_TYPES_SUCCESS,
            types
        }
        
        const state = typesReducer(initialState, action);

        expect(state).toEqual({
            error: false,
            loading: false,
            listTypes: types
        });
    });

    it('Should execute the failure of the request', () => {
        const action = {
            type: ADD_TYPES_FAILURE,
            error: 'error'
        };
        
        const state = typesReducer(initialState, action);

        expect(state).toEqual({
            error: action.error,
            loading: false,
            listTypes: []
        });
    });
});