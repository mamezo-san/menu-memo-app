import React from 'react';
import Button from '@material-ui/core/Button';
import{ makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    "button": {
        backgroundColor: "#ff9933",
        color: "#fff",
        fontSize: 16,
        height: 48,
        marginButton: 16,
        width: 256
    }
});

const PrimaryButton = (props) => {

    const classes = useStyles();

  return(
    //このボタンがクリックされた時にpropsで受け取った引数(onClick)が実行される。そのためコールバックの形で書く
    <Button className={classes.button} variant="contained" onClick={()=> props.onClick()} >
        {/* propsで受け取ったlabelがボタンの表示になる */}
        {props.label}
    </Button>
  )
}

export default PrimaryButton;