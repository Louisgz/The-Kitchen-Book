import React from "react";
import Navbar from "../Templates/Navbar/Navbar";
import {
  makeStyles,
  useTheme,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
// import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Box, Typography } from "@material-ui/core";
import { Fire } from "../../services";
import ButtonFilled from "../Templates/Buttons/ButtonFilled";
import Particles from "../Templates/Particles/Particles";
import SmallCard from "../Templates/Cards/SmallCard";
import RecipePreview from "../Recipes/RecipePreview";
import { NewItemsProps } from "../../Types/NewItemsProps";

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
      paddingTop: "5rem",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "3rem",
      },
    },
    maxWidth: {
      maxWidth: 1300,
      margin: "auto",
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

const HomeScreen = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  // const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [imgGap, setImgGap] = React.useState(0);

  const verifyImgGap = () => {
    const newGap =
      window.innerWidth < 1300 ? 0 : -((window.innerWidth - 1300) / 2);
    setImgGap(newGap);
  };

  window.addEventListener("resize", () => {
    verifyImgGap();
  });

  const getHomepageRecipes = async () => {
    const RECIPES_ID = [
      "UxpLXs6oRZSrccLHQAC5",
      "IC67IgFIrLTCeoKIwERJ",
      "_ftpqqtynt",
    ];

    const promises = RECIPES_ID.forEach(async (id) => {
      const recipeRef = Fire.store().collection("recipes").doc(id);
      const recipe = await Fire.list(recipeRef);
      setRecipes((prev: any[]) => [...prev, ...recipe]);
    });
    await Promise.all([promises]);
  };

  React.useEffect(() => {
    getHomepageRecipes();
    verifyImgGap();
  }, []);

  return (
    <Fade in timeout={500}>
      <>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid container className={classes.homeScreen}>
          {!mobile && <Particles />}
          <Grid container item xs={12} className={classes.maxWidth}>
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
                    style={{
                      marginTop: "1rem",
                      maxWidth: "600px",
                      color: mobile ? "white" : "inherit",
                    }}
                  >
                    Votre site de recettes de cuisine favori !
                  </Box>
                </Typography>
                <Typography variant="h5" component="span">
                  <Box
                    style={{
                      marginTop: "2rem",
                      maxWidth: "350px",
                      color: mobile ? "white" : "inherit",
                    }}
                  >
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
                style={{
                  top: 0,
                  right: imgGap,
                }}
              >
                <img src={HomeGeometric1} alt="Fond géometric orange" />
              </Box>
              <Box
                width="100%"
                color="white"
                display="flex"
                justifyContent="center"
              >
                <img
                  src={Plats_veggie}
                  alt="Plat veggie"
                  style={{
                    maxWidth: !mobile ? "40vw" : "80vw",
                    marginTop: mobile ? "3rem" : "0",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                width="100%"
                height="100%"
                flexWrap="wrap"
                maxWidth={mobile ? "90vw" : "900px"}
                margin="auto"
                marginTop={mobile ? "5rem" : "5vw"}
                marginBottom={mobile ? "5rem" : "5vw"}
              >
                <SmallCard
                  title="Entrées"
                  path="/recipes?q=entree"
                  classe={classes.smallCard}
                  Icon={
                    <SaladIcon
                      className={classes.icon}
                      fontSize={mobile ? "small" : "default"}
                    />
                  }
                />
                <SmallCard
                  title="Plats"
                  path="/recipes?q=plat"
                  classe={classes.smallCard}
                  Icon={
                    <DishIcon
                      className={classes.icon}
                      fontSize={mobile ? "small" : "default"}
                    />
                  }
                />
                <SmallCard
                  title="Desserts"
                  path="/recipes?q=dessert"
                  classe={classes.smallCard}
                  Icon={
                    <IceCream
                      className={classes.icon}
                      fontSize={mobile ? "small" : "default"}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              style={{
                position: "relative",
                paddingTop: "10rem",
              }}
            >
              <Box
                position="absolute"
                minHeight="fit-content"
                zIndex="-1"
                style={{
                  top: 0,
                  left: imgGap,
                }}
              >
                <img
                  src={HomeGeometric2}
                  alt="Background Géometric 2"
                  style={{
                    width: mobile ? "230%" : "inherit",
                  }}
                />
              </Box>
              <Box
                width="100%"
                color="white"
                display="flex"
                justifyContent="center"
              >
                <img
                  src={Plats_veggie}
                  alt="Plat veggie 2"
                  style={{
                    maxWidth: !mobile ? "40vw" : "80vw",
                    marginTop: mobile ? "3rem" : "0",
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              style={{ paddingBottom: mobile ? "5rem" : "15rem" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                paddingLeft="2rem"
                paddingTop={mobile ? "3rem" : "10rem"}
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
          </Grid>
          <Grid item xs={12}>
            <Box
              width="100%"
              height="100%"
              bgcolor="#FFF9F5"
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
                justifyContent={mobile ? "center" : "space-between"}
                margin="auto"
                flexWrap="wrap"
              >
                {recipes.map(
                  (recipe, index) =>
                    index < 3 && (
                      <Box
                        width={mobile ? "90%" : "28%"}
                        key={`home-${recipe.id}`}
                      >
                        <RecipePreview
                          title={recipe.title}
                          difficulty={recipe.difficulty}
                          image={recipe.image}
                          objectID={recipe.id}
                          orange
                        />
                      </Box>
                    )
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    </Fade>
  );
};

export default HomeScreen;
