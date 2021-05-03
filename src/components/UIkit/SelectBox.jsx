import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    formControl: {
        marginButton: 16,
        minWidth: 128,
        width: '100%'
    }
});

const SelectBox = (props) => {

    const classes = useStyles();

  return(
      //大枠
    <FormControl className={classes.formControl}>
        {/* 初期表示のラベル */}
        <InputLabel>{props.label}</InputLabel>
        {/* selectは使用したいcomponentのsetStateを渡す(=MenusEditの場合はsetCategoryなど) */}
        <Select
            required={props.required} value={props.value}
            //onChangeはuseCallbackに近い、そのためpropsではset~を渡す
            onChange={(event) => props.select(event.target.value)}
        >
            {(props.options.length > 0) && props.options.map(option => (
                //MenuItemはSelectboxで実際に選べるカテゴリーになる
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>  
            ))}
        </Select>
    </FormControl>
  )
}

export default SelectBox;