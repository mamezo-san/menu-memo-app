import React,{useState,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducks/users/operetions'; 
import { TextInput,PrimaryButton } from '../components/UIkit/index';


const SignUp = () => {

    const dispatch = useDispatch();

    const [username,setUsername] = useState(""),
          [email,setEmail] = useState(""),
          [password,setPassword] = useState(""),
          [confirmPassword,setConfirmPassword] = useState("");

    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.event)
    },[setUsername]);

    const inputEmail = useCallback((event) => {
    setEmail(event.target.event)
    },[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.event)
    },[setPassword]);

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.event)
    },[setConfirmPassword]);
    
  return(
    <div>
        <h2>アカウント作成画面</h2>
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
        <div>
            <PrimaryButton
                //onClickでdispatchでoperationsのsignUpに飛ぶ、その時にここで入力されたusernameたちを持って行ってる
                label={"アカウントを登録する"}　onClick={() => dispatch(signUp(username,email,password,confirmPassword)) }
            />
        </div>
    </div>
  )
}

export default SignUp;