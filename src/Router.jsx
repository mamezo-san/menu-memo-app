//実際にURLに応じてページを変更しているコンポーネント

import React from 'react';
import { Route,Switch } from 'react-router';
import { Home,Login,SignUp } from './templates/index';

const  Router = () => {
  return(
    <Switch>
        {/* exactがないと部分一致でもコンポーネントを表示する */}
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="(/)?" component={Home} />
    </Switch>
  );
};

export default Router;