// GENERAL
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { Fire, Tools } from "../../services";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// COMPONENTS
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import FormLabel from "@material-ui/core/FormLabel";
import CustomizedRatings from "./CustomizedRatings";
import Navbar from "../Templates/Navbar/Navbar";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FiltersInput from "./FiltersInput";
// Images
import fond_pizza from "images/Misc/fond_pizza.jpg";
import IconButton from "@material-ui/core/IconButton";

//Icons
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    measure: {
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        width: "45%",
      },
    },
    ingredientName: {
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    btnDelete: {
      width: "10%",
      [theme.breakpoints.down("sm")]: {
        width: "15%",
      },
    },
    outbox: {
      padding: "5vw 10vw",
      background: `url(${fond_pizza})`,

      [theme.breakpoints.down("sm")]: {
        padding: "5vw",
      },
    },
  })
);

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddRecipe = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const randomID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const [title, setTitle] = useState("");
  const [titleHelper, setTitleHelper] = useState("");
  const [portions, setPortions] = useState<any>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [cooking_time, setCooking_time] = useState("");
  const [preparation_time, setPreparation_time] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredients, setIngredients] = useState<any>([
    { quantity: "", unit: "", name: "", id: randomID() },
  ]);
  const [picture, setPicture] = useState("");
  const [pictureExist, setPictureExist] = useState(false);
  const [recipe, setRecipe] = useState<any>([]);
  const [introduction, setIntroduction] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState<any>("info");
  const recipesCollection = Fire.store().collection("Recipies");
  const [loading, setLoading] = useState(false);

  const fileChanged = async (evt: any) => {
    try {
      const url = await Tools.requestSmallImage(evt);
      setPicture(url);
    } catch (err) {
      alert(err.message);
    }
  };

  const makeAlert = (text: string, severity = "info") => {
    setAlertText((prevText) => (prevText === "" ? text : prevText));
    setAlertType(severity);
    setTimeout(() => {
      setAlertText("");
      setAlertType("info");
    }, 3000);
  };

  const addIngredient = () => {
    setIngredients((prev: any[]) => {
      const newIngredients = [
        ...prev,
        {
          quantity: "",
          unit: "",
          name: "",
          id: randomID(),
        },
      ];
      return newIngredients;
    });
  };
  const removeIngredient = (index: number) => {
    setIngredients((prev: any[]) => {
      const newIngredients = prev;
      return [
        ...newIngredients.splice(0, index),
        ...newIngredients.splice(index),
      ];
    });
  };

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const saveInfos = async () => {
    try {
      let fieldsFilled = true;

      const newDate = new Date();
      const date = newDate.getTime();
      const dd = String(newDate.getDate()).padStart(2, "0");
      const mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = newDate.getFullYear();
      const hh = newDate.getHours();
      const min =
        newDate.getMinutes() < 10
          ? newDate.getMinutes() + "0"
          : newDate.getMinutes();
      const today = dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min;

      let image = "";

      if (picture !== "") {
        image = await Fire.uploadFile(
          "recipes/" + title.replace(/\s+/g, "-") + "_" + date + ".png",
          picture
        );
        setPictureExist(true);
      } else {
        makeAlert("Merci de rentrer une belle image !", "error");
        fieldsFilled = false;
      }

      if (title === "" || title === " ") {
        makeAlert(
          "Merci de renseigner un titre pour votre excellente recette !",
          "error"
        );
        setTitleHelper("Veuillez entrer un titre");
        return;
      } else {
        setTitleHelper("");
      }

      if (!fieldsFilled) {
        makeAlert("Merci de remplir tous les champs", "error");
      }

      const item = {
        title: title,
        introduction: introduction,
        type: type,
        filters: filters,
        cooking_time: cooking_time,
        preparation_time: preparation_time,
        difficlty: difficulty,
        portions: portions,
        ingredients: ingredients,
        recipe: recipe,
        image: image,
        date: today,
      };
      console.log(item);
      await recipesCollection.doc().set(item);
      makeAlert(
        "Mmmh, votre recette a bien été ajoutée, merci pour votre contribution !",
        "success"
      );
    } catch (err) {
      makeAlert(
        "Aïe... Il y a eu une erreur lors de l'envoi du formulaire, rechargez la page et réessayez.",
        "error"
      );
      console.log(err);
    }
  };

  type newIngredientsProps = {
    quantity: number;
    unit: string;
    name: string;
    id: string;
    index: number;
  };

  function NewIngredient(props: newIngredientsProps) {
    const { quantity, unit, name, id, index } = props;
    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        id={id}
        key={id}
        marginBottom="1rem"
      >
        <FormControl className={classes.measure}>
          <TextField
            placeholder="75"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            defaultValue={quantity}
            label="Quantité"
            type="number"
            onBlur={(e) => {
              setIngredients((prev: any[]) => {
                const newIngredients = prev;
                newIngredients[index].quantity = e.target.value;
                return newIngredients;
              });
            }}
          />
        </FormControl>
        <FormControl className={classes.measure}>
          <TextField
            placeholder="cl"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            defaultValue={unit}
            label="Unité"
            onBlur={(e) => {
              setIngredients((prev: any[]) => {
                const newIngredients = prev;
                newIngredients[index].unit = e.target.value;
                return newIngredients;
              });
            }}
          />
        </FormControl>
        <FormControl className={classes.ingredientName}>
          <TextField
            placeholder="lait"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            label="Ingrédient"
            defaultValue={name}
            onBlur={(e) => {
              setIngredients((prev: any[]) => {
                const newIngredients = prev;
                newIngredients[index].name = e.target.value;
                return newIngredients;
              });
            }}
          />
        </FormControl>
        <IconButton
          aria-label="delete"
          size="small"
          disabled={index === 0}
          style={{ opacity: index === 0 ? "0" : "1" }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              removeIngredient(index);
            }
          }}
        >
          {
            <DeleteOutlineIcon
              fontSize="large"
              onClick={() => removeIngredient(index)}
            />
          }
        </IconButton>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Box className={classes.outbox}>
        <Box
          padding={mobile ? "2rem" : "2rem 3rem"}
          bgcolor="rgba(255, 255, 255, .95)"
          maxWidth="1250px"
          margin="auto"
          borderRadius="2rem"
        >
          <form action="">
            <div className="input-wrapper">
              <FormLabel component="legend" style={{ margin: "1rem 0 .5rem" }}>
                Image de la recette :
              </FormLabel>
              <div className="flex-row">
                <div className="input-preview">
                  {picture !== "" && (
                    <img alt="Image" src={picture} style={{ maxWidth: 300 }} />
                  )}
                </div>
                <div>
                  <InputBase
                    type="file"
                    onChange={(evt) => fileChanged(evt)}
                    disabled={loading}
                    error={!pictureExist}
                  />
                </div>
              </div>
            </div>
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Titre
            </FormLabel>
            <TextField
              placeholder="ex : Tarte aux fraises"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              helperText={titleHelper}
              error={!(titleHelper === "" || titleHelper === " ")}
            />
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Introduction
            </FormLabel>
            <TextField
              placeholder="ex : Acheter des escalopes de veau de qualité, et les demander très fines au boucher."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => setIntroduction(e.target.value)}
            />
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Portions
            </FormLabel>
            <TextField
              placeholder="ex : 6 verrines / 2 personnes"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                setPortions([
                  { quantity: e.target.value.split(" ", 2)[0] },
                  { measure: e.target.value.split(" ", 2)[1] },
                ]);
              }}
            />
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Type
            </FormLabel>
            {/* <TextField
              placeholder="ex : dessert"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                setType(e.target.value);
              }}
            /> */}
            <FiltersInput filters={filters} setFilters={setFilters} />
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Ingrédients
            </FormLabel>
            {ingredients.map((ingredient: any, index: number) => {
              return (
                <NewIngredient
                  key={ingredient.id}
                  {...ingredient}
                  index={index}
                />
              );
            })}
            <IconButton
              aria-label="delete"
              size="small"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  addIngredient();
                }
              }}
            >
              <AddIcon fontSize="inherit" onClick={addIngredient} />
            </IconButton>
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Temps de préparation (minutes)
            </FormLabel>
            <TextField
              placeholder="ex : 35"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                setPreparation_time(e.target.value.split(" ", 2)[0]);
              }}
            />
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Temps de cuisson (minutes)
            </FormLabel>
            <TextField
              placeholder="ex : 10"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                setCooking_time(e.target.value.split(" ", 2)[0]);
              }}
            />
            <FormLabel component="legend" style={{ margin: "1rem 0" }}>
              Difficulté (sur 5)
            </FormLabel>
            <CustomizedRatings setDifficulty={setDifficulty} />
            <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
              Recette (sautez une ligne entre chaque étape)
            </FormLabel>
            <TextField
              placeholder="Mélanger la farine et les oeufs pour former une pâte homogène. &#13;&#10;Faire cuire pendant 5 minutes.&#13;&#10;Régalez-vous !"
              multiline
              fullWidth
              rows={8}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                const recipesArray = e.target.value.split("\n");
                setRecipe(recipesArray);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={saveInfos}
              style={{ marginTop: "1rem" }}
            >
              Envoyer
            </Button>
          </form>
          <Box position="fixed" bottom="10%" left="5%">
            {alertText !== "" && alertText !== " " && (
              <Alert severity={alertType}>{alertText}</Alert>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AddRecipe;
