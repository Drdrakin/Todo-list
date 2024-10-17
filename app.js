const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes.js');
const sequelize = require('./src/database/index.js');
const metricsRouter = require('./src/tests/metrics.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/metrics', metricsRouter);

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

startServer();

module.exports = app;
