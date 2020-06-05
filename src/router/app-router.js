import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <header>
                Pokedex
            </header>
            <Route to="/" component={Home} exact/>
            <Route to="/pokemon/:id" component={Pokemon} exact/>
            <Route component={NotFoundPage} />
        </div>
    </BrowserRouter>
);

export default AppRouter;