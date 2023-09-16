const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema.Types;

const savedRecipeSchema = new mongoose.Schema({
    email: { type: String, ref: "User" },
    saves: [
        {
            recipeName: { type: String, required: true },
            recipe: { type: Array, required: true }
        }
    ]
});

const savedRecipes = mongoose.model('saves', savedRecipeSchema);
module.exports = savedRecipes;