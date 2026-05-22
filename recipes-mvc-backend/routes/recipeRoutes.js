const express = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

const router = express.Router();

router.route('/').get(getAllRecipes).post(createRecipe);
router.route('/:id').get(getRecipeById).patch(updateRecipe).delete(deleteRecipe);

module.exports = router;
