import React from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import{ makeStyles } from '@material-ui/core/styles';

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
  }
}));

const AccountDrawer = (props) => {

    const dispatch = useDispatch();
    

  return(
    <div>
      
    </div>
  )
}

export default AccountDrawer;