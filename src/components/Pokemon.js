import React, { Component } from 'react';
import { fetchInfoPokemon, fetchImage } from '../requests/pokemons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeHyphen, formatText, chooseWeaknesses, abbreviateWord, autoScroll } from '../helpers';
import TagType from './TagType';
import Image from './Image';
import Loader from './Loader';
import NotFound from './NotFound';
import Chart from './Chart';

class Pokemon extends Component {
    state = {
        pokemonInfo: {},
        notFound: null
    }

    componentDidMount() {
        if (Object.entries(this.props.selectedPokemon).length > 0) {
            this.getPokemonInfo(true);
        } else if(Object.entries(this.props.selectedPokemon).length === 0 && this.props.pokemons.length > 0) {
            this.getPokemonInfo(false);
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
        const {
            species,
            image,
            formatedNumber,
            complementInfo,
            abilities,
            types,
            stats,
            height,
            weight
        } = this.state.pokemonInfo;

        const finalStats = this.finalStats(stats);

        return (
            <div>
                {
                    (Object.entries((this.state.pokemonInfo).length === 0) && this.state.notFound) ?
                    (<NotFound type='Pokemon' />) :
                    Object.entries(this.state.pokemonInfo).length === 0 ? 
                    (
                        <Loader 
                            classNameContainerImage='pokemon__loading-image-container'
                            classNameContainerLoader='pokemon__loading'
                            classNameImage='pokemon__loading-image'
                        />
                    ) :
                    (
                        <div className='pokemon'>
                            <h1 className='pokemon__title'>
                                {removeHyphen(species.name)} <span className='pokemon__title--number'>{`#${formatedNumber}`}</span>
                            </h1>
                            <Image
                                src={image}
                                alt={species.name}
                                optionalClassImage='pokemon__image'
                                optionalClassContainer='pokemon__image-container'
                            />
                            <div className='pokemon__info'>

                                <div className={`pokemon__info-container ${types[0] ? `background--${types[0].type.name}` : ''}`}>    
                                    <p className='pokemon__description'>{formatText(complementInfo, species.name)}</p>

                                    {abilities.length > 0 && (
                                        <div className='pokemon__info-item'>
                                            <h2 className='pokemon__info-title'>Abilities</h2>
                                            {abilities.map(({ ability }, idx) => {
                                                    return (<span className='pokemon__ability' key={idx}>{removeHyphen(ability.name)}</span>)  
                                            })}
                                        </div>
                                        )
                                    }

                                    <div className="pokemon__info-item">
                                        <h2 className='pokemon__info-title'>Weight</h2>
                                        {weight && <span>{weight / 10} kg</span>}
                                    </div>

                                    <div className="pokemon__info-item">
                                        <h2 className='pokemon__info-title'>Height</h2>
                                        {height && <span>{height * 10} cm</span>}
                                    </div>
                                </div>
                                
                                <div className="pokemon__types">
                                    <h2 className="pokemon__types-title">Type</h2>
                                    {
                                        types.map(({ type: { name } }) => {
                                            return (<TagType typePok={name} key={name} type="detail" />)
                                        })
                                    }
                                </div>
                                
                                <div className="pokemon__weaknesses">
                                    <h2 className="pokemon__weaknesses-title">Weaknesses</h2>
                                    {chooseWeaknesses(types, this.props.listTypes).map(weakness => {
                                        return (<TagType typePok={weakness} key={weakness} type="detail" />)
                                    })}
                                </div>

                            </div>

                            {finalStats && (
                                <Chart
                                    data={finalStats}
                                    name={name}
                                    className={`pokemon__chart-wrapper background--${types[0].type.name}-polygon`}
                                />
                            )}

                            <Link to='/' className="pokemon__button-back-container">
                                <button className={`pokemon__button-back background--${types[0].type.name}`}>Explore More Pokemon</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.listPokemons,
    selectedPokemon: state.searchInfo.selectedPokemon,
    listTypes: state.types.listTypes
});

export default connect(mapStateToProps)(Pokemon);