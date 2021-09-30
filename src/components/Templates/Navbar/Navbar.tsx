/* eslint-disable indent */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  MenuItem,
  Menu,
  Modal,
} from "@material-ui/core";
import {
  fade,
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
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
import Login from "./Login";
import { option } from "../../../Types/Login";

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
      padding: `1rem`,
      [theme.breakpoints.down("md")]: {
        padding: "15px 25px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "10px 5px",
      },
    },
    appBar: {
      zIndex: 1,
      boxShadow: "-1px 1px 15px rgba(0, 0, 0, 0.1)",
      "&>div": {
        maxWidth: "1350px",
        margin: "auto",
        width: "100%",
      },
    },
    transparent: {
      backgroundColor: "rgba(25,38,83,0.85)",
    },
    search: {
      position: "relative",
      borderRadius: "2rem",
      // border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: "2px 4px 27px 1px rgba(17, 17, 17, 0.12)",
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
      "&>svg": {
        fontSize: "1.75rem !important",
        fill: "rgba(17, 17, 17, 0.5)",
      },
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
      color: "grey",
    },
    inputInput: {
      // padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      padding: "1rem",
      paddingLeft: `calc(1.25em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      color: "rgba(17, 17, 17, .9) !important",
      fontWeight: 300,
      "&::placeholder": {
        color: "rgba(17, 17, 17, .75) !important",
      },
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    popoverMenu: {
      "&>div.MuiPaper-root": {
        padding: ".5rem",

        "&>ul": {
          padding: "0",
          "&>li": {
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
    },
  })
);

interface Props {
  transparent?: boolean;
}

const Navbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { transparent } = props;
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [option, setOption] = useState<option>("login");

  //Drawer Account
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
                      color="primary"
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
                      color="primary"
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
                        user
                          ? (handleClose(), history.push("/account"))
                          : (handleClose(),
                            setOption("login"),
                            setLoginOpen(true));
                      }}
                    >
                      {user ? "Mon compte" : "Se connecter"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        user
                          ? handleClose()
                          : (handleClose(),
                            setOption("signup"),
                            setLoginOpen(true));
                      }}
                    >
                      {user ? "Déconnexion" : "S'inscrire"}
                    </MenuItem>
                  </Menu>
                  <LeftDrawer />
                  <Modal
                    open={loginOpen}
                    onClose={() => setLoginOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      width="100vw"
                      height="100vh"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ pointerEvents: "none" }}
                    >
                      <Login
                        setOption={setOption}
                        option={option}
                        handleClose={() => setLoginOpen(false)}
                      />
                    </Box>
                  </Modal>
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
