import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  authentication,
  NotFoundError,
  validationRequest,
  ForbiddenError,
} from '@zzelda/ticket-common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/update_ticket/:tickedId',
  authentication,
  [
    body('title').not().isEmpty().withMessage('Enter valid Title'),
    body('price').isFloat({ gt: 0 }).withMessage('Enter valid Price'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { tickedId } = req.params;
    const { title, price } = req.body;
    const ticket = await Ticket.findById(tickedId);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new ForbiddenError();
    }

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.send(ticket);
  },
);

export { router as updateTicketRouter };
