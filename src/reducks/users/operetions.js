//複雑な処理を任せる　redux-thunkで非同期処理を行う場所 actionsを呼び出す

import { signInAction } from "./actions";

//基本的な文法　関数を書く
export const signIn = (email,password) => {
    //引数のdispatchでactionsを呼び出している
    //getStateで現在のstateの値を呼び出すことができる
    return async (dispatch,getState) => {
        const state = getState();
        const isSignedIn = state.users.isSignedIn

        //if(!~)で~じゃなければ
        if(!isSignedIn){
            //emailSignINに実際のfirebaseのログイン関数を書く
            const userData = await emailSignIn(email,password)
            dispatch(signInAction({
                isSignedIn: true,
                uid: "00001",
                username: "takuya",
            }))
        }
    }
}