const savedRecipes = require("../Models/Bookmark")


const saveRecipe = async (req, res) => {
    const data = req.body;

    console.log(data)


    try {
        
        const user = await savedRecipes.findOne({ email: data.email });

        // new User
        if (!user) {

            const newUser = new savedRecipes({
                email: data.email,
                saves: [{
                    recipeName: data.recipeName,
                    recipe: data.recipe
                }]
            });

            const result = await newUser.save();
            return res.send(result);
        }

        // Checking for existance of recipeName
        const existingRecipe = user.saves.find(recipe => recipe.recipeName === data.recipeName);

        if (existingRecipe) {
            // console.log("Recipe already exists");
            return res.status(204).send("Recipe has already been saved");
        }

        // Push the new recipe to the saves array
        user.saves.push({
            recipeName: data.recipeName,
            recipe: data.recipe
        });

        // Save the updated user document
        const result = await user.save();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(409).send("Unable to save recipe");
    }
    
}


const fetchIndividualRecipe = async(req,res)=>{
    const email = req.params.email

    try{

        const recipe = await savedRecipes.find({email:email})
    if(!recipe){
        return res.status(204).send("No recipe saved by the user") 
    }        
        res.send(recipe)

    }catch(err){
        console.log(err);
        res.status(409).send("unable to fetch recipe");
    }
}

const deleteAllSaves= async (req,res)=>{
    
    try{
  const result = await savedRecipes.deleteMany()
  res.send(result)
    }catch(err){
        console.log(err);
        res.status(409).send("unable to delete comments");
    }
  }

module.exports = {saveRecipe, fetchIndividualRecipe, deleteAllSaves}