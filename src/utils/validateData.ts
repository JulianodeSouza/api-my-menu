import { ListPurchaseEntity } from "@/infra/models/listPurchase";

export function validateData(
  data: Partial<ListPurchaseEntity>,
  type?: string,
): boolean {
  const { name, quantity, amount, totalCaught } = data;

  if (!name || !quantity) {
    return false;
  }

  if (typeof quantity !== "number" || typeof name !== "string") {
    return false;
  }

  if (type === "mark" && totalCaught) {
    if (typeof totalCaught !== "number") {
      return false;
    }

    if (totalCaught <= 0) {
      return false;
    }
  }

  if (type === "mark" && amount) {
    if (typeof amount !== "number") {
      return false;
    }

    if (amount <= 0) {
      return false;
    }
  }

  return true;
}
