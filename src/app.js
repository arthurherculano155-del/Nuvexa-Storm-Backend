import "dotenv/config";
import express from "express";
import cors from 'cors';

import { addRoutes } from "./routes.js";

const api = express();
api.use(express.json());
api.use(cors());

addRoutes(api);

const porta = process.env.PORTA;

api.listen(
    porta, 
    () => console.log(`API rodando na porta ${porta}`
));