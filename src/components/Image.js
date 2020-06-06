import React from 'react';

const Image = ({ src, optionalClassImage='', optionalClassContainer='', alt='A pokemon' }) => {
    return (
        <div className={optionalClassContainer}>
            <img src={src} className={optionalClassImage} alt={alt} />
        </div>
    );
};

export default Image;