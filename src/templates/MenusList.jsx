import React, { useEffect } from 'react';
import { MenuCard } from '../components/Products/index';
import { fetchMenus } from '../reducks/menus/operetions';
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from '../reducks/menus/selectors';


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
      <div>
          {/*productsの数が０以上の時mapメソッドでイテレートする */}
          {menus.length > 0 && (
              menus.map(menu=> ( //callbackの => を()にすることでjsxを使える
                  <MenuCard 
                  key={menu.id} images={menu.images} 
                  name={menu.name} id={menu.id}
                  />
              ))
          )}
      </div>
    </section>
  )
}

export default MenusList;