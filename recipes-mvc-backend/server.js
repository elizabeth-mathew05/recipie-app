const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');

  envFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const separatorIndex = line.indexOf('=');

      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
}

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    try {
      await connectDB();
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
    }
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
