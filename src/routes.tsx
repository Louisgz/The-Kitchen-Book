import HomeScreen from "./components/Home/HomeScreen"
import Account from "./components/Account/Account"
import AddRecipe from "./components/AddRecipe/AddRecipe"

const routes: any[] = [
    {
        path: '/',
        component: HomeScreen,
    },
    {
        path: '/account',
        component: Account
    },
    {
        path: '/add-recipe',
        component: AddRecipe,
    }
]

export default routes;