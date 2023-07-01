const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('strictQuery', false);
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe = {
      title: 'Pizza',
      level: 'Amateur Chef',
      ingredients: ['Masa' ,'Salsa de Tomate', 'Queso'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 25,
      creator: 'Chef Cayo',
    };
    return Recipe.create(recipe);
  })
  .then((createdRecipe) => {
    console.log(`Recipe created: ${createdRecipe.title}`);

    return Recipe.insertMany(data);
  })
  .then((insertedRecipes) => {
    insertedRecipes.forEach((recipe) => {
      console.log(`Recipe inserted: ${recipe.title}`);
    });
   
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log('Recipe updated successfully');
    
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe deleted successfully');
    
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });