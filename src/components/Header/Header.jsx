import React from 'react'
import { CausalFunnelLogo } from '../../assets'
import './Header.scss';
const Header = () => {
  return (
      <div className='header__container'>
          <img className='header__logo' src={CausalFunnelLogo} alt='CausalFunnel Logo' />
          <p className='header__title'>CausalFunnel Frontend Engineer Assignment</p>
    </div>
  )
}

export default Header