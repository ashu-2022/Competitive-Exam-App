import React from 'react'
import { JoshTalkLogo } from '../../assets'
import './Header.scss';
const Header = () => {
  return (
      <div className='header__container'>
          <img className='header__logo' src={JoshTalkLogo} alt='Josh Talk Logo' />
          <p className='header__title'>Josh Talk Frontend Engineer Assignment</p>
    </div>
  )
}

export default Header