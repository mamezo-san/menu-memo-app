import { db, FirebaseTimestamp } from "../../firebase"
import { push } from 'connected-react-router';
import { fetchMenusAction,deleteMenuAction } from './actions';

//頻繁に使うため定数化している
// const menusRef  = db.collection('menus')

// //メニューを削除するためのメソッド
// export const deleteMenu = (id) => {
//     return async(dispatch,getState) => {
//         menusRef.doc(id).delete()
//             .then(()=> {
//                 //getStateは現在のstoreのstate情報をoperation内で取得できる
//                 //prevMenusに現在のmenusの情報を入れている
//                 const prevMenus = getState().menus.list;
//                 //filterでmenusのidが削除したいidとは別のものを新たに作成している
//                 const nextMenus = prevMenus.filter(menu => menu.id !== id)
//                 dispatch(deleteMenuAction(nextMenus))
//         })
//     }
// }

//リスト表示するためのメソッド
// export const fetchMenus = () => {
//     return async(dispatch) => {
//         //orderByはソートするメソッド引数は1.並び替えの基準2.降順、昇順か
//         menusRef.orderBy('updated_at','desc').get()
//             .then(snapshots => {
//                 const menusList = []
//                 snapshots.forEach(snapshot => {
//                     const menu = snapshot.data();
//                     menusList.push(menu)
//                 })
//                 dispatch(fetchMenusAction(menusList))
//             })
//     }
// }

//編集に対応できるように変更する　saveMenusの引数にidを加える
// export const saveMenus = (id,name,description,category,images) => {
//     return async(dispatch) => {

//         //validate
//         if(name === "" || description === "" || category === ""){
//             alert("未入力の項目があります")
//             return false
//         }

//         const timeStamp = FirebaseTimestamp.now();

//         const data = {
//             name: name,
//             description: description,
//             category: category,
//             updated_at: timeStamp,
//             images: images
//         }


//         //ここは新規作成の時だけ実行する処理
//         //doc()で引数に何も渡さないとidが自動採番される
//         if(id === ""){
//             const ref = menusRef.doc();
//             //上記で採番されたidを取り出していdataに入れている
//             id = ref.id
//             data.id = id
//             data.created_at = timeStamp
//         }

//         //setの第二引数に{merge: true}を渡すことで変更されたところだけを更新する
//         //上記のidを指定してdataをdbに保存している
//         return menusRef.doc(id).set(data, {merge: true})
//             .then(()=> {
//                 dispatch(push('/'))
//             }).catch((error) => {
//                 throw new Error(error)
//             })
//     }
// };

