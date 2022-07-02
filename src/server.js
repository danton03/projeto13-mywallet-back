//Bibliotecas utilizadas
import express, {json} from "express";
import cors from "cors";

const app = express();
app.use([cors, json]);

app.use([authRouter, walletRouter]);

app.listen(5000, ()=>{
  console.log("🛰️  Servidor iniciado na porta 5000.")
});