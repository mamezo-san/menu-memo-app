import { createSelector } from 'reselect';

//(state)は全体のstateのこと
const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUsername = createSelector(
    [usersSelector],
    state => state.username
)

export const getUserId = createSelector(
    //引数を２とる
    [usersSelector],
    //ここでのstateはuserSelectorの返す値（ここではusers)のことを指す
    //state.uid = state.users.uidということ
    state => state.uid
);

//getUserIdを使用すると現在のusersのuidを取り出すことができる