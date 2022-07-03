import bcrypt from 'bcrypt';
import joi from "joi";
import { v4 as uuid } from "uuid";
import { db } from "../dbStrategy/mongo.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;

  const validation = signUpSchema.validate(req.body);

  if (validation.error) {
    console.log("Erro na validação:");
    console.log(validation.error.message);
    res.sendStatus(422);
    return;
  }

  const signUpSchema = joi.object({
    name: joi.string()
      .min(2)
      .max(25)
      .trim()
      .required(),
    email: joi.string().min(3).email().required(),
    password: joi.string().min(4).max(30).required(),
    password_confirmation: joi.string().valid(joi.ref('password')).required()
  });

  try {
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    await db.collection('users').insertOne({
      name,
      email,
      password: passwordEncrypted
    });
    res.status(201).send("Sucesso ao criar o usuário");
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const validation = signInSchema.validate(req.body);

  if (validation.error) {
    console.log("Erro na validação:");
    console.log(validation.error.message);
    res.sendStatus(422);
    return;
  }

  const signInSchema = joi.object({
    email: joi.string().min(3).email().required(),
    password: joi.string().min(4).max(30).required()
  });

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = uuid();
      const session = await db.collection('sessions').findOne({ 
        userId: user._id 
      });

      if (!session) {
        await db.collection("sessions").insertOne({
          userId: user._id,
          token
        });
      }
      else{
        await db.collection("sessions").updateOne(
          {userId: user._id},
          {$set: {token}}
        );
      }
    }

    res.status(200).send({ token, name: user.name });
  } catch (error) {
    res.status(500).send(error.message)
  }
}