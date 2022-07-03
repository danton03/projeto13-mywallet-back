import joi from "joi";
import { db, objectId } from "../dbStrategy/mongo.js";

export async function getTransactions(_, res) {
  const session = res.locals.session;

  try {
    const user = await db
      .collection('users')
      .find({ _id: new objectId(session.userId) })
      .toArray();
    res.status(200).send(user.transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const transactionSchema = joi.object({
  //Lembrar de remover o "-" (sinal de negativo) com o split ao receber os dados
  //E tratar se é negativo ou não de acordo com a rota na hora de salvar no db
  value: joi.number().trim().min(1).required(),
  description: joi.string().trim().min(1).max(20).required()
});


export async function addMoney(req, res) {
  const session = res.locals.session;
  const amount = req.body.amount.replace('-','');
  const transaction = {amount, description: req.body.description}
  const validation = transactionSchema.validate(transaction);

  if (validation.error) {
    console.log("Erro na validação:");
    console.log(validation.error.message);
    res.sendStatus(422);
    return;
  }

  try {
    await db
      .collection('users')
      //adicionar uma colection embedded
    res.status(201).send("Funfou o post de adicionar dinheiro");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addExpense(req, res) {
  const session = res.locals.session;
  const validation = transactionSchema.validate(req.body);
  if (validation.error) {
    console.log("Erro na validação:");
    console.log(validation.error.message);
    res.sendStatus(422);
    return;
  }

  try {
    res.status(201).send("Funfou o post de adicionar despesa");
  } catch (error) {
    res.status(500).send(error.message);
  }
}