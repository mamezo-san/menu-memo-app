import React from 'react';
import Divider from '@material-ui/core/Divider'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';


const Footer = () => {

    const dispatch = useDispatch();

  return(
    <>
      <Divider />
      <ul>
          <li>
              運営
          </li>
          <li>
              twitter
          </li>
          <li onClick={() => dispatch(push('/inquiry/form'))}>
              お問い合わせ
          </li>
      </ul>
    </>
  )
}

export default Footer;