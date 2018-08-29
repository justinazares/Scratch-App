import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    {/* Finally, catch all unnmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
