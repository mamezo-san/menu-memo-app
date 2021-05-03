import React,{useCallback, useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import{ PrimaryButton, TextInput,SelectBox } from '../components/UIkit/index';
import { saveMenus } from '../reducks/users/operetions';
import { ImageArea } from '../components/Products/index';
import { db } from '../firebase/index';
import { getUserId } from '../reducks/users/selectors';

const MenusEdit = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const uid = getUserId(selector);

    const [id,setId] = useState(""),
          [name,setName] = useState(""),
          [description,setDescription] = useState(""),
          [category,setCategory] = useState(""),
          [categories,setCategories] = useState(""),
          [images,setImages] = useState([]),
          [word,setWord] = useState(""),
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
   

    //編集の場合だけuseEffectを使用するので以下のif文
    useEffect(() => {
        let id = window.location.pathname.split('/menus/edit')[1];
        // console.log(setId);
    
        //urlに変数:idが入っている場合はidに変数:idを代入している
        //=下記は編集の時
        if(id !== ""){
            // /を取り除いて純粋にidだけを取り出している
            id = id.split('/')[1]
        }
        if(id !== ""){
            //データベースのmenusの中からidが一致するものを取り出している
            db.collection('users').doc(uid).collection('menus').doc(id).get()
                .then(snapshot => {
                //それぞれの値はsnapshotに入っているのでそれのdataをmenuに代入している
                const data = snapshot.data();
                setId(id);
                setName(data.name);
                setDescription(data.description);
                setCategory(data.category);
                setImages(data.images);
            })
        }
    },[]);

    useEffect(()=> {
        db.collection('categories')
          .orderBy('order','asc')
          .get()
          .then(snapshots => {
              const list = [];
              snapshots.forEach(snapshot => {
                  const data = snapshot.data();
                  list.push({
                      id: data.id,
                      name: data.name
                  })
              })
              setCategories(list)
          })
    },[]);

    let tokenMap = new Map();
    const nGrum = (name,n) => {
        // const n = name.length();
        for(let i=0; i<name.length; i++){
            const results = [name.substr(i,n)]
            results.map(result => {
                // return word.push(result);
                return tokenMap.set(result,true);
        })}
    };

    useEffect(()=> {
        nGrum(name,2);
        // nGrum(name,3);
        return setWord(tokenMap)
    },[name]);

    // const ruby = ["ka","ni","i"]
    // const rails = "おじさん"
    // console.log(rails.length);

    // const is = ["iti","ni","san"];
    // const isfile = is.filter(i=> {
    //     return i.length > 2
    // });

    // console.log(isfile);
    

  return(
    <section>
      <h2 className="text-title-center">メニューの登録、編集</h2>
      <div className="text-line-center">
            <ImageArea images={images} setImages={setImages} />
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
      <div  className="text-title-center">
          <PrimaryButton label={"メニューを登録する"} onClick={() =>
             dispatch(saveMenus(id,name,description,category,images,word))} />
      </div>
    </section>
  )
}

export default MenusEdit;