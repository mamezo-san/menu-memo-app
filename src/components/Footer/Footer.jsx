import React from 'react';
import Divider from '@material-ui/core/Divider'
import { Inquiry } from '../../templates';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import TwitterIcon from '@material-ui/icons/Twitter';

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
              <TwitterIcon />
            </a>
          </li>
          <div>
            <Inquiry />
          </div>
      </ul>
    </>
  )
}

export default Footer;