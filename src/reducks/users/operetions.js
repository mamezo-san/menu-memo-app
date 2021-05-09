//複雑な処理を任せる　redux-thunkで非同期処理を行う場所 actionsを呼び出す

import { signInAction, signOutAction,fetchMenusAction,deleteMenuAction,searchMenusAction } from "./actions";
import { push } from 'connected-react-router';
import { auth,db,FirebaseTimestamp } from '../../firebase/index';
import { PostAdd } from "@material-ui/icons";

// require('dotenv').config();

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
                            username: data.username,
                            // menus: data.menus
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

export const updateUser = (userId,name,email) => {
    return async(dispatch) => {
        // validate
        if(name === "" || email === ""){
            alert("未入力の欄があります")
            return false
        }

        const timeStamp = FirebaseTimestamp.now();

        const data = {
            name: name,
            email: email,
            update_at: timeStamp
        }

        return db.collection('users').doc(userId).set(data,{merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
};

//Menu作成
export const saveMenus = (id,name,description,category,images,word) => {
    return async(dispatch,getState) => {

        const uid = getState().users.uid;


        //validate
        if(name === "" || description === "" || category === ""){
            alert("未入力の項目があります")
            return false
        }

        const timeStamp = FirebaseTimestamp.now();

        
        function strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k,v] of strMap) {
              obj[k] = v;
            }
            return obj;
          }
    
        console.log(word);

        const objectWord = strMapToObj(word)
        console.log(objectWord);

        const data = {
            name: name,
            word: objectWord,
            description: description,
            category: category,
            updated_at: timeStamp,
            images: images,
        }

        // debugger

        //ここは新規作成の時だけ実行する処理
        //doc()で引数に何も渡さないとidが自動採番される
        if(id === ""){
            const ref = db.collection('users').doc(uid).collection('menus').doc();
            //上記で採番されたidを取り出していdataに入れている
            id = ref.id
            data.id = id
            data.created_at = timeStamp
        }

        //setの第二引数に{merge: true}を渡すことで変更されたところだけを更新する
        //上記のidを指定してdataをdbに保存している
        return db.collection('users').doc(uid).collection('menus').doc(id).set(data, {merge: true})
            .then(()=> {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
};

//リスト表示するためのメソッド
export const fetchMenus = (category) => {
    return async(dispatch,getState) => {

        const uid = getState().users.uid;

        //orderByはソートするメソッド引数は1.並び替えの基準2.降順、昇順か
        let query = db.collection('users').doc(uid).collection('menus').orderBy('updated_at','desc')
        query = (category !== "" && category !== undefined )? query.where("category", "==", category) : query
            query.get()
                 .then(snapshots => {
                    const menusList = []
                    snapshots.forEach(snapshot => {
                        const menu = snapshot.data();
                        menusList.push(menu)
                    })
                    dispatch(fetchMenusAction(menusList))
                })
    }
}

//メニューを削除するためのメソッド
export const deleteMenu = (id) => {
    return async(dispatch,getState) => {

        const uid = getState().users.uid;

        db.collection('users').doc(uid).collection('menus').doc(id).delete()
            .then(()=> {
                //getStateは現在のstoreのstate情報をoperation内で取得できる
                //prevMenusに現在のmenusの情報を入れている
                const prevMenus = getState().users.menus;
                //filterでmenusのidが削除したいidとは別のものを新たに作成している
                const nextMenus = prevMenus.filter(menu => menu.id !== id)
                dispatch(deleteMenuAction(nextMenus))
        })
    }
}

//メニュー検索
export const searchMenus = (search) => {
    return async(dispatch,getState) => {
        const uid = getState().users.uid;


        //error　検索が二文字などだと表示されない　=> searchGrumで作成される一文字の単語が問題？
        let searchGrums = [];
        const nGrum = (name,n) => {
            for(let i=0; i<name.length; i++){
                const results = [name.substr(i,n)]
                results.map(result => {
                    return searchGrums.push(result)
            })}
        };
        nGrum(search,2);
        // nGrum(search,3);
        searchGrums = searchGrums.filter(searchGrum => {
            return searchGrum.length > 1 
        });
        console.log(searchGrums);

        //orderByはソートするメソッド引数は1.並び替えの基準2.降順、昇順か
        let query = db.collection('users').doc(uid).collection('menus').limit(30);
        //searchGrumはおけ　やはりwordをmap形で保存して...
        searchGrums.forEach(searchGrum => {
            query = (search !== "" && search !== undefined )? query.where(`word.${searchGrum}`, "==", true) : query
            query.get()
                 .then(snapshots => {
                    const menusList = []
                    snapshots.forEach(snapshot => {
                        const menu = snapshot.data();
                        menusList.push(menu)
                        console.log(menusList);
                    })
                    dispatch(searchMenusAction(menusList))
                })
                
                })

    }
};

export const sendSlack = (name,email,description) => {
    return async(dispatch) => {
        //validate 
        if(name === "" || email === "" || description === ""){
            alert ("未入力の欄があります")
            return false 
        }
        //validate email形式確認追加

        const payload = {
            text: "menu-memo-appよりメッセージがありました\n"+
                  "お名前：" + name + '\n'+
                  "email：" + email + '\n'+
                  "本文：" + description
        };
        //下記はプライベートのためgitにあげる際は環境変数の設定を行う
        const url = process.env.REACT_APP_slack_key;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert("slackでメッセージを送信しました")
            
        })
    }
}
