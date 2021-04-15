import React,{useState,useEffect,useCallback} from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase/index';
import { makeStyles } from '@material-ui/styles';
import HTMLReactParser from 'html-react-parser';
import { ImageSwiper } from '../components/Products/index';


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

    const classes = useStyles;

    const selector = useSelector((state)=> state);
    const path = selector.router.location.pathname;
    const id = path.split('/menus/')[1];

    const [menu,setMenu] = useState(null);

    

    useEffect(() => {
        db.collection('menus').doc(id).get()
            .then(doc => {
                const data = doc.data();
                setMenu(data)
            })
    },[]);

  return(
    <section>
        {menu && (
            <div>
                <div className={classes.sliderBox}> 
                    <ImageSwiper images={menu.images} />
                </div>
                <div className={classes.detail}>
                    <h2>{menu.name}</h2>
                    <div className="space-small" />
                    <p>{returnCodeToBr(menu.description)}</p>
                </div>
            </div>
        )}

    </section>
  )
}

export default MenusDetail;