import React from 'react';
import { Route } from 'react-router-dom';

const ContextRoute = ({ component, context, state, ...rest }) => {
  const Component = component;

  return (
    <Route {...rest}>
      <Component drizzle={context} drizzleState={state} />
    </Route>
  );
};

export default ContextRoute;