//firebase.Observer 認証状態を監視している
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenAuthState } from './reducks/users/operetions';
import { getIsSignedIn } from './reducks/users/selectors';   

//childrenは特別なprops
const Auth = ({children}) => {
    //reduxの関数なのでuseDispatchを使う(?) dispatchとの差異
    const dispatch = useDispatch();

    //storeにあるstateをselectorに入れている
    const selector = useSelector((state) => state);
    //selectorにあるgetIsSignedInを呼び出してstore全体のstateを渡すことでuserのisSignedinの値を得ている
    const isSignedIn = getIsSignedIn(selector);


    //useEffect(()=> {},[])の形でcomponentdidmountと同じことをしている(=returnの後にレンダーを一回している)
    useEffect(() => {
        if(!isSignedIn){
            dispatch(listenAuthState())
        }
    },[]);
//ここでないを行っているか、Authで囲まれたrouterに遷移した場合はサインインしているかを下の文で確認していて
//サインインしていたらchildren(ここではAuthで囲んでいるhome画面)を返し、もしサインインしていない状態であったら
//空の配列を返している<></> その後useEffectでサインインしていない場合が
//listenAuthStateが走り、userが入る場合はホーム画面に行き、ない場合はサインイン画面に遷移する
    if (!isSignedIn) {
        return <></>
    }else{
        return children
    }
}

export default Auth;