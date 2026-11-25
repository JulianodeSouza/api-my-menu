import { ListPurchaseEntity } from "@/infra/models/listPurchase";
import { ICheckedData, IListPurchase } from "@/types/listPurchase";

function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isNonNegativeFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isValidRelationId(value: unknown): boolean {
  const numericValue =
    typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  return (
    typeof numericValue === "number" &&
    Number.isFinite(numericValue) &&
    numericValue > 0
  );
}

export function validateData(
  data: Partial<ListPurchaseEntity> | Partial<IListPurchase> | ICheckedData,
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

    if (checked === true) {
      if (
        !isPositiveFiniteNumber(totalCaught) ||
        !isPositiveFiniteNumber(amount)
      ) {
        return false;
      }

      return true;
    }

    if (totalCaught !== undefined && totalCaught !== null) {
      if (!isNonNegativeFiniteNumber(totalCaught)) {
        return false;
      }
    }

    if (amount !== undefined && amount !== null) {
      if (!isNonNegativeFiniteNumber(amount)) {
        return false;
      }
    }

    return true;
  }

  if (type === "edit") {
    const {
      name,
      quantity,
      category,
      measuredUnit,
      totalCaught,
      amount,
      checked,
    } = data as Partial<IListPurchase>;

    const hasEditableField =
      name !== undefined ||
      quantity !== undefined ||
      category !== undefined ||
      measuredUnit !== undefined ||
      totalCaught !== undefined ||
      amount !== undefined ||
      checked !== undefined;

    if (!hasEditableField) {
      return false;
    }

    if (
      name !== undefined &&
      (typeof name !== "string" || name.trim().length === 0)
    ) {
      return false;
    }

    if (quantity !== undefined && !isNonNegativeFiniteNumber(quantity)) {
      return false;
    }

    if (category !== undefined && !isValidRelationId(category)) {
      return false;
    }

    if (measuredUnit !== undefined && !isValidRelationId(measuredUnit)) {
      return false;
    }

    if (totalCaught !== undefined && !isNonNegativeFiniteNumber(totalCaught)) {
      return false;
    }

    if (amount !== undefined && !isNonNegativeFiniteNumber(amount)) {
      return false;
    }

    if (checked !== undefined && typeof checked !== "boolean") {
      return false;
    }

    return true;
  }

  const { name, quantity } = data as Partial<ListPurchaseEntity>;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    !isPositiveFiniteNumber(quantity)
  ) {
    return false;
  }

  return true;
}
