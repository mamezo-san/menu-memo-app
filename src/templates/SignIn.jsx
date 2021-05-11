import React,{useState,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../reducks/users/operetions'; 
import { TextInput,PrimaryButton } from '../components/UIkit/index';
import { push } from 'connected-react-router';


const SignIn = () => {

    const dispatch = useDispatch();

    const [email,setEmail] = useState(""),
          [password,setPassword] = useState("");


    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);
    
  return(
    <div>
        <h2 className="text-title-center">サインイン画面</h2>
        <div className="text-line-center">
            <TextInput
                fullWidth={true} label={"メールアドレス"} value={email} rows={1}
                multiLine={false} required={true} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} value={password} rows={1}
                multiLine={false} required={true} type={"password"} onChange={inputPassword}
            />
        </div>
        <div className="text-title-center"> 
            <PrimaryButton
                //onClickでdispatchでoperationsのsignUpに飛ぶ、その時にここで入力されたusernameたちを持って行ってる
                label={"サインイン"}　onClick={() => dispatch(signIn(email,password)) }
            />
        </div>
        <div className="space-small" />
        <div className="text-title-center">
            <p className="sign-click" onClick={() => dispatch(push('/signin/reset'))}>
                パスワードを忘れた方はこちら
            </p>
        </div>
        <div className="text-title-center">
            <p className="sign-click" onClick={() => dispatch(push('/signup'))}>
                アカウントをお持ちで無い方はこちら
            </p>
        </div>
        <div className="space-medium" />
        <div>
            *サンプルemail: sample@yhooo.com
        </div>
        <div>
            *サンプルpassword: 12345678
        </div>
    </div>
  )
}

export default SignIn;