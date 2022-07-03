import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import { db, objectId } from "../dbStrategy/mongo.js";
import joi from "joi";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
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

  const validation = signUpSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    console.log(req.body)
    res.status(422).send(validation.error.message);
    return;
  }

  try {
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    await db.collection('users').insertOne({
      name,
      email,
      password: passwordEncrypted
    });
    return res.status(201).send("Sucesso ao criar o usuário");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const signInSchema = joi.object({
    email: joi.string().min(3).email().required(),
    password: joi.string().min(4).max(30).required()
  });

  const validation = signInSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    res.status(422).send(validation.error.message);
    return;
  }

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      res.status(404).send("Email ou senha inválida");
      return;
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      console.log("token: "+token);
      const session = await db.collection('sessions').findOne({ 
        userId: user._id 
      });
      console.log("session: ");
      console.log(session);
      if (!session) {
        await db.collection("sessions").insertOne({
          userId: user._id,
          token
        });
      }
      else{
        console.log("caiu no else");
        console.log("token: "+token);
        await db.collection("sessions").updateOne(
          {userId: new objectId(user._id)},
          {$set: {token: token}}
        );
      }
      res.status(200).send({ name: user.name, token});
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}