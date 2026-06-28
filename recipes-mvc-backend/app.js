const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Recipes API is running',
    endpoints: {
      health: '/api/health',
      recipes: '/api/recipes'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Recipes API is running'
  });
});

app.use('/api/recipes', recipeRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

app.use((error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: `Invalid ${error.path}: ${error.value}`
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join('. ')
    });
  }

  return res.status(error.statusCode || 500).json({
    status: error.status || 'error',
    message: error.message || 'Something went wrong'
  });
});

module.exports = app;
