import express from 'express';

const router = express.Router();

router.get('/api/users/current_user', (req, res) => {
  res.send({ message: 'Hello TypeScript' });
});

export { router as currentUserRoute };
