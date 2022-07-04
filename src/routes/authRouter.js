import {login, createUser, logout} from "../controllers/authController.js";
import { Router } from 'express';
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post('/logout', validateUser, logout);

export default router;