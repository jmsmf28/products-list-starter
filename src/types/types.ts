export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  }

  export interface CartItem {
    product: Product;
    quantity: number;
  }

export interface AlertProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
  }

  export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: { name: string; email: string; address: string }) => void;
  }
  
  export interface AppContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    headerText: string;
    setHeaderText: (text: string) => void;
  }
  