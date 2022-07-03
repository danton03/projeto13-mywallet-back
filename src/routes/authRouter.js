import {login, createUser} from "../controllers/authController.js";
import { Router } from 'express';

const router = Router();

router.post("/signup", createUser);
router.post("/login", login);

export default router;