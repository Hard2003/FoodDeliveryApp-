import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.findIndex(
        item => item._id === action.item._id && 
        item.selectedVariant === action.item.selectedVariant &&
        JSON.stringify(item.selectedAddons) === JSON.stringify(action.item.selectedAddons)
      );

      if (existingIndex !== -1) {
        const newState = [...state];
        newState[existingIndex].quantity += action.item.quantity;
        return newState;
      }
      return [...state, action.item];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.cartId !== action.cartId);

    case 'UPDATE_QUANTITY': {
      return state.map(item =>
        item.cartId === action.cartId
          ? { ...item, quantity: action.quantity }
          : item
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'LOAD_CART':
      return action.cart || [];

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, [], () => {
    // Load cart from localStorage
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};

// Helper functions
export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    let itemPrice = item.price;
    if (item.selectedAddons && item.selectedAddons.length > 0) {
      const addonsPrice = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
      itemPrice += addonsPrice;
    }
    return total + (itemPrice * item.quantity);
  }, 0);
};

export const getCartCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const getRestaurantId = (cart) => {
  return cart.length > 0 ? cart[0].restaurant : null;
};
