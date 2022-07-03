import joi from "joi";
import { db, objectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

export async function getTransactions(_, res) {
  const session = res.locals.session;
  try {
    const transactions = await db
      .collection('transactions')
      .find({ _id: new objectId(session.userId) })
      .toArray();
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const transactionSchema = joi.object({
  amount: joi.number().min(0.01).required(),
  description: joi.string().trim().min(1).max(20).required()
});


export async function addMoney(req, res) {
  const session = res.locals.session;
  const { amount, description } = req.body;
  const date = dayjs().locale('pt-br').format('DD/MM');
  const validation = transactionSchema.validate(req.body);

  if (validation.error) {
    console.log("Erro na validação:");
    console.log(validation.error.message);
    res.sendStatus(422);
    return;
  }

  try {
    await db.collection("transactions").insertOne({
      userId: new objectId(session.userId),
      date,
      description,
      amount,
      type: "entrada"
    });
    res.status(201).send("Entrada adicionada com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addExpense(req, res) {
  const session = res.locals.session;
  const { amount, description } = req.body;
  const date = dayjs().locale('pt-br').format('DD/MM');
  const validation = transactionSchema.validate(req.body);

  if (validation.error) {
    console.log("Erro na validação:");
    console.log(validation.error.message);
    res.sendStatus(422);
    return;
  }

  try {
    await db.collection("transactions").insertOne({
      userId: new objectId(session.userId),
      date,
      description,
      amount,
      type: "expense"
    });
    res.status(201).send("Despesa adicionada com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}