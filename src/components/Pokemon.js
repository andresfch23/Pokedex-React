import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import Loader from './Loader';
import NotFound from './NotFound';
import PokemonInfo from './PokemonInfo';

// Request and helpers
import { fetchInfoPokemon, fetchImage } from '../requests/pokemons';
import { abbreviateWord, autoScroll } from '../helpers';

const Pokemon = (props) => {
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [notFound, setNotFound] = useState(null);
    
    const pokemons = useSelector(state => state.pokemons.listPokemons);
    const selectedPokemon = useSelector(state => state.searchInfo.selectedPokemon);
    const listTypes = useSelector(state => state.types.listTypes);

    useEffect(() => {
        // Render the info of the pokemon if it exist (when the user comes from home clicking a pokemon),
        // or if doesn't exist a selectedPokemon and the list of all Pokemon exists, the function is
        // executed getting the param of the url and fetching the info 

        if (Object.entries(selectedPokemon).length > 0) {
            getPokemonInfo(true);
        } else if (Object.entries(selectedPokemon).length === 0) {
            getPokemonInfo(false);
        }

    }, []);

    useEffect(() => {
        // Executing the function when the list of pokemon is ready
        if (Object.entries(selectedPokemon).length === 0 && pokemons.length > 0) {
            getPokemonInfo(false);
        }

    }, [pokemons]);

    const getPokemonInfo = async existSelectedPokemon => {
        const { formatedNumber } = selectedPokemon;
        let pokemonInfo = {};
        let notFound;

        if (existSelectedPokemon) {
            const fullImage = await fetchImage(formatedNumber, 'full');

            pokemonInfo = {...selectedPokemon, image: fullImage};
            autoScroll()
            notFound = false
        } else {
            if (pokemons.length > 0) {
                const selectedPok = pokemons.find(pokemon => {
                    const { pokemon_species: { name } } = pokemon;
    
                    return name === props.match.params.id;
                });
    
                if (selectedPok) {
                    pokemonInfo = await fetchInfoPokemon(selectedPok.entry_number, 'full');
                    notFound = false;
                    
                    autoScroll();
                } else {
                    notFound = true
                }
            }
        }

        setPokemonInfo(pokemonInfo);
        setNotFound(notFound);
    }

    const finalStats = stats => {
        if (stats) {
            const finalStats = stats.reduce((acc, each) => {
                const { base_stat, stat: { name } } = each;
                const abbreviateStat = abbreviateWord(name);
                const completeName = `${abbreviateStat} (${base_stat})`;

                acc.push({ base_stat, name: completeName });
    
                return acc
            }, []);

            return finalStats;
        }
    }

    const { stats } = pokemonInfo;

    return (
        <div>
            {
                (Object.entries((pokemonInfo).length === 0) && notFound) ?
                    (
                        <NotFound type='Pokemon' />
                    ) :
                Object.entries(pokemonInfo).length === 0 ? 
                    (
                        <Loader 
                            classNameContainerImage='pokemon__loading-image-container'
                            classNameContainerLoader='pokemon__loading'
                            classNameImage='pokemon__loading-image'
                        />
                    ) :
                (
                    <PokemonInfo 
                        {...pokemonInfo}
                        finalStats={finalStats(stats)}
                        listTypes={listTypes}
                    />
                )
            }
        </div>
    )
}

export default Pokemon;

Pokemon.propTypes = {
    selectedPokemon: PropTypes.object,
    pokemons: PropTypes.array,
    match: PropTypes.object,
    listTypes: PropTypes.array
}