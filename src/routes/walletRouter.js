import { addExpense, addMoney, getTransactions } from "../controllers/walletController.js";
import validateUser from '../middlewares/validateUser.js';
import { Router } from 'express';

const router = Router();

router.get('/wallet', validateUser, getTransactions);
router.post('/addMoney', validateUser, addMoney);
router.post('/expense', validateUser, addExpense);

export default router;