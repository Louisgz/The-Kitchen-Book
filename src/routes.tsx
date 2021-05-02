import HomeScreen from "./components/Home/HomeScreen"
import Account from "./components/Account/Account"

const routes: any[] = [
    {
        path: '/',
        component: HomeScreen,
    },
    {
        path: '/account',
        component: Account
    }
]

export default routes;