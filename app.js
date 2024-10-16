import express from 'express';
import taskRoutes from './src/routes/taskRoutes.js';
import sequelize from './src/database/index.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api', taskRoutes);

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
