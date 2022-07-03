//Bibliotecas utilizadas
import express, {json} from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import walletRouter from "./routes/walletRouter.js";

const app = express();
app.use(cors());
app.use(json());
app.use(authRouter);
app.use(walletRouter);

app.listen(5000, () => {
  console.log("🛰️  Servidor iniciado na porta 5000.")
});