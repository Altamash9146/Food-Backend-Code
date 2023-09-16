const userRoutes = require('express').Router();
const { Signup, Login } = require('../Controller/Auth/UserAuth');
const {saveRecipe,fetchIndividualRecipe} = require('../Controller/Bookmark')



userRoutes.post('/register', Signup);
userRoutes.post('/login', Login);
userRoutes.post('/save',saveRecipe)
userRoutes.get('/fetch-recipe/:email',fetchIndividualRecipe)

module.exports = userRoutes;