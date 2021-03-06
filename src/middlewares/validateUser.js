import { db } from '../dbStrategy/mongo.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessions').findOne({ token });

  if (!session) {
    return res.status(401).send("Token de sessão do usuário expirado ou inválido. Faça login novamente.");
  }

  res.locals.session = session;

  next();
}

export default validateUser;
