import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductPrice } from '../data/dummyData';

export interface ShoppingListItem {
  id: number;
  productId: number;
  productName: string;
  image: string;
  addedAt: string;
  prices: ProductPrice[]; // Store all prices for the product
}

interface ShoppingListContextType {
  items: ShoppingListItem[];
  addToList: (product: Product) => void;
  removeFromList: (productId: number) => void;
  clearList: () => void;
  getTotalPrice: () => number;
  getLowestPriceTotal: () => number;
}

const ShoppingListContext = createContext<ShoppingListContextType | null>(null);

export const useShoppingList = (): ShoppingListContextType => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

interface ShoppingListProviderProps {
  children: ReactNode;
}

export const ShoppingListProvider = ({ children }: ShoppingListProviderProps) => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('shoppingList');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addToList = (product: Product): void => {
    // Check if product already exists in the list
    const existingItem = items.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Product already in list, don't add again
      return;
    }

    const newItem: ShoppingListItem = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      image: product.image,
      prices: product.prices, // Store all prices
      addedAt: new Date().toISOString()
    };
    setItems([...items, newItem]);
  };

  const removeFromList = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    localStorage.setItem('shoppingList', JSON.stringify(items.filter(item => item.id !== id)));
  };

  const clearList = (): void => {
    setItems([]);
  };

  const getTotalPrice = (): number => {
    // Calculate total using the lowest price for each product
    return items.reduce((total, item) => {
      const lowestPrice = Math.min(...item.prices.map(p => p.price));
      return total + lowestPrice;
    }, 0);
  };

  const getLowestPriceTotal = (): number => {
    // Same as getTotalPrice for now
    return getTotalPrice();
  };

  const value: ShoppingListContextType = {
    items,
    addToList,
    removeFromList,
    clearList,
    getTotalPrice,
    getLowestPriceTotal
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
