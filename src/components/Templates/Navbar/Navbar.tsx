import React from 'react';
import { AppBar, Button, Toolbar, List, ListItem, ListItemText, Container, MenuItem, Menu, CssBaseline, MenuList } from '@material-ui/core';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuRoundedIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from "../../../images/Misc/Logo.svg"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LeftDrawer from './LeftDrawer'
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            maxWidth: "60px",
        },
        outsideContainer: {
            padding: 0,
        },
        navbarDisplayFlex: {
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            padding: `1.5rem`,
            [theme.breakpoints.down('md')]: {
                padding: "15px 25px",
            },
            [theme.breakpoints.down('xs')]: {
                padding: "9px 20px 5px",
            },
        },
        navDisplayFlex: {
            display: `flex`,
            justifyContent: `space-between`,
            gap: "1rem",

            [theme.breakpoints.down("xs")]: {
                display: "none",
            }
        },
        linkText: {
            textDecoration: `none`,
            fontWeight: 700,
            color: "#848ca5 !important",
            fontSize: "1rem",
            padding: `8px 18px`,
            margin: "0 0px",
            borderRadius: 20,

            "&.Mui-selected": {
                backgroundColor: "rgba(22, 35, 79, 0.9)",
                color: "white !important",
                border: "2px solid #848ca5",
                boxSizing: "border-box !important",
            },


            "&:hover": {
                transition: "color, .2s ease-in-out",
                color: "white !important",
                backgroundColor: "#0a1640 !important",
            },
        },
        outBox: {
            background: "linear-gradient(98deg, #7489ff 2%, #86b4ff 35%, #7fc1ff 70%)",
            borderRadius: 20
        },
        activeMulticolor: {
            "&.Mui-selected": {
                position: "relative",
                border: "2px solid transparent",
                borderRadius: 20,
                backgroundClip: "padding-box",
            },
        },
        appBar: {
            zIndex: 1,
        },
        transparent: {
            backgroundColor: "rgba(25,38,83,0.85)",
        },
        title: {
            fontWeight: 700,
            fontSize: 21
        },
        iconUser: {
            fontSize: 40,
            padding: 0,
            "&:hover": {
                boxShadow: "0 0 33px 0 rgb(255 255 255 / 11%)",
            },
        },
        popoverMenu: {
            "&>div.MuiPaper-root": {
                padding: ".5rem",

                "&>ul>li": {
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontSize: ".9rem",
                    paddingRight: "2rem",
                    "&:hover": {
                        backgroundColor: "#ecf0f8",
                    },
                },
            }
        }
    })
);


const Navbar = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const pathname = document.location.pathname;
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const { transparent, activeMulticolor } = props


    //Drawer Account
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // const promptLogout = () => {
    //     const confirm = window.confirm(t('Êtes-vous sûr de vouloir vous déconnecter ?'))
    //     if (confirm) {
    //         dispatch(logout())
    //         history.push('/')
    //     }
    // }


    const navLinks = [
        { title: `Accueil`, path: `/` },
        { title: `Account`, path: `/account` },
        { title: `Database`, path: `/library` },
        // { title: `Highlights`), path: `/highlights` },
        // { title: `Live score`), path: `/livescore` },
        { title: `Bonus`, path: `/bonus` },
        // { title: `Conseils`), path: `/conseils` },
    ]

    const navLinksPhone = [
        { title: `Accueil`, path: `/` },
        { title: `Prédictions de l'IA`, path: `/pronos` },
        { title: `Database`, path: `/library` },
        // { title: `Highlights`), path: `/highlights` },
        // { title: `Live score`), path: `/livescore` },
        { title: `Bonus`, path: `/bonus` },
        // { title: `Conseils`), path: `/conseils` },
        { title: `Mon compte`, path: `/account` },
    ]


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container className={classes.outsideContainer} maxWidth={false}>
            <Fade in={true} timeout={500}>
                <Box position="relative">

                    <AppBar position="static" className={clsx(classes.appBar, transparent && classes.transparent)}>
                        <Toolbar style={{ zIndex: 1 }}>
                            <Container className={classes.navbarDisplayFlex} maxWidth={false}>
                                <img src={Logo} className={classes.logo} />
                                <MenuList aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                                    {navLinks.map(({ title, path }, index) => (
                                        path === pathname ? <div className={classes.outBox}>
                                            <MenuItem key={index} component={Link} to={path} className={clsx(classes.linkText, activeMulticolor && classes.activeMulticolor)} selected={path === pathname}>
                                                <Typography variant="body1">
                                                    {title}
                                                </Typography>
                                            </MenuItem>
                                        </div>
                                            :
                                            <MenuItem key={index} component={Link} to={path} className={clsx(classes.linkText, activeMulticolor && classes.activeMulticolor)} selected={path === pathname}>
                                                <Typography variant="body1">
                                                    {title}
                                                </Typography>
                                            </MenuItem>
                                    ))}
                                </MenuList>
                                <Box display="flex">
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        className={classes.iconUser}
                                        onClick={handleMenu}
                                        // onClick={() => history.push('/account')}
                                        color="inherit"
                                    >
                                        <AddCircleOutlineIcon
                                            fontSize="large"
                                        />
                                    </IconButton>
                                    <Box display="flex" alignItems="center">
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            className={classes.iconUser}
                                            onClick={handleMenu}
                                            // onClick={() => history.push('/account')}
                                            color="inherit"
                                        >
                                            <AccountCircle
                                                fontSize="large"
                                            />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            getContentAnchorEl={null}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={open}
                                            onClose={handleClose}
                                            className={classes.popoverMenu}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose()
                                                    history.push('/account')
                                                }}
                                            >Mon compte</MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose()
                                                }}

                                            >Déconnexion</MenuItem>
                                        </Menu>
                                    </Box>
                                    <LeftDrawer menu={navLinksPhone} />
                                </Box>

                            </Container>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Fade>
        </Container>
    )
}

export default Navbar
