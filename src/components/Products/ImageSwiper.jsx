import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import Noimage from '../../assets/img/src/no_image.png';
import 'swiper/css/swiper.css';

const ImageSwiper = (props) => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            //画像の下の円
            type: 'bullets',
            //bulletsをクリックした時に切り替えられるかどうか
            clickable: true,
            //表示しているやつが大きくなるやつ
            dynamicBullets: true
        },
        //次へボタンと前へボタンを定義している
        navigation: {
            nextEl: 'swiper-button-next',
            prevEl: 'swiper-button-prev'
        },
        loop: true
    })

    const images = props.images;

  return(
      //スプレット構文で定義したparams展開
    <Swiper {...params}>
      {images.length === 0 ?(
          <div>
            <img src={Noimage} alt="noimage" />
          </div>
      ) :(
          images.map(image => (
             <div>
                 <img src={image.path} alt="メニュー画像" />
             </div> 
          ))
      )}
    </Swiper>
  )
}

export default ImageSwiper;