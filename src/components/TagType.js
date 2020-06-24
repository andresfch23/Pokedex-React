import React from 'react';
import PropTypes from 'prop-types';

const TagType = ({ typePok, type }) => {
    return (
        <div className={`type__container-${type}`}>
            <span
                className={`type__text type__text-${type} ${typePok ? `background--${typePok}` : '' }`}
            >
                {typePok}
            </span>
        </div>
    )
};  

export default TagType;

TagType.propTypes = {
    typePok: PropTypes.string,
    type: PropTypes.string
};