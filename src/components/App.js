import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Pokemon from '../components/Pokemon';
import Home from '../components/Home';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

// Redux stuff
import { addPokemons } from '../redux/actions/pokemons';
import { addTypes } from '../redux/actions/types';
console.log('A DIFFERENT MESSAGE');
export const App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(addPokemons());
        dispatch(addTypes());
    }, []);

    console.log("TESTING SOMETHING");
    
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/pokemon/:id" component={Pokemon} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default App;
console.log('NOTHING')
App.propTypes = {
    addPokemons: PropTypes.func,
    addTypes: PropTypes.func
}