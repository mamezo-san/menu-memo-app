import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ImagePreview } from './index'; 
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { storage } from '../../firebase/index';

const ImageArea = (props) => {

    //imageAreaから送られてきたeventを受け取る
    //fileの場合はevent.target.filesで受け取ることができる
    //fileのままではcloudにアップできないのでblobに変更してからアップする
    //blobオブジェクトを呼び出して引数に上記で受け取ったfileとfileのtypeを指定する

    //ref('images')でアップする場所を指定し、.child(fileName)でアップするfileの名前を渡している
    //.put(blob)実際にアップしている

    //props.setImagesでMenusEditのローカルstate.imagesを受け取り
    //((prevState => [...prevState,newState]))の形にすることで
    //imagesがもともと２個などあった時にそこにnewStateを加える形になる

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file,{type: "image/jpeg"});

        //fileNameにランダムな１６の文字を当てている=>filenameの被りがなくなる
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(()=> {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = { id: fileName,path: downloadURL};
                props.setImages((prevState)=> [...prevState,newImage])
            });
        })
    },[props.setImages])

    //imageの削除
    const deleteImage = useCallback(async(id)=> {
        const ret = window.confirm('この画像を削除しますか？');
        if(!ret) {
            return false
        } else {
            //filterは要素に一致した物だけを取り出す
            //だからここではクリックしていないidだけが取り出されている
            const newImages = props.images.filter(image => image.id !== id)
            //上記で取り出したものをsetImagesに書き換えている
            props.setImages(newImages);
            //storageのクリックしたidのデータを削除している
            return storage.ref('images').child(id).delete()
        }
        //第二引数で渡しているものと比べて変化があるたびにこの関数を呼び出している
    },[props.images])

  return(
    <div>
        <div>
            {props.images.length > 0 && (
                props.images.map(image => <ImagePreview key={image.id} id={image.id} path={image.path} delete={deleteImage}/>)
            )}
        </div>
      <div>
          <span>写真を登録する</span>
          <IconButton>
              {/*アイコンをクリックした時にfinderなどを開くようにするには
              下記のようにアイコンをlabelで囲み下にinputタグをつける 
              inputタグにはtype='file' onchangeを持たせる*/}
              <label>
                  <AddAPhotoIcon />
                    {/*inputタグを消すためのcssを指定している */}
                  <input　
                    className='display-none' type="file" id="image" 
                    onChange={(event)=> uploadImage(event)}  
                  />
              </label>
          </IconButton>
      </div>
    </div>
  )
}

export default ImageArea;