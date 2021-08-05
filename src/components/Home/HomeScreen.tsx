import React, { useState, useEffect } from "react";
import Navbar from "../Templates/Navbar/Navbar";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Box, Typography } from "@material-ui/core";
import sections from "./HomeSectionsData";
import HomeSection from "../Templates/Sections/HomeSection";
import { Fire } from "../../services";
import ButtonFilled from "../Templates/Buttons/ButtonFilled";
import Particles from "../Templates/Particles/Particles";
import SmallCard from "../Templates/Cards/SmallCard";
import RecipePreview from "../Recipes/RecipePreview";

//Images
import Plats_veggie from "images/Plats/Plats_veggie.png";
import HomeGeometric1 from "images/Geometric/HomeGeometric1.svg";
import HomeGeometric2 from "images/Geometric/HomeGeometric2.svg";
import { ReactComponent as IceCream } from "images/Accueil/Icecream.svg";
import { ReactComponent as SaladIcon } from "images/Accueil/salad_icon.svg";
import { ReactComponent as DishIcon } from "images/Accueil/dish_icon.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeScreen: {
      maxWidth: 1300,
      margin: "auto",
      paddingTop: "5rem",
      position: "relative",
    },
    smallCard: {
      "& $icon": {
        fill: "#65BC30 !important",
      },

      "&:hover $icon": {
        fill: "white !important",
      },
    },
    icon: {
      // fill: "red",
    },
  })
);

const HomeScreen = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Fade in timeout={500}>
      <>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid container className={classes.homeScreen}>
          <Particles />
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                paddingLeft="2rem"
              >
                <Typography variant="h1" component="span">
                  <Box
                    fontWeight={600}
                    style={{ marginTop: "1rem", maxWidth: "600px" }}
                  >
                    Votre site de recettes de cuisine favori !
                  </Box>
                </Typography>
                <Typography variant="h5" component="span">
                  <Box style={{ marginTop: "2rem", maxWidth: "350px" }}>
                    Vous retrouverez ici nos meilleures recettes, sélectionnées
                    rien que pour vous !
                  </Box>
                </Typography>
                <Box marginTop="2rem">
                  <ButtonFilled title="J'ai faim" path="recipes" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box
                position="absolute"
                minHeight="fit-content"
                zIndex="-1"
                style={{ top: 0, right: 0 }}
              >
                <img src={HomeGeometric1} alt="" />
              </Box>
              <Box width="100%" color="white">
                <img src={Plats_veggie} alt="" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-around"
                width="100%"
                maxWidth="900px"
                margin="auto"
                marginTop="10rem"
              >
                <SmallCard
                  title="Entrées"
                  path=""
                  classe={classes.smallCard}
                  Icon={<SaladIcon className={classes.icon} />}
                />
                <SmallCard
                  title="Plats"
                  path=""
                  classe={classes.smallCard}
                  Icon={<DishIcon className={classes.icon} />}
                />
                <SmallCard
                  title="Desserts"
                  path=""
                  classe={classes.smallCard}
                  Icon={<IceCream className={classes.icon} />}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                position: "relative",
                paddingTop: "10rem",
                overflow: "hidden",
              }}
            >
              <Box
                position="absolute"
                minHeight="fit-content"
                zIndex="-1"
                style={{ top: 0, left: 0 }}
              >
                <img src={HomeGeometric2} alt="" />
              </Box>
              <Box
                width="100%"
                color="white"
                display="flex"
                justifyContent="center"
              >
                <img src={Plats_veggie} alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} style={{ paddingBottom: "15rem" }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                paddingLeft="2rem"
                paddingTop="10rem"
              >
                <Typography variant="h1" component="span">
                  <Box
                    fontWeight={600}
                    style={{ marginTop: "1rem", maxWidth: "600px" }}
                  >
                    Découvrez nos recettes du moment
                  </Box>
                </Typography>
                <Typography variant="h5" component="span">
                  <Box style={{ marginTop: "2rem", maxWidth: "400px" }}>
                    Nos recettes changent très souvent et nos vous proposons ici
                    nos recettes les plus populaires.
                  </Box>
                </Typography>
                <Box marginTop="2rem">
                  <ButtonFilled title="Je veux voir" path="recipes" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                width="100%"
                height="100%"
                bgcolor="#FFF9F5"
                maxWidth="1300px"
                margin="auto"
                paddingTop="3rem"
                paddingBottom="7rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h2" component="span">
                  <Box color="#FF5C00" fontWeight={600} marginBottom="3rem">
                    Nos recettes favorites
                  </Box>
                </Typography>
                <Box
                  width="80%"
                  display="flex"
                  justifyContent="space-between"
                  margin="auto"
                >
                  <Box width="28%">
                    <RecipePreview
                      title="test"
                      difficulty={4}
                      image="https://firebasestorage.googleapis.com/v0/b/the-kitchen-book-41408.appspot.com/o/recipes%2FInsta2_1626379555055.png?alt=media&token=4ace2d17-8ac8-46fb-b34f-9264de9ba4f3"
                      objectID="eef"
                    />
                  </Box>
                  <Box width="28%">
                    <RecipePreview
                      title="test"
                      difficulty={4}
                      image="https://firebasestorage.googleapis.com/v0/b/the-kitchen-book-41408.appspot.com/o/recipes%2FInsta2_1626379555055.png?alt=media&token=4ace2d17-8ac8-46fb-b34f-9264de9ba4f3"
                      objectID="eef"
                    />
                  </Box>
                  <Box width="28%">
                    <RecipePreview
                      title="test"
                      difficulty={4}
                      image="https://firebasestorage.googleapis.com/v0/b/the-kitchen-book-41408.appspot.com/o/recipes%2FInsta2_1626379555055.png?alt=media&token=4ace2d17-8ac8-46fb-b34f-9264de9ba4f3"
                      objectID="eef"
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </>
    </Fade>
  );
};

export default HomeScreen;
