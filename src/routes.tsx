import HomeScreen from "./components/Home/HomeScreen";
import Account from "./components/Account/Account";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import RecipesPage from "./components/Recipes/RecipesPage";

const routes: any[] = [
  {
    path: "/",
    component: HomeScreen,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/add-recipe",
    component: AddRecipe,
  },
  {
    path: "/recipes",
    component: RecipesPage,
  },
];

export default routes;
