import bcrypt from 'bcrypt';
import joi from "joi";
import { v4 as uuid } from "uuid";
import {db} from "../dbStrategy/mongo.js";

export async function createUser(req, res) {
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
    res.status(201).send("Funfou o post de criar o usuário");
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function login(req, res) {
  const signInSchema = joi.object({
    email: joi.string().min(3).email().required(),
    password: joi.string().min(4).max(30).required()
  });

  try {
    res.status(200).send("Funfou o post de logar o usuário");
  } catch (error) {
    res.status(500).send(error.message)
  }
}