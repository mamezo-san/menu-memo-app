import React from 'react';
import { useDispatch } from 'react-redux';
//pushはurlを遷移する役割
import { push } from 'connected-react-router';

const Login = () => {

    const dispatch = useDispatch();

  return(
    <div>
      ここにログイン画面作成する
      <button onClick={()=> dispatch(push('/'))}>ログイン</button>
    </div>
  )
}

export default Login;