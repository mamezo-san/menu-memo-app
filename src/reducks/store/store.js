import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { UserReducers } from '../users/reducers';
// import { MenuReducers } from '../menus/reducers';

//stateの初期状態の管理とapp内で管理しているstateを定めている
export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            //reduxにrouterというstateを作りその値にhistoryを渡している
            router: connectRouter(history),
            users: UserReducers,
            // menus: MenuReducers,
        }),
        //routerをmiddlewareとして使うことの宣言
        applyMiddleware(
            routerMiddleware(history),
            //thunkはredux(actions)で非同期処理を行えるようにするためのもの
            thunk
        )
    );
}

//createStoreの引数に渡しているhistoryはブラウザがどのpathにいたのか、現在どこにいるかの情報を持っているもの