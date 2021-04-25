//実際にURLに応じてページを変更しているコンポーネント

import React from 'react';
import { Route,Switch } from 'react-router';
import { MenusList,SignIn,SignUp,Reset,MenusEdit,MenusDetail,UserDetail,UserEdit,MenusHistory } from './templates/index';
import Auth from './Auth';

const  Router = () => {
  return(
    <Switch>
        {/* exactがないと部分一致でもコンポーネントを表示する */}
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signin/reset" component={Reset} />

        {/*認証後しか行わさせたくいない画面をAuthで囲む*/}
        <Auth>
          <Route exact path="(/)?" component={MenusList} />
          {/*editの後に変数(/:id)?をつけることで、idがあったらすでにあるものの編集画面にいき、idなかったら新規作成ページにいく */}
          <Route path="/menus/edit(/:id)?" component={MenusEdit} />
          <Route exact path="/users/:id/menus/:id" component={MenusDetail} />
          <Route exact path="/user/:id" component={UserDetail} />
          <Route exact path="/user/:id/edit" component={UserEdit} />
          <Route exact path="/menus/history" component={MenusHistory} />
        </Auth>
    </Switch>
  );
};

export default Router;