const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      minlength: 3,
      maxlength: 120
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    ingredients: {
      type: [String],
      required: [true, 'At least one ingredient is required'],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'At least one ingredient is required'
      }
    },
    instructions: {
      type: [String],
      required: [true, 'At least one instruction step is required'],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'At least one instruction step is required'
      }
    },
    prepTime: {
      type: Number,
      min: 0,
      default: 0
    },
    cookTime: {
      type: Number,
      min: 0,
      default: 0
    },
    servings: {
      type: Number,
      min: 1,
      default: 1
    },
    category: {
      type: String,
      trim: true,
      default: 'General'
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

recipeSchema.virtual('totalTime').get(function totalTime() {
  return (this.prepTime || 0) + (this.cookTime || 0);
});

recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Recipe', recipeSchema);
