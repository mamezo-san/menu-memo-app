import React,{useState,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducks/users/operetions'; 
import { TextInput,PrimaryButton } from '../components/UIkit/index';
import { push } from 'connected-react-router';


const SignUp = () => {

    const dispatch = useDispatch();

    const [username,setUsername] = useState(""),
          [email,setEmail] = useState(""),
          [password,setPassword] = useState(""),
          [confirmPassword,setConfirmPassword] = useState("");

    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    },[setConfirmPassword]);
    
  return(
    <div>
        <h2 className="text-title-center">アカウント作成画面</h2>
        <div className="text-line-center">
            <TextInput
                fullWidth={true} label={"ユーザー名"} value={username} rows={1}
                multiLine={false} required={true} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} value={email} rows={1}
                multiLine={false} required={true} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} value={password} rows={1}
                multiLine={false} required={true} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"確認用パスワード"} value={confirmPassword} rows={1}
                multiLine={false} required={true} type={"password"} onChange={inputConfirmPassword}
            />
        </div>
        <div className="text-title-center">
            <PrimaryButton
                //onClickでdispatchでoperationsのsignUpに飛ぶ、その時にここで入力されたusernameたちを持って行ってる
                label={"アカウントを登録する"}　onClick={() => dispatch(signUp(username,email,password,confirmPassword)) }
            />
        </div>
        <div className="text-title-center">
            <p onClick={() => dispatch(push('/signin'))}>
                アカウントをお持ちの方はここをクリック
            </p>
        </div>
    </div>
  )
}

export default SignUp;