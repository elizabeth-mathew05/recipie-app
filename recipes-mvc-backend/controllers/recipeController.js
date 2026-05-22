const Recipe = require('../models/recipeModel');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');

const normalizeRecipePayload = (body, { partial = false } = {}) => {
  const parseList = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => `${item}`.trim()).filter(Boolean);
    }

    if (typeof value === 'string') {
      return value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const hasField = (field) => Object.prototype.hasOwnProperty.call(body, field);
  const pickValue = (field, transform = (value) => value) => {
    if (!hasField(field)) {
      return undefined;
    }

    const rawValue = body[field];

    if (partial && (rawValue === '' || rawValue === null)) {
      return undefined;
    }

    return transform(rawValue);
  };

  const parseNumber = (value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    return Number(value);
  };

  return {
    title: pickValue('title', (value) => `${value}`.trim()),
    description: pickValue('description', (value) => `${value}`.trim()),
    ingredients: pickValue('ingredients', parseList),
    instructions: pickValue('instructions', parseList),
    prepTime: pickValue('prepTime', parseNumber),
    cookTime: pickValue('cookTime', parseNumber),
    servings: pickValue('servings', parseNumber),
    category: pickValue('category', (value) => `${value}`.trim()),
    imageUrl: pickValue('imageUrl', (value) => `${value}`.trim())
  };
};

const validatePayload = (payload, isUpdate = false) => {
  const errors = [];

  if (!isUpdate && (!payload.title || !`${payload.title}`.trim())) {
    errors.push('Recipe title is required');
  }

  if (!isUpdate && (!payload.ingredients || payload.ingredients.length === 0)) {
    errors.push('At least one ingredient is required');
  }

  if (!isUpdate && (!payload.instructions || payload.instructions.length === 0)) {
    errors.push('At least one instruction step is required');
  }

  if (isUpdate && payload.title !== undefined && !`${payload.title}`.trim()) {
    errors.push('Recipe title cannot be empty');
  }

  if (isUpdate && payload.ingredients !== undefined && payload.ingredients.length === 0) {
    errors.push('At least one ingredient is required');
  }

  if (isUpdate && payload.instructions !== undefined && payload.instructions.length === 0) {
    errors.push('At least one instruction step is required');
  }

  ['prepTime', 'cookTime', 'servings'].forEach((field) => {
    if (payload[field] !== undefined && Number.isNaN(payload[field])) {
      errors.push(`${field} must be a number`);
    }
  });

  if (payload.prepTime !== undefined && payload.prepTime < 0) {
    errors.push('prepTime must be zero or greater');
  }

  if (payload.cookTime !== undefined && payload.cookTime < 0) {
    errors.push('cookTime must be zero or greater');
  }

  if (payload.servings !== undefined && payload.servings < 1) {
    errors.push('servings must be at least 1');
  }

  return errors;
};

exports.createRecipe = asyncHandler(async (req, res, next) => {
  const payload = normalizeRecipePayload(req.body);
  const validationErrors = validatePayload(payload);

  if (validationErrors.length > 0) {
    return next(new AppError(validationErrors.join('. '), 400));
  }

  const recipe = await Recipe.create(payload);

  res.status(201).json({
    status: 'success',
    message: 'Recipe created successfully',
    data: { recipe }
  });
});

exports.getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: recipes.length,
    data: { recipes }
  });
});

exports.getRecipeById = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(new AppError('Recipe not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { recipe }
  });
});

exports.updateRecipe = asyncHandler(async (req, res, next) => {
  const payload = normalizeRecipePayload(req.body, { partial: true });
  const validationErrors = validatePayload(payload, true);

  if (validationErrors.length > 0) {
    return next(new AppError(validationErrors.join('. '), 400));
  }

  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );

  const recipe = await Recipe.findByIdAndUpdate(req.params.id, filteredPayload, {
    new: true,
    runValidators: true
  });

  if (!recipe) {
    return next(new AppError('Recipe not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Recipe updated successfully',
    data: { recipe }
  });
});

exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);

  if (!recipe) {
    return next(new AppError('Recipe not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Recipe deleted successfully',
    data: null
  });
});
