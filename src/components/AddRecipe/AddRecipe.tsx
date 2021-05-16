import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Fire } from "../../services"
import { useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);
const AddRecipe = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    const [title, setTitle] = useState("");
    const [portions, setPortions] = useState<any>([]);
    const [filters, setFilters] = useState<any>([]);
    const [type, setType] = useState("");
    const [cooking_time, setCooking_time] = useState("")
    const [preparation_time, setPreparation_time] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [ingredients, setIngredients] = useState<any>([]);
    const [recipe, setRecipe] = useState<any>([]);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const recipesCollection = Fire.store().collection('Recipies');

    const saveInfos = async () => {

        console.log(title)
        console.log(portions)
        console.log(type)
        console.log(recipe)
        console.log(difficulty)
        console.log(ingredients)
        console.log(recipe)
        try {
            const item = {
                title: title,
                type: type,
                cooking_time: cooking_time,
                preparation_time: preparation_time,
                difficlty: difficulty,
                portions: portions,
                ingredients: ingredients,
                recipe: recipe,
            }
            await recipesCollection.doc().set(item);
            setAlertSuccess(true)
        } catch (err) {
            setAlertError(true)
            console.log(err)
        }


    }



    return (
        <Box padding="2rem 3rem">
            <form action="">
                <TextField
                    id="title"
                    label="Titre"
                    placeholder="ex : Tarte aux fraises"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    id="outlined-full-width"
                    label="Portions"
                    placeholder="ex : 6 verrines / 2 personnes"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setPortions([{ quantity: e.target.value.split(" ", 2)[0] }, { measure: e.target.value.split(" ", 2)[1] }])
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Type"
                    placeholder="ex : dessert"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setType(e.target.value)
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Temps de préparation (minutes)"
                    placeholder="ex : 35 minutes"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setPreparation_time(e.target.value.split(" ", 2)[0])
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Temps de cuisson (minutes)"
                    placeholder="ex : 10 minutes"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setCooking_time(e.target.value.split(" ", 2)[0])
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Difficulté sur 5"
                    placeholder="4"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setDifficulty(e.target.value)
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Ingrédients"
                    placeholder="soupe"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setIngredients(e.target.value.split("\n"))
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Recette (sautez une ligne entre chaque étape)"
                    placeholder="(sautez une ligne entre chaque étape)"
                    multiline
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        let recipesArray = e.target.value.split("\n")
                        setRecipe(recipesArray)
                    }}
                />
                <Button variant="contained" color="primary" onClick={saveInfos}>
                    Envoyer
                </Button>
            </form>
            {
                alertSuccess &&
                <Alert severity="success">La recette a bien été ajoutée, merci pour votre contribution !</Alert>
            }
            {
                alertError &&
                <Alert severity="error">Il y a eu une erreur lors de l'envoi du formulaire, rechargez la page et réessayez.</Alert>
            }
        </Box>
    )
}

export default AddRecipe
