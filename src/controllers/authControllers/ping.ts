import { Response, Request } from 'express';

export const wakeUp = async (_req: Request, res: Response) => {
  res.json({ message: 'I wake up' });
};
