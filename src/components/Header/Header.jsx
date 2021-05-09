import React,{useState,useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch,useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import { HeaderIcons,RightDrawer } from './index';
import logo from '../../assets/img/src/logo3.jpg';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#ff9933",
    },
    toolBar: {
        margin: '0,auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto',
    }
});

const Header = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //RightDrawerに渡すpropsと関数
    const [open,setOpen] = useState(false);
    const handleDrawerTog = useCallback((event)=> {
        //もしキーボードを打ち込んだ時、かつそれがtabまたはshiftの時は何もせずreturnを返す
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        //それ以外のeventを受け取った時はopenを反転する
        setOpen(!open)
    },[setOpen,open]);

    //非login時はiconを表示させたくないのでloginしているかをチェックする
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector);
  return(
    <div className={classes.root}>
        {/*positionでAppBarの位置を決めることができる(fixedは上部で固定) */}
        <AppBar position='fixed' className={classes.menuBar}>
            <Toolbar className={classes.toolBar}>
                <img src={logo} alt="Menu Memo" className="header-title" onClick={() => dispatch(push('/'))} />
                    {/* Menu Memo</h2> */}
                {/*条件分岐でサインインしていたらHeaderIconsを表示 */}
                {isSignedIn && (
                    <div className={classes.iconButtons}>
                        <HeaderIcons handleDrawerTog={handleDrawerTog}/>
                    </div>
                )}
            </Toolbar>
        </AppBar>
        <RightDrawer open={open} onClose={handleDrawerTog} />
    </div>
  )
}

export default Header;