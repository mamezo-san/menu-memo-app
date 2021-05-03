import React, { useEffect } from 'react';
import { MenuCard } from '../components/Products/index';
import { fetchMenus, searchMenus } from '../reducks/users/operetions';
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from '../reducks/users/selectors';
import { push } from 'connected-react-router';

const MenusList = () => {

    //selectorにstoreのstateの値を全て渡している
    const selector = useSelector((state) => state);
    //selectors.jsのgetMenusメソッドを用いてstoreのmenusの値を取り出している
    const menus = getMenus(selector);
    const dispatch = useDispatch();

    const query = selector.router.location.search;
    const category = /^\?category=/.test(query) ? query.split('?category=')[1]: ""
    const search = /^\?search=/.test(query) ? query.split('?search=')[1]: ""

    useEffect(() => {
      if(category){
        dispatch(fetchMenus(category))
      } else if(search){
        dispatch(searchMenus(search))
      } else {
        dispatch(fetchMenus());
      }
    },[query]);

    // useEffect(() => {
    //     dispatch(searchMenus(search))
    // },[query]);

    console.log(query);
    console.log(menus);

  return(
    <section>
      <div className="flex-menus">
          {/*productsの数が０以上の時mapメソッドでイテレートする */}
          {( menus !== undefined && menus.length > 0 ) ? (
              menus.map(menu　=> ( //callbackの => を()にすることでjsxを使える
                  <MenuCard 
                  key={menu.id} images={menu.images} 
                  name={menu.name} id={menu.id}
                  />
              )) 
          ): <div>ここにメニューを追加</div>}
      </div>
      <div>
        <button onClick={() => dispatch(push('/menus/edit'))}>
          メニューを追加する
        </button>
      </div>
    </section>
  )
}

export default MenusList;