import React from 'react';
import style from './header.css'
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sidenav'

const Header = (props ) => {

    const NavBars = () => (
        <div className={style.bars}>
        <FontAwesome name="bars"
        onClick={props.onOpenNav}
        style={{
            colors:'#dfdfdf',
            padding: '10px',
            cursor: 'pointer'
            }}
            />
        </div>
    )

    const logo = () => (
        <Link to="/" className={style.logo}>
        <img alt= "beautybox_logo" src="/images/beautybox_logo.png"/>
        </Link>
    )

    return(
        <header className={style.header}>
        <SideNav {...props}/>
        <div className={style.headerOpt}>
        {NavBars()}
        {logo()}
        </div>
        </header>
    )


}

export default Header;