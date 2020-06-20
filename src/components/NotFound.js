import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import pokeBallImage from '../assets/images/pokeball.png';
import sadPikachu from '../assets/images/sad.png';

const NotFound = ({ type='Page'  }) => (
    <div className='not-found'>
        {/* <Image 
            src={sadPikachu}
        /> */}
        <h2>SORRY</h2>

        <span>
            4
        </span>
        <Image 
            src={sadPikachu}
            optionalClassContainer={'not-found__image-container'}
            optionalClassImage={'not-found__image'}
            alt='pokeball image'
        />
        <span>4</span>

        <p className='not-found__text'>{type} not found</p>

        <Link to='/'>
            <button className='not-found__button'>Back to Home</button>
        </Link>
    </div>
);

export default NotFound;