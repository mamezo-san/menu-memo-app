//複雑な処理を任せる　redux-thunkで非同期処理を行う場所 actionsを呼び出す

import { signInAction, signOutAction } from "./actions";
import { push } from 'connected-react-router';
import { auth,db,FirebaseTimestamp } from '../../firebase/index';

//基本的な文法　関数を書く
// export const signIn = (email,password) => {
    //引数のdispatchでactionsを呼び出している
    //getStateで現在のstateの値を呼び出すことができる
    // return async (dispatch,getState) => {
    //     const state = getState();
    //     const isSignedIn = state.users.isSignedIn

        //if(!~)で~じゃなければ
//         if(!isSignedIn){
//             //emailSignINに実際のfirebaseのログイン関数を書く
//             const userData = await emailSignIn(email,password)
//             dispatch(signInAction({
//                 isSignedIn: true,
//                 uid: "00001",
//                 username: "takuya",
//             }))
//         }
//     }
// }

//認証Auth
export const listenAuthState = () => {
    return async (dispatch) => {
        //auth.onAuthStateChangedでログインしているかどうかを監視している
        return auth.onAuthStateChanged(user => {
            if(user){
                const uid = user.uid
                //dbの中のusersに入っているuidをとってくる　それはsnapshotに入る
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        //dispatchでactionのsignInActionにpayloadを渡している
                        dispatch(signInAction({
                            uid: uid,
                            isSignedInd: true,
                            role: data.role,
                            username: data.username
                            }))
                })
            //userがいなかった場合(ログインしていない)はログイン画面に切り替える
            }else{
                dispatch(push('/signin'))
            }
        })
    }
}

//signin
export const signIn = (email,password) => {
    return async (dispatch) => {
        //validate
        if(email === "" || password === "" ){
            alert ("見入力の欄があります")
            return false
        }
        return auth.signInWithEmailAndPassword(email,password)
            .then(result => {
                const user = result.user

                if(user){
                    const uid = user.uid
                    //dbの中のusersに入っているuidをとってくる　それはsnapshotに入る
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            //dispatchでactionのsignInActionにpayloadを渡している
                            dispatch(signInAction({
                                uid: uid,
                                isSignedInd: true,
                                role: data.role,
                                username: data.username
                            }))

                            dispatch(push('/'))
                        })
                }
            })
    }
} 

//signup
export const signUp = (username,email,password,confirmPassword) => {
    return async (dispatch) => {
        //validate 本当はバリデートを関数で定義して使い回すためのちに改善
        if(username === "" || email === "" || password === "" || confirmPassword === ""){
            alert ("見入力の欄があります")
            return false
        }
        if(password !== confirmPassword ){
            alert("パスワードと確認用パスワードが異なっています")
            return false
        } 
        //firebaseのauthにあるuserを作成するメソッド
        return auth.createUserWithEmailAndPassword(email,password)
            .then(result => {
                // 作成されたresultのなかにuserが入っているのでそれを定数化する
                const user = result.user

                if(user){
                    const uid =user.uid
                    //作成された日時を下記で登録している（.nowで現在の時間で作成される)
                    const timeStamp = FirebaseTimestamp.now()
                    //db登録用のデータを作成している
                    const userInitialData = {
                        created_at: timeStamp,
                        email: email,
                        uid: uid,
                        username: username,
                        update_at: timeStamp,
                        //roleはいらない可能性大
                        role: "customer"
                    }
                    //dbのusersに対して新しいデータを登録する処理
                    //ポイント：docでそのままデータを渡すとauthとdbそれぞれに個別のidが作成されてしまうためdocの引数にuidを渡す
                    //そしてsetにuserInitialDataを渡すと登録される
                    db.collection('users').doc(uid).set(userInitialData)
                    //登録したらホームに戻る処理を記述している
                        .then(() => {
                            dispatch(push('/'))
                        })
                }
            })
    }
}

//signout
export const signOut = () => {
    return async (dispatch) => {
        return auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    }
}

//passwordReset
export const reset = (email) => {
    return async (dispatch) => {
        if(email === ""){
            alert("メールアドレスを入力してください")
        }else{
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('メールアドレスにパスワードリセットのメールをお送りしました')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('パスワードリセットに失敗しました。再度お試しください')
                })
        }
    }
}