import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Noimage from '../../assets/img/src/no_image.png';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deleteMenu } from '../../reducks/menus/operetions';

//引数に渡しているthemeとはアプリで管理しているmaterialUiのthemeファイル,なかにprimarycolorなど
//入っているのでそれを活用できる 書き方はcallbackに近い形で => の後に()を入れる
//ここはデザイン整える際にもう一度確認必須
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16 8',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    icon: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price: {
        color: theme.palette.secondary.dark,
        fontSize: 16

    },
    productName: {
        boxOrient: 'vertical',
        display: '-webkit-box',
        fontSize: 14,
        lineHeight: '18px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 36,
            lineClamp: 2,
        },
        [theme.breakpoints.up('md')]: {
            height: 18,
            lineClamp: 1,
        }
    }
}));


const MenuCard = (props) => {

    //三項演算子でimagesがあるかを検証　なかったらnoimagesを活用
    const images = (props.images.length > 0 ) ? props.images : [{path: Noimage}];

    const dispatch = useDispatch();

    const classes = useStyles();

    const [modal,setModal] = useState("");

    const handleClick = (event) => {
        setModal(event.currentTarget)
    };

    const handleClose = () => {
        setModal(null)
    };

  return(
    <Card className={classes.root} >
        {/*画像がはいる */}
        <CardMedia
            className={classes.media}
            //imagesには画像が複数入る可能性があるので[0]で指定している。
            //またimageURLはimagesのpathに入っている
            image={images[0].path}
            //clickすると詳細ページに飛ばす urlの指定は+とprops.idを使用する
            onClick={() => dispatch(push('/menus/' + props.id ))}
        />
        {/*文章が入る 今回は名前とボタン */}
        <CardContent className={classes.content} >
            <div onClick={() => dispatch(push('/menus/' + props.id ))}>
                {/*テキストを入れるための箱 colorとcomponentを指定できる　componentはタグ(p,h2など)を指定できる */}
                <Typography color="textSecondary" component="p">
                    {props.name}
                </Typography>
            </div>
            {/*modalの作成 */}
            <IconButton onClick={handleClick}>
                <ExpandMoreIcon />
            </IconButton>
            {/*クリックした時に開かれるもの */}
            {/*要復習 */}
            <Menu
                modal={modal}
                keepMounted
                open={Boolean(modal)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={()=> {
                        dispatch(push('/menus/edit/' + props.id))
                        handleClose()
                    }}
                >
                    編集する
                </MenuItem>
                <MenuItem
                    onClick={()=> {
                        dispatch(deleteMenu(props.id))
                        handleClose()
                    }}
                >
                    削除する
                </MenuItem>
            </Menu>
        </CardContent>
    </Card>
  )
}

export default MenuCard;

//メニュー画面を閉じる(onClose)のはescapeKeyDown(escキーが押された時)
//tabKeyDown(tabキーを押された時),backdropClick(画面のどこかしらを押した時)