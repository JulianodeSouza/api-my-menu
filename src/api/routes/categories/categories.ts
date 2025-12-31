import CategoriesService from "@/services/categories";
import CategoriesRegisterService from "@/services/categories/register";
import { Request, Response } from "express";

export async function getCategoriesList(_req: Request, _res: Response) {
  const categories = await new CategoriesService().getCategories();

  _res.json(categories);
}

export async function registerCategory(_req: Request, _res: Response) {
  const data = _req.body;
  await new CategoriesRegisterService().registerCategory(data);

  _res.json({});
}
