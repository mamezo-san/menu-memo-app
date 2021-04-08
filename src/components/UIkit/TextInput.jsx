import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  return(
    <TextField 
        fullWidth={props.fullWidth}
        rows={props.rows}
        value={props.value}
        label={props.label}
        margin="dense"
        multiline={props.multiline}
        required={props.required}
        type={props.type}
        onChange={props.onChange}
    />
  )
}

export default TextInput;