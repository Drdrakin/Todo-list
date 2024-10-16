import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

try {
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
}

export default connection;