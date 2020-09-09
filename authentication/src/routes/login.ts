import express from 'express';

const router = express.Router();

router.post('/api/users/login', (req, res) => {
  res.send({ message: 'Hello TypeScript' });
});

export { router as loginRoute };
