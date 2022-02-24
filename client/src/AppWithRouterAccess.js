import React from 'react';
import { Box } from '@material-ui/core';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

//component import
import Header from './components/Header.jsx';
import Home from './components/home/Home.jsx'
import DetailView from './components/post/DetailView.jsx';
import CreateView from './components/post/CreateView.jsx';
import UpdateView from './components/post/UpdateView.jsx';

import Login from './components/account/Login.jsx';
import { oktaAuthConfig, oktaSignInConfig } from './config';

const oktaAuth = new OktaAuth(oktaAuthConfig);


function AppWithRouterAccess() {
    const history = useHistory();

    const customAuthHandler = () => {
        history.push('/login');
    };

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    return (
        // <React.Fragment>
        // <BrowserRouter>
        <Security
            oktaAuth={oktaAuth}
            onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}
        >
            <SecureRoute exact path='/' component={Header} />
            <Box style={{ marginTop: 64 }}>
                <Switch>
                    <Route exact path='/' component={Home} />

                    <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
                    <Route path='/login/callback' component={LoginCallback} />

                    <Route exact path='/details/:id' component={DetailView} />
                    <Route exact path='/create' component={CreateView} />
                    <Route exact path='/update/:id' component={UpdateView} />
                </Switch>
            </Box>
        </Security>
        // </BrowserRouter> 
        // </React.Fragment>  


    );
}

export default AppWithRouterAccess;

