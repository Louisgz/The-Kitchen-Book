import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Fire, Tools } from "../../services"
import { useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import FormLabel from '@material-ui/core/FormLabel';

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
    const [picture, setPicture] = useState("")
    const [recipe, setRecipe] = useState<any>([]);
    const [introduction, setIntroduction] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const recipesCollection = Fire.store().collection('Recipies');
    const [loading, setLoading] = useState(false);

    const fileChanged = async (evt: any) => {
        try {
            const url = await Tools.requestSmallImage(evt)
            setPicture(url)
        } catch (err) {
            alert(err.message)
        }
    }

    const saveInfos = async () => {
        console.log(title)
        console.log(introduction)
        console.log(portions)
        console.log(type)
        console.log(recipe)
        console.log(difficulty)
        console.log(ingredients)
        console.log(recipe)
        try {
            const date = new Date().getTime()
            const image = await Fire.uploadFile('recipes/' + title.replace(/\s+/g, '-') + "_" + date + '.png', picture)
            const item = {
                title: title,
                introduction: introduction,
                type: type,
                cooking_time: cooking_time,
                preparation_time: preparation_time,
                difficlty: difficulty,
                portions: portions,
                ingredients: ingredients,
                recipe: recipe,
                image: image,
            }
            await recipesCollection.doc().set(item);
            setAlertSuccess(true)
            setTimeout(() => {
                setAlertSuccess(false)
            }, 2000)
        } catch (err) {
            setAlertError(true)
            setTimeout(() => {
                setAlertError(false)
            }, 2000)
            console.log(err)
        }
    }

    return (
        <Box padding="2rem 3rem">
            <form action="">
                <div className="input-wrapper">
                    <FormLabel component="legend" style={{ margin: "1rem 0 .5rem" }} >Image de la recette :</FormLabel>
                    <div className="flex-row">
                        <div className="input-preview">
                            {picture !== "" &&
                                <img alt="Image" src={picture} style={{ maxWidth: 300 }} />
                            }
                        </div>
                        <div>
                            <InputBase
                                type="file"
                                onChange={(evt) => fileChanged(evt)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Titre</FormLabel>
                <TextField
                    id="title"
                    placeholder="ex : Tarte aux fraises"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Introduction</FormLabel>
                <TextField
                    id="title"
                    placeholder="ex : Acheter des escalopes de veau de qualité, et les demander très fines au boucher."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => setIntroduction(e.target.value)}
                />
                <FormLabel style={{ margin: "1rem 0 0" }} >Portions</FormLabel>
                <TextField
                    id="outlined-full-width"
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
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Type</FormLabel>
                <TextField
                    id="outlined-full-width"
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
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Temps de préparation (minutes)</FormLabel>
                <TextField
                    id="outlined-full-width"
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
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Temps de cuisson (minutes)</FormLabel>
                <TextField
                    id="outlined-full-width"
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
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Difficulté (sur 5)</FormLabel>
                <TextField
                    id="outlined-full-width"
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
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Ingédients</FormLabel>
                <TextField
                    id="outlined-full-width"
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
                <FormLabel component="legend" style={{ margin: "1rem 0 0" }} >Recette (sautez une ligne entre chaque étape)</FormLabel>
                <TextField
                    id="outlined-full-width"
                    placeholder="Mélanger la farine et les oeufs pour former une pâte homogène. &#13;&#10;Faire cuire pendant 5 minutes.&#13;&#10;Régalez-vous !"
                    multiline
                    fullWidth
                    rows={8}
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
                <Button variant="contained" color="primary" onClick={saveInfos} style={{ marginTop: "1rem" }} >
                    Envoyer
                </Button>
            </form>
            <Box position="fixed" bottom="10%" left="5%">
                {
                    alertSuccess &&
                    <Alert severity="success">La recette a bien été ajoutée, merci pour votre contribution !</Alert>
                }
                {
                    alertError &&
                    <Alert severity="error">Il y a eu une erreur lors de l'envoi du formulaire, rechargez la page et réessayez.</Alert>
                }
            </Box>
        </Box>
    )
}

export default AddRecipe
