import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noSpecialCharacters } from '../globalVars';
import { fetchPokemons } from '../requests/pokemons';
import { addFilteredPokemons, addFilterValue, selectedPokemon } from '../redux/actions/searchInfo';
import PokemonCard from './PokemonCard';
import Loader from './Loader';

class Home extends Component {
    state = {
        searchVal: this.props.filterValue || '',
        notFound: null,
        loading: false,
        error: ''
    }

    autoScroll = () => {
        setTimeout(() => {
            window.scroll({
                top: 280
            });
        }, 100);
    }

    onChangeInput = e => {
        const value = e.target.value.trim().replace(noSpecialCharacters, '');
        const previousVal = this.state.searchVal;
        const pokemons = this.props.pokemons;
        const duration = 500;

        if (value !== previousVal) {
            
            this.setState(() => ({
                searchVal: value,
                notFound: false
            }));
            
            this.props.addFilterValue(value);

            if (value.length >= 3) {
                this.setState(() => ({
                    loading: value
                }));
            }
            
            clearTimeout(this.inputTimer);
            
            this.inputTimer = setTimeout(() => {

                if (value.length <= 2) {
                    this.props.addFilteredPokemons([]);

                    this.setState(() => {
                        return {
                            loading: false

                        }
                    });
                } else {
                    this.setState(() => ({
                        loading: true,
                    }));
        
                    
                    fetchPokemons(value, pokemons).then(filteredPokemons => {                
                        this.props.addFilteredPokemons(filteredPokemons);
                        
                        this.autoScroll();
                        
                        this.setState(() => {
                            return {
                                loading: false,
                                error: '',
                                notFound: filteredPokemons.length > 0 ? false : true
                            }
                        });
                    }).catch(error => {
                        this.setState(() => {
                            return {
                                error
                            }
                        })
                    });
                    
                }
    
            }, duration);
        }
    }

    onClickPokemon = (info) => {
        this.props.selectedPokemon(info);
    };

    render() {
        const classNamecont = this.state.searchVal.length <= 2 ?
            'pokemons-container-empty' :
            this.props.filteredPokemons.length > 0 ? 'pokemons-container-ready':
            this.state.notFound &&'notFound';

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
                    <div className="home__description-container">
                        <p>Search the pokemon by name or number. You must to writte at least 3 characters to search a pokemon. Example: {`'bul'`} or 001</p>
                    </div>
                </div>

                {this.state.loading && (
                    <Loader 
                        classNameContainerImage='home-loading-image-container'
                        classNameContainerLoader='home-loading'
                        classNameImage='home-loading-image'
                    />
                )}

                <div className={`pokemons-container ${classNamecont}`}>

                    {this.props.filteredPokemons.length > 0 ? (
                        <div>
                            {this.props.filteredPokemons.map((pokemon) => (
                                <PokemonCard key={pokemon.id} info={pokemon} onClickPokemon={this.onClickPokemon} />
                            ))}
                        </div>
                    ) : this.state.notFound ? (
                        <div>
                            <span>We couldn´t find coincidences for a Pokemon with this search {`'${this.state.searchVal}'`}</span>
                        </div>
                    ) : this.state.error && <span>An error ocurred</span>}
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