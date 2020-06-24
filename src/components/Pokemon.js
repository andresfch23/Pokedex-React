import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Loader from './Loader';
import NotFound from './NotFound';
import PokemonInfo from './PokemonInfo';

// Request and helpers
import { fetchInfoPokemon, fetchImage } from '../requests/pokemons';
import { abbreviateWord, autoScroll } from '../helpers';

class Pokemon extends Component {
    state = {
        pokemonInfo: {},
        notFound: null
    }

    componentDidMount() {
        // Render the info of the pokemon if it exist (when the user comes from home clicking a pokemon),
        // or if doesn't exist a selectedPokemon and the list of all Pokemon exists, the function is
        // executed getting the param of the url and fetching the info 

        if (Object.entries(this.props.selectedPokemon).length > 0) {
            this.getPokemonInfo(true);
        } else if(Object.entries(this.props.selectedPokemon).length === 0 && this.props.pokemons.length > 0) {
            this.getPokemonInfo(false);
        }
    }

    componentDidUpdate(prevProps) {
        // Executing the function when the list of pokemon is ready

        if ((prevProps.pokemons.length === 0 &&
            this.props.pokemons.length > 0) &&
            Object.entries(this.props.selectedPokemon).length === 0
        ) {
            this.getPokemonInfo(false);
        }
    }

    getPokemonInfo = async existSelectedPokemon => {
        const { pokemons } = this.props;
        const { formatedNumber } = this.props.selectedPokemon;
        let pokemonInfo = {};
        let notFound;

        if (existSelectedPokemon) {
            const fullImage = await fetchImage(formatedNumber, 'full');

            pokemonInfo = {...this.props.selectedPokemon, image: fullImage};
            autoScroll()
            notFound = false
        } else {
            const selectedPok = pokemons.find(pokemon => {
                const { pokemon_species: { name } } = pokemon;

                return name === this.props.match.params.id;
            });

            if (selectedPok) {
                pokemonInfo = await fetchInfoPokemon(selectedPok.entry_number, 'full');
                notFound = false;
                
                autoScroll();
            } else {
                notFound = true
            }
        }

        this.setState(() => {
            return {
                pokemonInfo,
                notFound
            }
        });
    }

    finalStats = stats => {
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

    render() {
        const { stats } = this.state.pokemonInfo;

        const finalStats = this.finalStats(stats);

        return (
            <div>
                {
                    (Object.entries((this.state.pokemonInfo).length === 0) && this.state.notFound) ?
                        (
                            <NotFound type='Pokemon' />
                        ) :
                    Object.entries(this.state.pokemonInfo).length === 0 ? 
                        (
                            <Loader 
                                classNameContainerImage='pokemon__loading-image-container'
                                classNameContainerLoader='pokemon__loading'
                                classNameImage='pokemon__loading-image'
                            />
                        ) :
                    (
                        <PokemonInfo 
                            {...this.state.pokemonInfo}
                            finalStats={finalStats}
                            listTypes={this.props.listTypes}
                        />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.listPokemons,
    selectedPokemon: state.searchInfo.selectedPokemon,
    listTypes: state.types.listTypes
});

export default connect(mapStateToProps)(Pokemon);

Pokemon.propTypes = {
    selectedPokemon: PropTypes.object,
    pokemons: PropTypes.array,
    match: PropTypes.object,
    listTypes: PropTypes.array
}