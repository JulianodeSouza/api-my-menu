import CategoriesService from "@/services/categories";
import CategoriesDeleteService from "@/services/categories/delete";
import CategoriesEditService from "@/services/categories/edit";
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

export async function editCategory(_req: Request, _res: Response) {
  const idCategory = Number(_req.params.id);
  await new CategoriesEditService().editCategory(idCategory, _req.body);

  _res.json({});
}

export async function removeCategory(_req: Request, _res: Response) {
  const idCategory = Number(_req.params.id);
  await new CategoriesDeleteService().removeCategory(idCategory);

  _res.json({});
}
