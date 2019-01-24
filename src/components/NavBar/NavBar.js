import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
const Navbar = () => {
    return(
        <div>
        <AppBar position="relative">
            <Toolbar>
            <i class="fas fa-bars fa-2x">
            </i> 
                <Typography variant="display1" color="inherit">
                            Beauty Box - Latest Fashion News & Updates
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default Navbar;