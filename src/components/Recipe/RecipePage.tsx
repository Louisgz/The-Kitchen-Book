/* eslint-disable indent */
// IMPORT GENERAL
import React, { useState, useEffect } from "react";
import { Fire } from "services";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardGeneral from "../Templates/Cards/CardGeneral";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";

// IMPORT COMPONENTS
import Navbar from "../Templates/Navbar/Navbar";
import TextField from "@material-ui/core/TextField";
import { Grid, Box, Typography } from "@material-ui/core";
import RatingPreview from "../Templates/Misc/Rating";

// IMPORT IMAGES
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import cookingTimeIcon from "images/Misc/cookingTimeIcon.svg";
import preparationTimeIcon from "images/Misc/preparationTimeIcon.svg";

interface Props {
  match: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ingredientName: {
      width: "100%",
      color: `${theme.palette.text.primary} !important`,
      "&::before": {
        content: "'' !important",
        border: "none !important",
      },
    },
  })
);

const verifyQuantity = (quantity: any) => {
  return !isNaN(quantity) && quantity !== 0 && quantity !== "";
};

export default function RecipePage(props: Props) {
  const [recipe, setRecipe] = useState<any>(null);
  const [portions, setPortions] = useState<number>(recipe?.portions.quantity);
  const [portionCoef, setPortionCoef] = useState<number>(1);
  const [totalTime, setTotalTime] = useState<string>("");

  const id = props.match.params.id || null;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const getRecipeInfos = async (id: string) => {
    const recipeRef = await Fire.store().collection("recipes").doc(id);
    const recipeInfos = await Fire.doc(recipeRef);
    console.log(recipeInfos);
    recipeInfos.ingredients.sort();
    console.log(recipeInfos);

    setRecipe(recipeInfos);
  };

  useEffect(() => {
    console.log("load page");
    console.log(id);
    getRecipeInfos(id);
  }, []);

  const getAddTime = (time1: number, time2: number) => {
    const time = time1 + time2;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours !== 0 ? hours + "h" : ""} ${
      minutes !== 0 ? minutes + "min" : ""
    }`;
  };

  useEffect(() => {
    if (recipe) {
      setTotalTime(getAddTime(recipe.preparationTime, recipe.cookingTime));
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe) setPortions(recipe.portions.quantity);
  }, [recipe]);

  return (
    <Fade in timeout={500}>
      <Box width="100%" minHeight="100vh" bgcolor="#fafafa">
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{ padding: "2rem 4rem", maxWidth: 1700, margin: "auto" }}
          spacing={mobile ? 3 : 6}
        >
          <Grid item xs={12} container justify="flex-start">
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
              startIcon={<ArrowBackIcon />}
              onClick={() => history.push("/recipes")}
            >
              Retour
            </Button>
          </Grid>
          <Grid container item sm={12} md={5} spacing={mobile ? 3 : 6}>
            <Grid item xs={12}>
              <Box
                width="100%"
                height="100%"
                paddingTop="100%"
                borderRadius="10px"
                style={{
                  background: `center / cover no-repeat url(${recipe?.image})`,
                  paddingTop: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CardGeneral>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Box display="flex" width="50%" alignItems="center">
                    <ShoppingCartIcon
                      color="primary"
                      style={{ marginRight: ".7rem" }}
                      fontSize="default"
                    />
                    <Typography variant="h6">Ingrédients :</Typography>
                  </Box>
                  <Box
                    display="flex"
                    width="45%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <RemoveIcon
                      color="primary"
                      style={{ cursor: portions >= 1 ? "pointer" : "default" }}
                      fontSize="small"
                      onClick={() => {
                        setPortionCoef((prev) =>
                          portions > 1
                            ? (portions - 1) / recipe?.portions.quantity
                            : portions / recipe?.portions.quantity
                        );
                        setPortions((prev) => (prev > 1 ? prev - 1 : prev));
                      }}
                    />
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="h6"
                        color="primary"
                        component={"span"}
                      >
                        <Box marginLeft=".25rem" marginRight=".25rem">
                          {portions}
                        </Box>
                      </Typography>
                      <Typography variant="h6" color="primary" component="span">
                        <Box marginRight=".25rem">
                          {recipe?.portions.measure}
                        </Box>
                      </Typography>
                    </Box>
                    <AddIcon
                      color="primary"
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => {
                        setPortionCoef(
                          (portions + 1) / recipe?.portions.quantity
                        );
                        setPortions((prev) => {
                          return prev + 1;
                        });
                      }}
                    />
                  </Box>
                </Box>
                <Box width="100%" marginTop="1rem" padding="0 .25rem">
                  {recipe?.ingredients.map((ingredient: any) => (
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="flex-start"
                      key={ingredient.id}
                      marginTop="1rem"
                    >
                      <Typography variant="body1">-</Typography>
                      {verifyQuantity(ingredient.quantity) && (
                        <Typography
                          variant="body1"
                          style={{
                            marginLeft: ".75rem",
                            color: theme.palette.primary.main,
                          }}
                        >
                          {Math.floor(ingredient.quantity * portionCoef) !== 0
                            ? Math.floor(ingredient.quantity * portionCoef)
                            : 1}
                        </Typography>
                      )}
                      {!isNaN(ingredient.unit) && ingredient.unit && (
                        <Typography
                          variant="body1"
                          style={{ marginLeft: ".25rem" }}
                        >
                          {ingredient.unit}
                        </Typography>
                      )}
                      <Typography
                        variant="body1"
                        style={{ marginLeft: ".45rem" }}
                      >
                        {ingredient.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardGeneral>
            </Grid>
          </Grid>
          <Grid item sm={12} md={7}>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography variant="h3">{recipe?.title}</Typography>
              <Box display="flex" alignItems="center">
                <WatchLaterIcon color="primary" />
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ marginLeft: ".75rem" }}
                >
                  {totalTime}
                </Typography>
              </Box>
            </Box>
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
              marginTop="1rem"
            >
              <RatingPreview difficulty={recipe?.difficulty} size="default" />
            </Box>
            <Box width="100%" marginTop="1rem">
              <CardGeneral>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box display="flex" width="50%" alignItems="center">
                    <LocalDiningIcon
                      color="primary"
                      style={{ marginRight: ".7rem" }}
                      fontSize="large"
                    />
                    <Typography variant="h6">Préparation :</Typography>
                  </Box>
                  <Box
                    display="flex"
                    width="45%"
                    flexDirection="column"
                    alignItems="flex-end"
                  >
                    <Box
                      display="flex"
                      width="50%"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <img
                        src={preparationTimeIcon}
                        alt=""
                        style={{ width: "1.75rem", marginRight: ".7rem" }}
                      />
                      <Typography variant="body1" color="primary">
                        {recipe?.preparationTime} min
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      width="50%"
                      alignItems="center"
                      justifyContent="flex-end"
                      marginTop=".5rem"
                    >
                      <img
                        src={cookingTimeIcon}
                        alt=""
                        style={{ width: "1.75rem", marginRight: ".7rem" }}
                      />
                      <Typography variant="body1" color="primary">
                        {recipe?.cookingTime} min
                      </Typography>{" "}
                    </Box>
                  </Box>
                </Box>
                <Box width="100%" marginTop="1rem" padding="0 .25rem">
                  {recipe?.recipe.map((step: any, index: any) => (
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="center"
                      key={"step_recipe_" + index}
                      marginTop="1rem"
                    >
                      {isNaN(parseInt(step.charAt(0))) ? (
                        <Typography variant="body2">-</Typography>
                      ) : (
                        <strong>{step}</strong>
                      )}
                      <Typography
                        variant="body2"
                        style={{
                          marginLeft: ".75rem",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {isNaN(parseInt(step.charAt(0))) && step}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardGeneral>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
