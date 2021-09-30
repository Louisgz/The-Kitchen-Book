import React, { useState } from "react";
import clsx from "clsx";
import { Typography, TextField, FormLabel } from "@material-ui/core";
import {
  fade,
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import ButtonFilled from "../Buttons/ButtonFilled";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import Logo from "../../../images/Misc/Logo.svg";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LeftDrawer from "./LeftDrawer";

import { option } from "../../../Types/Login";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      pointerEvents: "all",
      background: "white",
      padding: "1rem ",
      maxWidth: "500px",
      width: "95vw",
      borderRadius: 9,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

type LoginProps = {
  option: option;
  setOption: (option: option) => void;
  handleClose: () => void;
};

export default function Login(props: LoginProps) {
  const theme = useTheme();
  const classes = useStyles();
  const { option, setOption, handleClose } = props;
  return (
    <Box className={classes.card}>
      <Box width="fit-content" marginLeft="auto">
        <CloseRoundedIcon
          color="primary"
          onClick={() => handleClose()}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ textTransform: "capitalize" }}
      >
        <img src={Logo} alt="Logo" width="30%" />
        <Typography
          variant="h1"
          color="primary"
          style={{ marginLeft: "3rem" }}
          component="span"
        >
          <Box
            fontSize="3rem"
            fontWeight={400}
            style={{ fontFamily: "Poppins" }}
          >
            {option}
          </Box>
        </Typography>
      </Box>
      {option === "login" ? (
        <Box display="flex" flexDirection="column" width="90%" marginTop="1rem">
          <Typography
            variant="body1"
            color="primary"
            style={{ margin: "1rem 0" }}
          >
            Ton email ou ton pseudo de chef
          </Typography>
          <TextField
            placeholder="Exemple : PhiphiEtchebest@TheKitchenBook.com"
            variant="outlined"
            size="small"
          />
          <Typography
            variant="body1"
            color="primary"
            style={{ margin: "1rem 0" }}
          >
            Ton mot de passe
          </Typography>
          <TextField variant="outlined" size="small" />
          <ButtonFilled
            margin="2rem auto 0 "
            title={"Je me connecte"}
            onClick={() => console.log("login")}
          />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography>Ton email ou ton pseudo de chef</Typography>
          <TextField
            id="outlined-textarea"
            placeholder="Exemple : PhiphiEtchebest@TheKitchenBook.com"
            variant="outlined"
          />
        </Box>
      )}
      <Box width="90%" margin="1.5rem auto 0" textAlign="center">
        <Typography variant="body1" component="span" color="primary">
          <Box fontSize=".8rem">
            Tu ne fais pas encore partie de la famille ?{" "}
            {option === "login" ? "Connecte-toi" : "Rejoins-nous"} vite en
            <Typography
              component="span"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() =>
                setOption(option === "signup" ? "login" : "signup")
              }
            >
              <Box fontSize=".8rem" color="#4AA513">
                cliquant ici !
              </Box>
            </Typography>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
