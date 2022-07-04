import joi from "joi";
import { db, objectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

export async function getTransactions(_, res) {
  const session = res.locals.session;
  try {
    const transactions = await db
      .collection('transactions')
      .find({ userId: new objectId(session.userId) })
      .toArray();
    return res.status(200).send(transactions);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const transactionSchema = joi.object({
  amount: joi.number().min(0.01).required(),
  description: joi.string().trim().min(1).max(20).required()
});


export async function addMoney(req, res) {
  const session = res.locals.session;
  const { description } = req.body;
  const amount = parseFloat(parseFloat(req.body.amount).toFixed(2));
  const transaction = {
    amount, 
    description
  }
  
  const date = dayjs().locale('pt-br').format('DD/MM');
  const validation = transactionSchema.validate(transaction);

  if (validation.error) {
    return res.sendStatus(422);
  }

  try {
    await db.collection("transactions").insertOne({
      userId: new objectId(session.userId),
      date,
      description,
      amount,
      type: "incoming"
    });
    return res.status(201).send("Entrada adicionada com sucesso");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function addExpense(req, res) {
  const session = res.locals.session;
  const { description } = req.body;
  const amount = parseFloat(parseFloat(req.body.amount).toFixed(2));
  const transaction = {
    amount, 
    description
  }
  const date = dayjs().locale('pt-br').format('DD/MM');
  const validation = transactionSchema.validate(transaction);

  if (validation.error) {
    return res.sendStatus(422);
  }

  try {
    await db.collection("transactions").insertOne({
      userId: new objectId(session.userId),
      date,
      description,
      amount,
      type: "expense"
    });
    return res.status(201).send("Despesa adicionada com sucesso");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}