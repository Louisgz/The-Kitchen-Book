import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import routes from './routes';
import { theme } from "./theme/_theKitchenBookTheme";
import { ThemeProvider } from "@material-ui/styles";

// const userRoutes = routes.filter((item) => {
//   if (item.both === true)
//     return true
//   if (item.userLogged === undefined)
//     return true
//   if (item.userLogged === false && !user)
//     return true
//   if (item.userLogged === true && user)
//     return true
//   return false
// })

declare module '*.png'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.svg'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {routes.map((item, index) => (
            <Route key={index} exact path={item.path} component={item.component} />
          ))}
        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;
