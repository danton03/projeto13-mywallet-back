import { addExpense, addMoney, getTransactions } from "../controllers/walletController";
import { Router } from 'express';

const router = Router();

router.get('/wallet', getTransactions);
router.post('/addMoney', addMoney);
router.post('/expense', addExpense);

export default router;