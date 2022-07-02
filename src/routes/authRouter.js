import { Router } from 'express';

const router = Router();

router.post('/login', login);
router.post('/signup', createUser);

export default router;