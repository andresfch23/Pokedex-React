import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Pokemon from '../components/Pokemon';
import Home from '../components/Home';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import { addPokemons } from '../redux/actions/pokemons';
import { addTypes } from '../redux/actions/types';

class App extends React.Component {
    componentDidMount() {
        this.props.addPokemons()
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/pokemon/:id" component={Pokemon} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addPokemons: () => dispatch(addPokemons())
});

export default connect(undefined, mapDispatchToProps)(App);