import React,{useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import{ PrimaryButton, TextInput,SelectBox } from '../components/UIkit/index';
import { saveMenus } from '../reducks/menus/operetions';

const MenusEdit = () => {

    const dispatch = useDispatch();

    const [name,setName] = useState(""),
          [description,setDescription] = useState(""),
          [category,setCategory] = useState(""),
          [recipe,setRecipe] = useState("");

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription]);

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
            <TextInput 
            fullWidth={true} rows={1} value={name} multiline={false}
            type={"text"} label={"メニュー名"} required={true} onChange={inputName}
           />
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
      <div>
          <PrimaryButton label={"メニューを登録する"} onClick={() => dispatch(saveMenus(name,description,category))} />
      </div>
    </section>
  )
}

export default MenusEdit;