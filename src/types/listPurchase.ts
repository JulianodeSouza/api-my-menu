export type IListPurchaseView = {
  category: string;
  items: IListPurchase[];
};

export type IListPurchase = {
  id: number;
  name: string;
  quantity: number;
  category: string;
  measuredUnit: string;
  active: boolean;
  totalCaught?: number;
  amount?: number;
  checked?: boolean;
};
