import React,{useState,useEffect} from 'react';
import { getUserId } from '../reducks/users/selectors';
import{ useSelector,useDispatch } from 'react-redux';
import { db } from '../firebase/index';
import { push } from 'connected-react-router';

const UserDetail = () => {

    const dispatch = useDispatch();
  
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);

    const [user,setUser] = useState(null);

    useEffect(()=> {
        db.collection('users').doc(userId).get()
            .then(doc => {
                const data = doc.data();
                setUser(data)
            })
    },[]);

    return(
        // <div>{console.log(user)}</div>
        <section>
            {user && (
                <div>
                    <h2>ユーザー情報</h2>
                    <div>名前：{user.username}</div>
                    <div className="space-small" />
                    <div>メールアドレス：{user.email}</div>
                    <div className="space-small" />
                    <div>パスワード：● ● ● ●</div>
                    <div className="space-medium" />
                    <div onClick={() => dispatch(push("/signin/reset"))}>
                        パスワードをリセットする
                    </div>
                    <div className="space-small" />
                    <div onClick={() => dispatch(push(userId+"/edit"))}>
                        ユーザー情報の変更
                    </div>
                </div>
            )}
        </section>
    )
}

export default UserDetail;