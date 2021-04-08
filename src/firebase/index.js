import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import { firebaseConfig } from './config';

//configにコピーしたものを使って初期化している
//この一連を行うことでreact内でfirebaseの機能を使えるようにしている
firebase.initializeApp(firebaseConfig);

//firebaseに関連した便利なよく使うものをexportする
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
//作成した日時などを作りたい時に使う
export const FirebaseTimestamp = firebase.firestore.Timestamp();
