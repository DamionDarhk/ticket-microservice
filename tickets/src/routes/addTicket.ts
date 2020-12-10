import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { authentication, validationRequest } from '@zzelda/ticket-common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets/add_ticket',
  authentication,
  [
    body('title').not().isEmpty().withMessage('Enter valid Title'),
    body('price').isFloat({ gt: 0 }).withMessage('Enter valid Price'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    console.log('This is add ticket route');
    return res.status(201).send(ticket);
  },
);

export { router as addTicketRouter };
