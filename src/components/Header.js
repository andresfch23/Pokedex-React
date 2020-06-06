import React from 'react';
import PokemonLogo from '../assets/images/pok-logo.png';
import { headerImages } from '../assets/header-images';
import Image from './Image';

const positionImages = ['left', 'mid-left', 'mid-right', 'right'];

const Header = () => (
    <div className="header">
        <Image
            src={PokemonLogo}
            optionalClassContainer={'header__container header__container--center'}
            optionalClassImage={'header__image header__image--center'}
        />

        {headerImages.map((image, idx) => {
            const classNameImage= `header__container header__container--${positionImages[idx]}`;

            return (
                <Image
                    src={image}
                    idx={idx}
                    optionalClassContainer={classNameImage}
                    optionalClassImage={'header__image'}
                    key={idx}
                />
            )
        })}
    </div>
);

export default Header;