export type IListPurchaseView = {
  category: string;
  categoryIcon: string;
  items: IListPurchase[];
};

export type IListPurchase = {
  id: number;
  name: string;
  quantity: number;
  categoryName: string;
  category: number;
  categoryIcon: string;
  measuredUnitName: string;
  measuredUnit: number;
  unitSymbol?: string;
  active: boolean;
  totalCaught?: number;
  amount?: number;
  checked?: boolean;
  finishDatePurchase?: Date;
};

export type ICheckedData = Pick<
  IListPurchase,
  "checked" | "totalCaught" | "amount"
>;
