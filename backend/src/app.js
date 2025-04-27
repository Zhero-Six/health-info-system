const express = require('express');
const { Sequelize } = require('sequelize');
const clientRoutes = require('./routes/clients');
const programRoutes = require('./routes/programs');
const authRoutes = require('./routes/auth');
const Client = require('./models/Client');
const Program = require('./models/Program');
const User = require('./models/User');

const app = express();
const sequelize = new Sequelize('sqlite:./database.sqlite');

// Initialize models
Client(sequelize);
Program(sequelize);
User(sequelize);

// Associations
const models = sequelize.models;
models.Client.belongsToMany(models.Program, { through: 'ClientPrograms' });
models.Program.belongsToMany(models.Client, { through: 'ClientPrograms' });

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;