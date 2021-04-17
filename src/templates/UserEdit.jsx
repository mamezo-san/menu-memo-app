import React,{useState,useEffect,useCallback} from 'react';
import { TextInput,PrimaryButton } from '../components/UIkit/index';
import { useSelector,useDispatch } from 'react-redux';
import { getUserId } from '../reducks/users/selectors';
import { db } from '../firebase/index';
import { updateUser } from '../reducks/users/operetions';

const UserEdit = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);

    const [name,setName] = useState(""),
          [email,setEmail] = useState("");

    useEffect(()=> {
        if(userId !== ""){
            db.collection('users').doc(userId).get()
                .then(doc => {
                    const data = doc.data();
                    setName(data.username);
                    setEmail(data.email);
            })
        }
    },[userId]);    

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

  return(
    <div>
      <h2>ユーザー編集</h2>
      <div>
          <div>
              <TextInput 
                fullWidth={true} rows={1} multiLine={false}
                required={true} type={"text"} label={"名前"}　
                value={name} onChange={inputName}
              />
              <TextInput 
                fullWidth={true} rows={1} multiLine={false}
                required={true} type={"text"} label={"メールアドレス"}　
                value={email} onChange={inputEmail}
              />
              <div className="space-small" />
              <PrimaryButton 
                label={"変更を保存する"} 
                onClick={() => dispatch(updateUser(userId,name,email))}
              />
          </div>
      </div>
    </div>
  )
}

export default UserEdit;