import PurchaseListService from "@/services/purchaseList";
import PurchaseListRegisterService from "@/services/purchaseList/register";
import { Request, Response } from "express";

export async function getSupermarketList(_req: Request, _res: Response) {
  const listPurchase = await new PurchaseListService().getSupermarketList();

  _res.json(listPurchase);
}

export async function saveItem(_req: Request, _res: Response) {
  const data = _req.body;
  await new PurchaseListRegisterService().registerItem(data);

  _res.json({});
}
