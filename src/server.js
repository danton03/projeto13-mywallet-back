//Bibliotecas utilizadas
import express, {json} from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import walletRouter from "./routes/walletRouter.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(authRouter);
app.use(walletRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}.`);
});