import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <React.Suspense fallback={null}>
        <Component {...props} {...rest} />
      </React.Suspense>
    )}
  />
);

export default PublicRoute;