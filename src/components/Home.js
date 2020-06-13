import React, { Component } from 'react';
import { connect } from 'react-redux';
import { combinedRegExp } from '../globalVars';
import { fetchPokemons } from '../requests/pokemons';
import { addFilteredPokemons, addFilterValue, selectedPokemon } from '../redux/actions/searchInfo';
import PokemonCard from './PokemonCard';
import axios from 'axios';

class Home extends Component {
    state = {
        searchVal: this.props.filterValue || '',
        filteredPokemons: [],
        loading: false
    }

    autoScroll = () => {
        setTimeout(() => {
            window.scroll({
                top: 280,
                behavior: "smooth"
            });
        }, 100)
    }

    onChangeInput = e => {
        const value = e.target.value.trim().replace(combinedRegExp, '');
        const previousVal = this.state.searchVal;
        const pokemons = this.props.pokemons;
        
        if (value !== previousVal) {
            this.setState(() => ({
                searchVal: value,
                filteredPokemons: []
            }));
            
            this.props.addFilterValue(value);
            this.props.addFilteredPokemons({});
        }

        if (value.length >= 3) {
            this.setState(() => ({
                loading: true
            }));


            this.autoScroll();

            fetchPokemons(value, pokemons).then(filteredPokemons => {                
                this.props.addFilteredPokemons(filteredPokemons);

                this.setState(() => {
                    return {
                        loading: false
                    }
                });
            });
        }
    }

    onClickPokemon = (info) => {
        this.props.selectedPokemon(info);
    };

    render() {
        return (
            <div className="home">
                <div className="home__search">
                        <input
                            type='text'
                            placeholder="NAME OR NUMBER"
                            value={this.state.searchVal}
                            onChange={this.onChangeInput}
                            className='home__search-input'
                        />
                </div>

                <div className="home__description">
                    <p>Search the pokemon by name or number</p>
                </div>
                <div className={`pokemons-container ${this.props.filteredPokemons.length === 0 ? 'pokemons-container-empty' : 'pokemons-container-ready'}`}>
                    {this.state.loading ? (
                        <h1 className='home-loading'>Loading...</h1>
                    )
                    : this.props.filteredPokemons.length > 0 && (
                        <div>
                            {this.props.filteredPokemons.map((pokemon, id) => (
                                <PokemonCard key={id} info={pokemon} onClickPokemon={this.onClickPokemon} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.listPokemons,
    filterValue: state.searchInfo.filterValue,
    filteredPokemons: state.searchInfo.filteredPokemons.pokemons
});

const mapDispatchToProps = dispatch => ({
    addFilteredPokemons: filteredPokemons => dispatch(addFilteredPokemons(filteredPokemons)),
    addFilterValue: filterValue => dispatch(addFilterValue(filterValue)),
    selectedPokemon: pokemon => dispatch(selectedPokemon(pokemon))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);