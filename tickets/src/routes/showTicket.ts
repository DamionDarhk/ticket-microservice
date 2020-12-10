import express, { Request, Response } from 'express';
import { authentication, NotFoundError } from '@zzelda/ticket-common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get(
  '/api/tickets/get_ticket_by_id/:ticketId',
  authentication,
  async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    console.log('ticket: ', ticket);

    if (!ticket) {
      throw new NotFoundError();
    }

    res.send(ticket);
  },
);

router.get('/api/tickets/show_all_tickets', authentication, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { router as showTicketRouter };
