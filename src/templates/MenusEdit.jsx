import React,{useCallback, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import{ PrimaryButton, TextInput,SelectBox } from '../components/UIkit/index';
import { saveMenus } from '../reducks/menus/operetions';
import { ImageArea } from '../components/Products/index';
import { db } from '../firebase/index';

const MenusEdit = () => {

    const dispatch = useDispatch();

    const [name,setName] = useState(""),
          [description,setDescription] = useState(""),
          [category,setCategory] = useState(""),
          [images,setImages] = useState([]),
          [recipe,setRecipe] = useState("");

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription]);

    //編集画面
    //urlからsplitを使って変数:idを取り出す
    //window.location.pathnameでurl
    let id = window.location.pathname.split('/menus/edit')[1];

    //urlに変数:idが入っている場合はidに変数:idを代入している
    //=下記は編集の時
    if(id !== ""){
        // /を取り除いて純粋にidだけを取り出している
        id = id.split('/')[1]
    }

    //編集の場合だけuseEffectを使用するので以下のif文
    useEffect(() => {
        if(id !== ""){
            //データベースのmenusの中からidが一致するものを取り出している
            db.collection('menus').doc(id).get()
                .then(snapshot => {
                //それぞれの値はsnapshotに入っているのでそれのdataをmenuに代入している
                const data = snapshot.data();
                setName(data.name);
                setDescription(data.description);
                setCategory(data.category);
                setImages(data.images);
            })
        }
    },[id]);

    //SelectBoxに入るoptionsの値、実際はデータベースに保存して使う？、連想配列(objectっぽい配列)
    const categories = [
        {id: "japanese", name: "和食"},
        {id: "chinese", name: "中華"},
        {id: "westernFood",name: "洋食"}
    ];

  return(
    <section >
      <h2>メニューの登録、編集</h2>
      <div>
          <div>
              <ImageArea images={images} setImages={setImages} />
          </div>
            <TextInput 
            fullWidth={true} rows={1} value={name} multiline={false}
            type={"text"} label={"メニュー名"} required={true} onChange={inputName}
           />
           <div className="space-small" />
            <TextInput 
            fullWidth={true} rows={3} value={description} multiline={true}
            type={"text"} label={"説明"} required={true} onChange={inputDescription}
           />
            <SelectBox 
                label={"カテゴリー"} required={true} value={category} options={categories} select={setCategory}
            />
            {/* <TextInput 
            fullWidth={true} rows={1} value={name} multiline={false}
            type={"text"} label={"メニュー名"} required={true} onChange={inputName}
           />  */}
      </div>
      <div className="space-large" />
      <div>
          <PrimaryButton label={"メニューを登録する"} onClick={() => dispatch(saveMenus(id,name,description,category,images))} />
      </div>
    </section>
  )
}

export default MenusEdit;