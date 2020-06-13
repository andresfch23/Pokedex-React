import React from 'react';
import Image from './Image';
import TagType from './TagType';

const PokemonCard = ({ info, onClickPokemon }) => {
    const { 
        species: {
            name
        },
        sprites: {
            front_default
        },
        id,
        types,
        image
    } = info;

    return (
        <div className='pokemon-card'>
            <Image
                src={image}
                alt={`Pokemons ${name}`}
                optionalClassImage='pokemon-card__image'
                optionalClassContainer={'pokemon-card__image-container'}
                linkTo={`pokemon/${name}`}
                onClick={() => onClickPokemon(info)}
            />
            <div className={'pokemon-card__info'}>
                <span className={'pokemon-card__number'}>{`# ${id}`}</span>
                <h1 className='pokemon-card__title'>{name}</h1>

                {types && types.map(each => {
                    const { type: { name } } = each;
                    return <TagType type={name} key={name} />
                })}
            </div>

        </div>
    )
};

export default PokemonCard;