import { ListPurchaseEntity } from "@/infra/models/listPurchase";
import { ICheckedData } from "@/types/listPurchase";

export function validateData(
  data: Partial<ListPurchaseEntity> | ICheckedData,
  type?: string,
): boolean {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (type === "mark") {
    const { checked, totalCaught, amount } = data as ICheckedData;

    if (
      checked === undefined &&
      totalCaught === undefined &&
      amount === undefined
    ) {
      return false;
    }

    if (checked !== undefined && typeof checked !== "boolean") {
      return false;
    }

    if (totalCaught !== undefined && totalCaught !== null) {
      if (
        typeof totalCaught !== "number" ||
        isNaN(totalCaught) ||
        totalCaught < 0
      ) {
        return false;
      }
    }

    if (amount !== undefined && amount !== null) {
      if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
        return false;
      }
    }

    return true;
  }

  const { name, quantity } = data as Partial<ListPurchaseEntity>;

  if (!name || !quantity) {
    return false;
  }

  if (typeof quantity !== "number" || typeof name !== "string") {
    return false;
  }

  return true;
}
