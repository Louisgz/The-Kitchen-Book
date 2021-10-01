/* eslint-disable indent */
import React, { useState } from "react";
import clsx from "clsx";
import {
  Typography,
  TextField,
  FormLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
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
    passwordInput: {
      "&>.MuiOutlinedInput-input": {
        paddingTop: "10.5px",
        paddingBottom: "10.5px",
      },
    },
  })
);

type LoginProps = {
  option: option;
  setOption: (option: option) => void;
  handleClose: () => void;
};

type ValuesLogin = {
  username: string;
  password: string;
  showPassword: boolean;
};
type ValuesSignup = {
  username: string;
  email: string;
  phone: string;
  password: string;
  showPassword: boolean;
};

export default function Login(props: LoginProps) {
  const theme = useTheme();
  const classes = useStyles();
  const { option, setOption, handleClose } = props;
  const [step, setStep] = useState<1 | 2>(1);
  const [valuesLogin, setValuesLogin] = useState<ValuesLogin>({
    username: "",
    password: "",
    showPassword: false,
  });
  const [valuesSignup, setValuesSignup] = useState<ValuesSignup>({
    email: "",
    username: "",
    password: "",
    phone: "",
    showPassword: false,
  });

  const nextStep = () => {
    setStep(2);
  };

  const handleLogin = (categ: "username" | "password", value: string) => {
    setValuesLogin((prev: ValuesLogin) => {
      return { ...prev, [categ]: value };
    });
  };
  const handleSignup = (
    categ: "username" | "password" | "email" | "phone",
    value: string
  ) => {
    setValuesSignup((prev: ValuesSignup) => {
      return { ...prev, [categ]: value };
    });
  };

  const handleClickShowPassword = (type: option) => {
    type === "login"
      ? setValuesLogin((prev) => {
          return { ...prev, showPassword: !prev.showPassword };
        })
      : setValuesSignup((prev) => {
          return { ...prev, showPassword: !prev.showPassword };
        });
  };

  React.useEffect(() => {
    console.log("values login :");
    console.log(valuesLogin);
    console.log("values signup :");
    console.log(valuesSignup);
  }, [valuesLogin, valuesSignup]);

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
            fontSize="2.5rem"
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
            variant="outlined"
            size="small"
            value={valuesLogin.username}
            onChange={(e) => handleLogin("username", e.target.value)}
          />
          <Typography
            variant="body1"
            color="primary"
            style={{ margin: "1rem 0" }}
          >
            Ton mot de passe
          </Typography>
          <OutlinedInput
            type={valuesLogin.showPassword ? "text" : "password"}
            value={valuesLogin.password}
            onChange={(e) => handleLogin("password", e.target.value)}
            className={classes.passwordInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword("login")}
                  edge="end"
                >
                  {valuesLogin.showPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <ButtonFilled
            margin="2rem auto 0 "
            title={"Je me connecte"}
            onClick={() => console.log("login")}
          />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" width="90%" marginTop="1rem">
          {step === 1 ? (
            <>
              <Typography
                variant="body1"
                color="primary"
                style={{ margin: "1rem 0" }}
              >
                Ton email de chef
              </Typography>
              <TextField
                placeholder="phiphi.etchebest@gmail.com"
                variant="outlined"
                size="small"
                value={valuesSignup.email}
                onChange={(e) => handleSignup("email", e.target.value)}
              />
              <Typography
                variant="body1"
                color="primary"
                style={{ margin: "1rem 0" }}
              >
                Ton pseudo de chef
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="PhiphiCuisinier78"
                value={valuesSignup.username}
                onChange={(e) => handleSignup("username", e.target.value)}
              />
            </>
          ) : (
            <>
              <Typography
                variant="body1"
                color="primary"
                style={{ margin: "1rem 0" }}
              >
                Ton numéro de téléphone
              </Typography>
              <TextField
                placeholder="Exemple : 0623456789"
                variant="outlined"
                size="small"
                value={valuesSignup.phone}
                onChange={(e) =>
                  handleSignup("phone", e.target.value.toString())
                }
              />
              <Typography
                variant="body1"
                color="primary"
                style={{ margin: "1rem 0" }}
              >
                Ton mot de passe
              </Typography>
              <OutlinedInput
                type={valuesSignup.showPassword ? "text" : "password"}
                value={valuesSignup.password}
                onChange={(e) => handleSignup("password", e.target.value)}
                className={classes.passwordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("sign-up")}
                      edge="end"
                    >
                      {valuesSignup.showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </>
          )}
          <ButtonFilled
            margin="2rem auto 0 "
            title={step === 1 ? "Etape suivante" : "Je rejoins les cuistos"}
            onClick={() => {
              step === 1 ? nextStep() : console.log("login");
            }}
          />
        </Box>
      )}
      <Box width="90%" margin="1.5rem auto 0" textAlign="center">
        <Typography variant="body1" component="span" color="primary">
          <Box fontSize=".8rem">
            Tu {option === "login" ? "ne fais pas encore" : "fais déjà"} partie
            de la famille ?{" "}
            {option === "login" ? "Connecte-toi" : "Rejoins-nous"} vite en{" "}
            <Typography
              component="span"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() =>
                setOption(option === "sign-up" ? "login" : "sign-up")
              }
            >
              <Box fontSize=".8rem" color="#4AA513" display="inline">
                cliquant ici !
              </Box>
            </Typography>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
