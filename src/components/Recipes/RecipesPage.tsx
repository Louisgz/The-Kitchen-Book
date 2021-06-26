// IMPORT GENERAL
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Fire } from "../../services";

// IMPORT COMPONENTS
import Navbar from "../Templates/Navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import RecipePreview from "./RecipePreview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeScreen: {
      maxWidth: 1300,
      margin: "auto",
    },
  })
);

export default function RecipesPage() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [recipes, setRecipes] = useState<any>(null);

  const getRecipes = async () => {
    try {
      const recipesRef = Fire.store().collection("Recipes");
      const recipes = await Fire.list(recipesRef);
      setRecipes(recipes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(recipes);
  }, [recipes]);
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Fade in timeout={500}>
      <>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid container className={classes.homeScreen}>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            style={{ marginTop: "2rem" }}
          >
            {recipes &&
              recipes.map((recipe: any) => {
                console.log(recipe);
                return (
                  <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                    <RecipePreview {...recipe} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </>
    </Fade>
  );
}
