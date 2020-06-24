import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Pokemon from '../components/Pokemon';
import Home from '../components/Home';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

// Redux stuff
import { addPokemons } from '../redux/actions/pokemons';
import { addTypes } from '../redux/actions/types';

class App extends React.Component {
    componentDidMount() {
        this.props.addPokemons();
        this.props.addTypes();
    }

    render() {
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
}

const mapDispatchToProps = dispatch => ({
    addPokemons: () => dispatch(addPokemons()),
    addTypes: () => dispatch(addTypes())
});

export default connect(undefined, mapDispatchToProps)(App);

App.propTypes = {
    addPokemons: PropTypes.func,
    addTypes: PropTypes.func
}