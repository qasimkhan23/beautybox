import React from 'react';
import SideNav from 'react-simple-sidenav';

const SideNavigation = (props) => {
    return (
        <div>
        <SideNav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navstyle={{
            background:'#242424',
            maxWidth:'220px'
        }}
        >
          
       

        </SideNav>
        </div>
    )
}

export default SideNavigation;