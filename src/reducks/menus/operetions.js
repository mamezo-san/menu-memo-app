import { db, FirebaseTimestamp } from "../../firebase"
import { push } from 'connected-react-router';

//頻繁に使うため定数化している
const menusRef  = db.collection('menus')

export const saveMenus = (name,description,category) => {
    return async(dispatch) => {
        const timeStamp = FirebaseTimestamp.now();

        const data = {
            name: name,
            description: description,
            category: category,
            updated_at: timeStamp
        }

        //doc()で引数に何も渡さないとidが自動採番される
        const ref = menusRef.doc();
        //上記で採番されたidを取り出していdataに入れている
        const id = ref.id
        data.id = id
        data.created_at = timeStamp

        //上記のidを指定してdataをdbに保存している
        return menusRef.doc(id).set(data)
            .then(()=> {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
};