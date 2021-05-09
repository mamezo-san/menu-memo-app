import React,{useState,useEffect,useCallback} from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase/index';
import { makeStyles } from '@material-ui/styles';
import HTMLReactParser from 'html-react-parser';
import { ImageSwiper } from '../components/Products/index';
import { getUserId } from '../reducks/users/selectors';
import { FullscreenExit } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    detail: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    }
}))

//空白をbrタグに変える関数 descriptionでつかう
const returnCodeToBr = (text) => {
    if(text===""){
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g,'<br/>'))
    }
};

const MenusDetail = () => {

    const classes = useStyles();

    const selector = useSelector((state)=> state);
    const uid = getUserId(selector);

    const path = selector.router.location.pathname;
    const id = path.split('/users/'+ uid + '/menus/')[1];

    const [menu,setMenu] = useState(null);

    const sites =[
        {id: "kurasiru" ,      name: "クラシル",       path: "https://www.kurashiru.com/search?query="},
        {id: "cookpad" ,       name: "クックパッド",    path: "https://cookpad.com/search/"},
        {id: "delishkitchen" , name: "DELISH KITCHEN",path:"https://delishkitchen.tv/search?q="},
    ];

    useEffect(() => {
        db.collection('users').doc(uid).collection('menus').doc(id).get()
            .then(doc => {
                const data = doc.data();
                setMenu(data)
            })
    },[]);

  return(
    <section>
        {menu && (
            <div className="flex-menus"> 
                <div className={classes.sliderBox}> 
                    <ImageSwiper images={menu.images} className="image-size" />
                </div>
                <div className={classes.detail}>
                    <h2 className="menu-detail-name">
                        {menu.name}
                    </h2>
                    <div className="space-small" />
                    <p>{returnCodeToBr(menu.description)}</p>
                    <div className="space-large" />
                    <div>
                        {sites.map(site => (
                            <div>
                                <a href={site.path + menu.name} target="_blank" key={site.id} >{menu.name}のレシピを{site.name}で検索する</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </section>
  )
}

export default MenusDetail;