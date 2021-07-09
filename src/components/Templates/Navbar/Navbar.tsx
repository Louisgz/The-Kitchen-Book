import React from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
  MenuItem,
  Menu,
  CssBaseline,
} from "@material-ui/core";
import {
  fade,
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Logo from "../../../images/Misc/Logo.svg";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LeftDrawer from "./LeftDrawer";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      maxWidth: "60px",
      marginRight: "1rem",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "40px",
      },
    },
    outsideContainer: {
      padding: 0,
    },
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      padding: `1.5rem`,
      [theme.breakpoints.down("md")]: {
        padding: "15px 25px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "10px 5px",
      },
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
      gap: "1rem",

      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
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
      background:
        "linear-gradient(98deg, #7489ff 2%, #86b4ff 35%, #7fc1ff 70%)",
      borderRadius: 20,
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
      fontSize: 21,
    },
    search: {
      position: "relative",
      borderRadius: "2rem",
      border: `2px solid rgba(44, 99, 11, 0.71)`,
      flexGrow: 1,
      maxWidth: "500px",
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconButton: {
      fontSize: 40,
      padding: 0,
      margin: "0 .5rem",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.palette.primary.dark,
        boxShadow: "0 0 33px 0 rgb(255 255 255 / 11%)",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
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
      },
    },
  })
);

const Navbar = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const pathname = document.location.pathname;
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { transparent, activeMulticolor } = props;

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
          <AppBar
            position="static"
            className={clsx(classes.appBar, transparent && classes.transparent)}
          >
            <Toolbar style={{ zIndex: 1 }}>
              <Container className={classes.navbarDisplayFlex}>
                <img
                  src={Logo}
                  className={classes.logo}
                  onClick={() => history.push("/")}
                />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Je cherche..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onKeyPress={(e) => {
                      if (e.charCode == 13) {
                        history.push({
                          pathname: "/recipes",
                          search: `?q=${
                            (e.target as HTMLTextAreaElement).value
                          }`,
                        });
                      }
                    }}
                  />
                </div>
                <Box display="flex" alignItems="center">
                  {!mobile && (
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      className={classes.iconButton}
                      onClick={() => history.push("/add-recipe")}
                      color="inherit"
                    >
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  )}
                  {!mobile && (
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      className={classes.iconButton}
                      onClick={handleMenu}
                      // onClick={() => history.push('/account')}
                      color="inherit"
                    >
                      <AccountCircle fontSize="large" />
                    </IconButton>
                  )}
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    getContentAnchorEl={null}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                    className={classes.popoverMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        history.push("/account");
                      }}
                    >
                      Mon compte
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Déconnexion
                    </MenuItem>
                  </Menu>
                  <LeftDrawer />
                </Box>
              </Container>
            </Toolbar>
          </AppBar>
        </Box>
      </Fade>
    </Container>
  );
};

export default Navbar;
