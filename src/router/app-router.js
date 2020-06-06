import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import Home from '../components/Home';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/pokemon/:id" component={Pokemon} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;