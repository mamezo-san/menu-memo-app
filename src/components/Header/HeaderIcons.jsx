import React from 'react';
import IconButton from '@material-ui/core/IconButton';
//Badgeが必要であればimport
//表示したいiconをインポーと
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const HeaderIcons = (props) => {
  return(
    <>
        {/*表示したいものをIconButtonに囲んで順に並べていく */}
        <IconButton>
            <AccountCircleIcon />
        </IconButton>
        <IconButton onClick={(event) => props.handleDrawerTog(event)}>
            <MenuIcon />
        </IconButton> 
    </>
  )
}

export default HeaderIcons;