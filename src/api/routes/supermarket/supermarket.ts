import PurchaseListService from "@/services/purchaseList";
import PurchaseListDeleteService from "@/services/purchaseList/delete";
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

export async function removeItem(_req: Request, _res: Response) {
  const idItem = Number(_req.params.id);
  await new PurchaseListDeleteService().removeItem(idItem);

  _res.json({});
}
