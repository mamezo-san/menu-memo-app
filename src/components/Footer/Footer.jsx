import React from 'react';
import Divider from '@material-ui/core/Divider'
import { Inquiry } from '../../templates';

const qiita_key = process.env.REACT_APP_qiita_key
const twitter_key = process.env.REACT_APP_twitter_key

const Footer = () => {

  return(
    <>
      <Divider />
      <ul className="flex-footer">
          <li>
            <a href={qiita_key} target="_blank" alt="Qiitaリンク">
                Qiita
            </a>
          </li>
          <li>
            <a href={twitter_key} target="_blank" alt="twitterリンク">
              twitter
            </a>
          </li>
          <li >
            <Inquiry />
          </li>
      </ul>
    </>
  )
}

export default Footer;