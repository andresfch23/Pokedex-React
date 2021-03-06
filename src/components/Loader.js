import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import pokeBallImage from '../assets/images/pokeball.png';

const Loader = ({ classNameContainerLoader = '', classNameContainerImage = '', classNameImage = '' }) => (
    <div className={classNameContainerLoader}>
        <span>
            L
        </span>
        <Image 
            src={pokeBallImage}
            optionalClassContainer={classNameContainerImage}
            optionalClassImage={classNameImage}
            alt='pokeball image'
        />
        <span>ADING...</span>
    </div>
);

export default Loader;

Loader.propTypes = {
    classNameContainerLoader: PropTypes.string,
    classNameContainerImage: PropTypes.string,
    classNameImage: PropTypes.string
}