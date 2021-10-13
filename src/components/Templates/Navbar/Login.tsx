/* eslint-disable indent */
import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Fire } from "services";
import {
  makeStyles,
  // Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ButtonFilled from "../Buttons/ButtonFilled";
import Box from "@material-ui/core/Box";
import Logo from "../../../images/Misc/Logo.svg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";

import { option } from "../../../Types/Login";

const useStyles = makeStyles(
  // (theme: Theme)
  () =>
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

const steps = ["étape 1", "étape 2"];

type LoginProps = {
  option: option;
  setOption: (option: option) => void;
  handleClose: () => void;
  closeCard: () => void;
};

type ValuesLogin = {
  email: string;
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
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const { option, setOption, handleClose, closeCard } = props;
  const [step, setStep] = useState<1 | 2>(1);
  const history = useHistory();
  const [valuesLogin, setValuesLogin] = useState<ValuesLogin>({
    email: "",
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
  const [registering, setRegistering] = useState(false);
  const [loginIn, setLoginIn] = useState(false);
  // const dispatch = useDispatch();
  const [message, setMessage] = React.useState<string>("");
  const [typeMessage, setTypeMessage] = useState<"error" | "success" | "info">(
    "error"
  );

  React.useEffect(() => {
    console.log(loginIn);
    console.log(Fire.auth().currentUser);
  }, [loginIn]);

  const login = async () => {
    console.log("login in...");
    const { email, password } = valuesLogin;

    if (!email?.trim().length) {
      handleMessage("error", "Veuillez saisir votre email de connexion");
      return;
    }
    if (!password?.trim().length) {
      handleMessage("error", "Veuillez saisir votre mot de passe");
      return;
    }

    setLoginIn(true);
    try {
      await Fire.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("logged in");
          console.log(user);
        });
      handleMessage("error", "Veuillez saisir votre email de connexion");
      closeCard();
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/wrong-password":
          handleMessage("error", "Identifiants invalides");
          break;
        case "auth/user-not-found":
          handleMessage("error", "Identifiants invalides");
          break;
        case "auth/invalid-email":
          handleMessage("error", "L'email entré est invalide");
          break;
        default:
          handleMessage("error", "Une erreur est survenue");
          break;
      }
    }
    setLoginIn(false);
  };

  const register = async () => {
    console.log("registering...");
    const { email, username, password, phone } = valuesSignup;
    // const { source } = document.location
    if (!email?.trim().length) {
      handleMessage("error", "Veuillez saisir votre email de connexion");
      setStep(1);
      return;
    } else if (!username?.trim().length) {
      handleMessage("error", "Veuillez saisir votre pseudo");
      setStep(1);
      return;
    }

    setLoading(true);
    try {
      setRegistering(true);
      await Fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("registered");
          console.log(user);
          setTypeMessage("success");
          setMessage("Votre compte a bien été créé !");
        });
      setRegistering(false);
      closeCard();
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/email-already-in-use":
          handleMessage(
            "error",
            "L'email entré est déjà utilisé. Connectez-vous."
          );
          setStep(1);
          break;
        case "auth/invalid-password":
          handleMessage("error", "Identifiants invalides");
          setStep(1);
          break;
        case "auth/user-not-found":
          handleMessage("error", "Identifiants invalides");
          setStep(1);
          break;
        case "auth/invalid-email":
          handleMessage("error", "L'email entré est invalide");
          setStep(1);
          break;
        case "auth/weak-password":
          handleMessage("error", "Mot de passe trop faible");
          setStep(2);
          break;
        default:
          handleMessage("error", "Une erreur est survenue");
          break;
      }
    }

    setLoading(false);
  };

  const handleLogin = (categ: "email" | "password", value: string) => {
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

  const handleMessage = (type: "error" | "success", errorMessage: string) => {
    console.log(errorMessage);
    setTypeMessage(type);
    setMessage(errorMessage);

    setTimeout(() => {
      setMessage("");
    }, 3500);
  };

  // React.useEffect(() => {
  //   console.log("values login :");
  //   console.log(valuesLogin);
  //   console.log("values signup :");
  //   console.log(valuesSignup);
  // }, [valuesLogin, valuesSignup]);

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
            type="email"
            value={valuesLogin.email}
            onChange={(e) => handleLogin("email", e.target.value)}
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
          <Box marginTop={message ? "1rem" : "0"}>
            {message !== "" && message !== " " && (
              <Alert severity={typeMessage}>{message}</Alert>
            )}
          </Box>
          <ButtonFilled
            disabled={loginIn}
            margin="2rem auto 0 "
            title={"Je me connecte"}
            onClick={() => login()}
          />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" width="90%" marginTop="1rem">
          <Stepper activeStep={step - 1} alternativeLabel>
            {steps.map((label: string, index: number) => (
              <Step key={label}>
                <StepLabel
                  onClick={() => (index === 1 ? setStep(2) : setStep(1))}
                  style={{ cursor: "pointer", color: "white !important" }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
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
                type="email"
                onChange={(e) => handleSignup("email", e.target.value)}
                autoComplete="email"
                id="signupMail"
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
                type="text"
                placeholder="PhiphiCuisinier78"
                value={valuesSignup.username}
                onChange={(e) => handleSignup("username", e.target.value)}
                autoComplete="nickname"
                id="signupUsername"
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
                placeholder="Exemple : 0612345678"
                variant="outlined"
                size="small"
                type="tel"
                autoComplete="tel-national"
                value={valuesSignup.phone}
                onChange={(e) =>
                  handleSignup("phone", e.target.value.toString())
                }
                id="signupPhone"
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
                id="signupPassword"
              />
            </>
          )}
          <Box marginTop={message ? "1rem" : "0"}>
            {message !== "" && message !== " " && (
              <Alert severity={typeMessage}>{message}</Alert>
            )}
          </Box>
          <ButtonFilled
            margin="2rem auto 0 "
            title={step === 1 ? "Etape suivante" : "Je rejoins les cuistos"}
            onClick={() => {
              step === 1 ? setStep(2) : register();
            }}
            disabled={registering}
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
