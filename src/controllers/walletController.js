import joi from "joi";

export async function getTransactions(req, res) {
  try {
    res.status(200).send("Funfou o get de transações");
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const transactionSchema = joi.object({
  //Lembrar de remover o "-" (sinal de negativo) com o split ao receber os dados
  //E tratar se é negativo ou não de acordo com a rota na hora de salvar no db
  value: joi.number().trim().min(1).required(),
  description: joi.string().trim().min(1).max(20).required()
});

export async function addMoney(req, res) {
  try {
    res.status(201).send("Funfou o post de adicionar dinheiro");
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function addExpense(req, res) {
  try {
    res.status(201).send("Funfou o post de adicionar despesa");
  } catch (error) {
    res.status(500).send(error.message)
  }
}