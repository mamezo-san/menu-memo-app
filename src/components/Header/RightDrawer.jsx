import React,{useState,useCallback,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { TextInput } from '../UIkit/index';
import { push } from 'connected-react-router';
import { useDispatch,useSelector } from 'react-redux';
import { signOut,searchMenus } from '../../reducks/users/operetions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUserId } from '../../reducks/users/selectors';
import {db} from '../../firebase/index';

const useStyles = makeStyles((theme)=> ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256
    }
  },
  //headerのtoolbarと一緒に使うためのもの
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchFiled: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  }
}));

const RightDrawer = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { container } = props;

  //userId取得
  const selector = useSelector((state) => state);
  const userId = getUserId(selector);

  const[search,setSearch] = useState("");

  const selectMenu = (event,path) => {
    dispatch(push(path));
    //drawerを選んだ際にdrawerを閉じるために
    props.onClose(event)
  };

  const menus = [
    { func: selectMenu, label: "メニュー登録", icon: <AddCircleIcon />,       id: "addMenu", value: "/menus/edit"},
    { func: selectMenu, label: "メニュー履歴", icon: <HistoryIcon />  ,       id: "history", value: "/menus/history"},
    { func: selectMenu, label: "ユーザー情報", icon: <AccountCircleIcon />  , id: "account", value: "/user/" + userId}
  ];


  const [filters,setFilters] = useState([
    { func: selectMenu,label: "全て",id: "all",value: ""},
  ])

  useEffect(() => {
    db.collection('categories')
      .orderBy('order','asc')
      .get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const category = snapshot.data()
          list.push({
            func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`
          })
        })
        setFilters((prevState) => [...prevState,...list])
      });
  },[]);


  const inputSearch = useCallback((event) => {
    setSearch(event.target.value)
  },[setSearch]);


  //ダメだったらここを戻す
  const changeSearch = useCallback((event,search) => {
    dispatch(push(`/?search=${search}`))
    props.onClose(event)
  },[search,setSearch]);
  

  return(
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        //temporaryで開閉ができる
        variant="temporary"
        //anchorはどこからdrawerを出すのか left rightなど
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        //スマホ表示をするときに下記を指定するとパフォーマンスが向上する
        ModalProps={{keepMounted: true}}
      >
        <div>
          <div className={classes.searchFiled}>
            <TextInput 
              fullWidth={false} rows={1} multiline={false} value={search}
              type={"text"} label={"キーワードで検索"} required={false}
              onChange={inputSearch}
            />
            <IconButton>
              <SearchIcon onClick={(e) => changeSearch(e,search)} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {/*上記で作成したmenusの配列をmapを使用して表示する */}
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e,menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              {/*primaryは表示するテキスト */}
              <ListItemText primary={"ログアウト"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map(filter => (
            <React.Fragment key={filter.id}>
              <ListItem
                button 
                onClick={(e) => filter.func(e,filter.value)}
                >
                <ListItemText primary={filter.label} />
              </ListItem>
            </React.Fragment>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default RightDrawer;