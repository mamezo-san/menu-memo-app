import React, { useState,useCallback,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { TextInput,PrimaryButton } from '../components/UIkit/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getUserId } from '../reducks/users/selectors';
import { db } from '../firebase';
import { sendSlack } from '../reducks/users/operetions';

const Inquiry = () => {

  const selector = useSelector((state) => state);
  const userId = getUserId(selector);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [text,setText] = useState("");

  const inputName = useCallback((event)=> {
    setName(event.target.value)
  },[name,setName]);

  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  },[email,setEmail]);

  const inputText = useCallback((event)=> {
    setText(event.target.value)
  },[text]);

  const close = () => {
        setText("")
        return handleClose()
  };

  const send = (name,email,text) => {
    dispatch(sendSlack(name,email,text))
    setText("")
    return handleClose()
  };

  useEffect(()=> {
    if(userId !== ""){
      db.collection("users").doc(userId).get()
        .then(snapshot => {
          const data = snapshot.data();
          setName(data.username); 
          setEmail(data.email);
        })
    }
  },[open,setOpen]);
  

  return (
    <div>
      <li onClick={handleClickOpen}>
        お問い合わせ
      </li>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"お問い合わせフォーム"}</DialogTitle>
        <DialogContent>
          <TextInput 
              fullWidth={true}  rows={1} value={name} label={"お名前"}
              multiline={false} required={true} type={"text"} onChange={inputName}
          />
          <TextInput 
            fullWidth={true}  rows={1} value={email} label={"メールアドレス"}
            multiline={false} required={true} type={"email"} onChange={inputEmail}
          />
          <TextInput 
            fullWidth={true}  rows={5} value={text} label={"お問い合わせ内容"}
            multiline={true} required={true} type={"text"} onChange={inputText}
          />
        </DialogContent>
        <DialogActions>
          <PrimaryButton label={"送信"} onClick={() => send(name,email,text)} />
          <PrimaryButton label={"キャンセル"} onClick={() => close()} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

// dispatch(sendSlack(name,email,text))

export default Inquiry;
