// components/Header/types.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface HeaderProps {
  showInScreen?: string;
}
