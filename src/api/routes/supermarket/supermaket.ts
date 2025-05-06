import { Request, Response } from "express";

export async function getSupermarketList(_req: Request, _res: Response) {
  _res.status(200).send("Supermarket list retrieved successfully!");
}
