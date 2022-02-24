import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
// import { makeStyles } from '@mui/styles';
// makeStyles function ko useStyle key ander store kiya
const useStyles = makeStyles({

    component: {
        background: "#fff",
        color: "black"
    },
    container: {
        displey: 'flex',
        justifyContent: 'center',
        // parent class ki css ussey child components main css dalna
        '&>*': {
            padding: 20 //by default px
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
});
// functional component
const Header = () => {
    // importing useStyles
    const classes = useStyles();
    const navigate = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    if (authState && authState.isPending) return null;

    const login = async () => navigate.push('/login');
    const logout = async () => oktaAuth.signOut();

    const button = authState.isAuthenticated ?
        <button onClick={logout}
            style={{
                background: 'unset',
                border: 'none',
                textTransform: 'uppercase',
                fontSize: 16,
                fontFamily: 'Roboto',
                cursor: 'pointer'
            }}
        >Logout</button> :
        <button onClick={login}>Login</button>;

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to={'/'} className={classes.link}><Typography>HOME</Typography></Link>
                <Typography>ABOUT</Typography>
                <Typography>CONTACT</Typography>
                <Typography>{button}</Typography>
            </Toolbar>
        </AppBar>
    )
};
export default Header;