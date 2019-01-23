import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Iconbutton from "../Iconbutton/Iconbutton";
const Navbar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Iconbutton/>
                <Typography variant="title" color="inherit">
                Beauty Box - Latest Fashion News & Updates
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default Navbar;