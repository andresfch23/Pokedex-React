import React, { Component } from 'react';
import { fetchInfoPokemon } from '../requests/pokemons';
import { connect } from 'react-redux';
import Image from './Image';

class Pokemon extends Component {
    state = {
        pokemonInfo: {}
    }

    componentDidMount() {
        if (Object.entries(this.props.selectedPokemon).length > 0) {
            this.getPokemonInfo(true);
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.pokemons.length === 0 &&
            this.props.pokemons.length > 0) &&
            Object.entries(this.props.selectedPokemon).length === 0
        ) {
            this.getPokemonInfo(false);
        }
    }

    getPokemonInfo = async existSelectedPokemon => {
        const pokemons = this.props.pokemons;

        let pokemonInfo;

        if (existSelectedPokemon) {
            pokemonInfo = this.props.selectedPokemon;
        } else {
            const selectedPok = pokemons.find(pokemon => {
                const { pokemon_species: { name } } = pokemon;

                return name === this.props.match.params.id;
            });

            pokemonInfo = await fetchInfoPokemon(selectedPok.entry_number);
        }

        this.setState(() => {
            return {
                pokemonInfo
            }
        });
    }

    render() {
        const {
            name,
            image,
            id,
            complementInfo
        } = this.state.pokemonInfo;

        return (
            <div>
                {Object.entries(this.state.pokemonInfo).length === 0 ? 
                    (<h1>LOADING ...</h1>) :
                    (
                        <div>
                            <h1>{name} {`#${id}`}</h1>
                            <Image src={image} alt={name} />
                            <p>{complementInfo}</p>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.listPokemons,
    selectedPokemon: state.searchInfo.selectedPokemon
});

export default connect(mapStateToProps)(Pokemon);