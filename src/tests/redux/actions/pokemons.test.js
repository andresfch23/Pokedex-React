import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { addPokemons } from '../../../redux/actions/pokemons';
import { pokemons } from '../data';
import { actionTypesPokemon } from '../../../globalVars';
const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);
const store = mockStore();

describe('Should fetch the pokemon data and store it in redux store', () => {
    
    beforeEach(() => {
        store.clearActions();
    });

    it('Should work',  async () => {
        // mock.onGet('https://pokeapi.co/api/v2/pokedex/1/').reply(200, {
        //     response: {
        //         data: {
        //             pokemon_entries: pokemons
        //         }
        //     }
        // });

        // await store.dispatch(addPokemons()).then(() => {
        //     let expectedActions = [
        //         {
        //             type: actionTypesPokemon.ADD_POKEMONS_STARTED
        //         },
        //         {
        //             type: actionTypesPokemon.ADD_POKEMONS_SUCCESS,
        //             pokemons
        //         }
        //     ];
            
        //     expect(store.getActions()).toEqual(expectedActions)
        // });
        // done();
    });
});