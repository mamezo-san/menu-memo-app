import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchMenus } from '../reducks/users/operetions';
import { getMenus } from '../reducks/users/selectors';
import { FixedHeader } from '../components/Products/index';

const MenusHistory = () => {

    const dispatch = useDispatch();

    const selector = useSelector((state) => state);
    const menus = getMenus(selector);

    useEffect(()=> {
        dispatch(fetchMenus())
    },[]);

  return(
    <div>
        {(menus.length > 0) ? 
            <FixedHeader menus={menus}/> :
            <p>メニュー登録履歴はありません</p>
        }
    </div>
  )
}

export default MenusHistory;