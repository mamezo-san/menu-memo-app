import React, { useEffect } from 'react';
import { MenuCard } from '../components/Products/index';
import { fetchMenus } from '../reducks/users/operetions';
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from '../reducks/users/selectors';
import { push } from 'connected-react-router';

const MenusList = () => {

    //selectorにstoreのstateの値を全て渡している
    const selector = useSelector((state) => state);
    //selectors.jsのgetMenusメソッドを用いてstoreのmenusの値を取り出している
    const menus = getMenus(selector);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchMenus())
    },[])

  return(
    <section>
      <div className="flex-menus">
          {/*productsの数が０以上の時mapメソッドでイテレートする */}
          {menus.length > 0 && (
              menus.map(menu　=> ( //callbackの => を()にすることでjsxを使える
                  <MenuCard 
                  key={menu.id} images={menu.images} 
                  name={menu.name} id={menu.id}
                  />
              ))
          )}
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