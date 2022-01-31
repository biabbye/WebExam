import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    header: {
        background: '#008B8B'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20
    }
})

const NavBar = () => {
    const classes = useStyle();
    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink className={classes.tabs} to="./" exact>Home Page</NavLink>
                <NavLink className={classes.tabs} to="playlists" exact>Playlists</NavLink>
                <NavLink className={classes.tabs} to="songs" exact>All Songs</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;