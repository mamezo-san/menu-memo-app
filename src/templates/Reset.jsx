import React,{useState,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../reducks/users/operetions'; 
import { TextInput,PrimaryButton } from '../components/UIkit/index';
import { push } from 'connected-react-router';


const Reset = () => {

    const dispatch = useDispatch();

    const [email,setEmail] = useState("");


    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);
    
  return(
    <div>
        <h2 className="text-title-center">パスワードリセット</h2>
        <div className="text-line-center">
            <TextInput
                fullWidth={true} label={"メールアドレス"} value={email} rows={1}
                multiLine={false} required={true} type={"email"} onChange={inputEmail}
            />
        </div>
        <div className="text-title-center">
            <PrimaryButton
                //onClickでdispatchでoperationsのsignUpに飛ぶ、その時にここで入力されたusernameたちを持って行ってる
                label={"パスワードをリセットする"}　onClick={() => dispatch(reset(email)) }
            />
        </div>
        <div className="space-small" />
        <div className="text-title-center">
            <p onClick={() => dispatch(push('/signin'))}>
                ログイン画面に戻る
            </p>
        </div>
    </div>
  )
}

export default Reset;