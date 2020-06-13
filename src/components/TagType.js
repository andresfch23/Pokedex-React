import React from 'react';

const TagType = ({ type }) => {
    return (
        <div className='type__container'>
            <span
                className={`type__text ${type ? `type__text--${type}` : '' }`}
            >
                {type}
            </span>
        </div>
    )
};  

export default TagType;