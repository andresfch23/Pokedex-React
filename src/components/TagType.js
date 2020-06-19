import React from 'react';

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