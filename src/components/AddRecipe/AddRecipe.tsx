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
import { NewItemsProps } from "../../Types/NewItemsProps";

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
import FormControl from "@material-ui/core/FormControl";
import FiltersInput from "./FiltersInput";
import ButtonFilled from "../Templates/Buttons/ButtonFilled";

// Import images
import fond_pizza from "../../images/Misc/fond_pizza.jpg";
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

  const [title, setTitle] = useState<string>("");
  const [titleHelper, setTitleHelper] = useState<string>("");
  const [portions, setPortions] = useState<any>([]);
  const [portionsHelper, setPortionsHelper] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState<number>();
  const [cookingTimeHelper, setCookingTimeHelper] = useState<string>("");
  const [preparationTime, setPreparationTime] = useState<number>();
  const [preparationTimeHelper, setPreparationTimeHelper] =
    useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(1);
  const [ingredients, setIngredients] = useState<any>([
    { quantity: "", unit: "", name: "", id: randomID() },
  ]);
  const [picture, setPicture] = useState<string>("");
  const [pictureExist, setPictureExist] = useState<boolean>(false);
  const [pictureHasChanged, setPictureHasChanged] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<string[]>([]);
  const [introduction, setIntroduction] = useState("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertType, setAlertType] = useState<any>("info");
  const recipesCollection = Fire.store().collection("recipes");
  const [loading, setLoading] = useState<boolean>(false);

  const fileChanged = async (evt: any) => {
    try {
      const url = await Tools.requestSmallImage(evt);
      setPicture(url);
    } catch (err) {
      alert(err.message);
    }
  };

  const makeAlert = (text: string, severity = "info") => {
    console.log("le texte de l'alerte est : " + text);
    setAlertText((prevText) => {
      console.log("Le texte precedant est : ", prevText);
      return prevText === "" ? text : prevText;
    });
    setAlertType(severity);
    setTimeout(() => {
      setAlertText("");
      setAlertType("info");
    }, 2000);
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

  const onPressEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      saveInfos();
    }
  };

  const saveInfos = async () => {
    try {
      let fieldsFilled = true;
      const id = randomID();
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
        if (pictureHasChanged) {
          const link =
            "recipes/" + title.replace(/\s+/g, "-") + "_" + date + ".png";
          image = await Fire.uploadFile(link, picture);
          setPicture(link);
          setPictureExist(true);
          setPictureHasChanged(false);
        }
      } else {
        // makeAlert("Merci de rentrer une belle image !", "error");
        // fieldsFilled = false;
      }

      if (title === "" || title === " ") {
        makeAlert(
          "Merci de renseigner un titre pour votre excellente recette !",
          "error"
        );
        setTitleHelper("Veuillez entrer un titre");
        fieldsFilled = false;
      } else {
        setTitleHelper("");
      }

      if (portions.length === 0) {
        makeAlert(
          "Merci de renseigner la portion pour votre excellente recette !",
          "error"
        );
        setPortionsHelper("Veuillez entrer la portion");
        fieldsFilled = false;
      } else {
        setPortionsHelper("");
      }

      if (!preparationTime && preparationTime !== 0) {
        makeAlert(
          "Merci de renseigner le temps de pr??paration pour votre excellente recette !",
          "error"
        );
        setPreparationTimeHelper("Veuillez entrer le temps de preparation");
        fieldsFilled = false;
      } else {
        setPreparationTimeHelper("");
      }

      if (!cookingTime && cookingTime !== 0) {
        makeAlert(
          "Merci de renseigner le temps de cuisson pour votre excellente recette !",
          "error"
        );
        setCookingTimeHelper(
          "Veuillez entrer le temps de cuisson, s'il n'y a pas de temps de cuisson, rentrez 0"
        );
        fieldsFilled = false;
      } else {
        setCookingTimeHelper("");
      }

      if (ingredients.length < 1) {
        makeAlert("Merci de renseigner au moins un ingr??dient", "error");
        fieldsFilled = false;
      }

      if (!fieldsFilled) {
        makeAlert("Merci de remplir tous les champs", "error");
      } else {
        const item: NewItemsProps = {
          title: title,
          introduction: introduction,
          filters: filters,
          cookingTime: cookingTime,
          preparationTime: preparationTime,
          difficulty: difficulty,
          portions: portions,
          ingredients: ingredients,
          recipe: recipe,
          image: image,
          dateString: today,
          date: new Date(),
          id: id,
        };
        await recipesCollection.doc(id).set(item);
        makeAlert(
          "Mmmh, votre recette a bien ??t?? ajout??e, merci pour votre contribution !",
          "success"
        );
      }
    } catch (err) {
      makeAlert(
        "A??e... Il y a eu une erreur lors de l'envoi du formulaire, rechargez la page et r??essayez.",
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
            label="Quantit??"
            type="number"
            onBlur={(e) => {
              setIngredients((prev: any[]) => {
                const newIngredients = prev;
                if (e.target.value !== "")
                  newIngredients[index].quantity = parseInt(e.target.value);
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
            label="Unit??"
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
            placeholder="de lait"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            label="Ingr??dient"
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
      <Fade in timeout={500}>
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
                <FormLabel
                  component="legend"
                  style={{ margin: "1rem 0 .5rem" }}
                >
                  Image de la recette :
                </FormLabel>
                <div className="flex-row">
                  <div className="input-preview">
                    {picture !== "" && (
                      <img
                        alt="Image"
                        src={picture}
                        style={{ maxWidth: 300 }}
                      />
                    )}
                  </div>
                  <div>
                    <InputBase
                      type="file"
                      onChange={(evt) => {
                        setPictureHasChanged(true);
                        fileChanged(evt);
                      }}
                      disabled={loading}
                      error={!pictureExist}
                    />
                  </div>
                </div>
              </div>
              <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
                Titre*
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
                placeholder="ex : Acheter des escalopes de veau de qualit??, et les demander tr??s fines au boucher."
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => setIntroduction(e.target.value)}
              />
              <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
                Portions*
              </FormLabel>
              <TextField
                placeholder="ex : 6 verrines / 2 personnes"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={portionsHelper}
                variant="outlined"
                onChange={(e) => {
                  setPortions({
                    quantity: parseInt(e.target.value.split(" ", 2)[0]),
                    measure: e.target.value.split(" ", 2)[1],
                  });
                }}
                error={!(portionsHelper === "" || portionsHelper === " ")}
              />
              <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
                Type*
              </FormLabel>
              <FiltersInput filters={filters} setFilters={setFilters} />
              <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
                Ingr??dients*
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
                Temps de pr??paration* (minutes)
              </FormLabel>
              <TextField
                placeholder="ex : 35"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={preparationTimeHelper}
                error={
                  !(
                    preparationTimeHelper === "" ||
                    preparationTimeHelper === " "
                  )
                }
                type="number"
                onChange={(e) => {
                  e.target.value.length !== 0 &&
                    setPreparationTime(
                      parseInt(e.target.value.split(" ", 2)[0])
                    );
                }}
              />
              <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
                Temps de cuisson* (minutes)
              </FormLabel>
              <TextField
                placeholder="ex : 10"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={cookingTimeHelper}
                error={!(cookingTimeHelper === "" || cookingTimeHelper === " ")}
                type="number"
                onChange={(e) => {
                  e.target.value.length !== 0 &&
                    setCookingTime(parseInt(e.target.value.split(" ", 2)[0]));
                }}
              />
              <FormLabel component="legend" style={{ margin: "1rem 0" }}>
                Difficult?? (sur 5)
              </FormLabel>
              <CustomizedRatings setDifficulty={setDifficulty} />
              <FormLabel component="legend" style={{ margin: "1rem 0 0" }}>
                Recette* (sautez une ligne entre chaque ??tape)
              </FormLabel>
              <TextField
                placeholder="1 - La p??te &#13;&#10;M??langer la farine et les oeufs pour former une p??te homog??ne. &#13;&#10;2 - La cuisson &#13;&#10;Faire cuire pendant 5 minutes.&#13;&#10;3 - Derni??re ??tape &#13;&#10;R??galez-vous !"
                multiline
                fullWidth
                rows={8}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onBlur={(e) => {
                  const recipesArray = e.target.value.split("\n");
                  const filteredArray = recipesArray.filter(
                    (el) => el != null && el != ""
                  );
                  setRecipe(filteredArray);
                }}
              />
              <ButtonFilled
                onClick={saveInfos}
                margin="1rem 0 0"
                onKeyDown={onPressEnterKey}
                title="Envoyer"
              />
            </form>
            <Box position="fixed" bottom="10%" left="5%">
              {alertText !== "" && alertText !== " " && (
                <Alert severity={alertType}>{alertText}</Alert>
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default AddRecipe;
