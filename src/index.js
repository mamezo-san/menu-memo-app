import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';//#
import createStore from './reducks/store/store'; //#
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as History from 'history'
import { ConnectedRouter } from 'connected-react-router'

//importしたHistoryの中のcreateBrowserHistoryがページ遷移の履歴わかる関数
const history = History.createBrowserHistory();

//storeで定義したcreateStore関数を実行している
export const store = createStore(history);


ReactDOM.render(
  //storeをreactに反映している(そのためのモジュールを#とする)
  //Providerでラップしたコンポーネントにstoreの情報を渡している
  //connect関数(storeの変更、反映)を使えるようにしている
  <Provider store={store}>
    {/* Appコンポーネントで起きたURLの変更を管理できる */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
