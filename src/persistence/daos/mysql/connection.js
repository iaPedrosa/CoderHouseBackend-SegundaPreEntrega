import { Sequelize } from 'sequelize';

export const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export const initMySqlDB = async() => {
    try {
        // Sincroniza los modelos, incluyendo el modelo de sesión
        await db.sync({ force: false });
        console.log('Conectado a la base de datos de MySQL');
    } catch (error) {
        console.log(error);
    }
};