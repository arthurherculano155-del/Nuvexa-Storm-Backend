import mysql from 'mysql2/promise';

const con = mysql.createPool({
    host: process.env.Host_DB,
    database: process.env.Banco_DB,
    user: process.env.User_DB,
    password: process.env.Password_DB,
    port: process.env.Porta_DB,

    ssl: {
        rejectUnauthorized: false
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    typeCast: function (field, next) {
        if (field.type === "TINY" && field.length == 1) {
            return field.string() === "1";
        }
        else if (field.type.includes("DECIMAL")) {
            return Number(field.string());
        }
        else {
            return next();
        }
    }
});


console.log("Conectou ao MySQL");
export {con};