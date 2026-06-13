import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// Assuming these contexts exist in your project
import { AlertContext } from './AlertContext';
import { UserContext } from './UserContext';

// --- Types & Interfaces ---

export interface Product {
  id: string | number;
  price: number;
  title?: string;
  [key: string]: any; // Catch-all for other product details from the API
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Represents the { id: quantity } structure (e.g., { 1: 3, 5: 9 })
export type CartDetail = Record<string | number, number>;

export interface CartContextType {
  data: CartItem[];
  setData: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onAddToCart: (proId: string | number, count: number) => void;
  CartCount: number;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  handleDeleteCartItem: (id: string | number) => void;
  HandleQuantity: (id: string | number, quantity: number) => void;
  btn: boolean;
  updateQuantity: () => void;
}

// Define props for the Provider component
interface CartStateProps {
  children: ReactNode;
}

// --- API Calls ---

export const cartListContext = createContext<CartContextType | null>(null);

export const getCart = (): Promise<CartItem[]> => {
  return axios
    .get("https://myeasykart.codeyogi.io/carts", {
      headers: {
        Authorization: localStorage.getItem("logIn_Token") || "",
      },
    })
    .then((response) => response.data);
};

export function saveCart(cart: CartDetail): Promise<any> {
  console.log('cart save cart = ', cart);
  return axios
    .post(
      "https://myeasykart.codeyogi.io/carts",
      { data: cart },
      {
        headers: {
          Authorization: localStorage.getItem("logIn_Token") || "",
        },
      }
    )
    .then((response) => response.data)
    .catch((e) => {
      console.error('error in saving the cart to api', e);
    });
}

export const cartContext = (ids: (string | number)[]): Promise<Product[]> => {
  const commaSeperatedIds = ids.join();
  return axios
    .get("https://myeasykart.codeyogi.io/products/bulk", {
      params: {
        ids: commaSeperatedIds,
      },
    })
    .then((response) => response.data)
    .catch((e) => {
      console.error('single product error = ', e);
      return [];
    });
};

// --- Main Component ---

const CartState: React.FC<CartStateProps> = (props) => {
  // Note: Ensure your AlertContext and UserContext are also properly typed in their respective files
  const { alert, setalert } = useContext(AlertContext as any);
  const user = useContext(UserContext as any);

  // --- State ---
  const [data, setData] = useState<CartItem[]>([]);
  const [CartCount, setCartCount] = useState<number>(0);
  const [UserData, setUserData] = useState<any>();
  const [CartDetail, setCartDetail] = useState<CartDetail>({});
  const [btn, setBtn] = useState<boolean>(false);
  const [itemQuantity, setItemQuantity] = useState<CartDetail>({});

  // --- Helper Functions ---

  const cartQuantity = (prop: CartDetail = {}) => {
    const values = Object.values(prop);
    if (values.length > 0) {
      // Added an initial value of 0 to prevent reduce errors on empty arrays
      setCartCount(values.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    } else {
      setCartCount(0);
    }
  };

  const cartQuantityObj = (prop: CartItem[] = []): CartDetail => {
    // Fixed: Added the missing 'return' statement here
    return prop.reduce(
      (m, cartItem) => ({ ...m, [cartItem.product.id]: cartItem.quantity }),
      {} as CartDetail
    );
  };

  const setCartData = (props: CartDetail) => {
    cartContext(Object.keys(props)).then((products) => {
      const savedData: CartItem[] = products.map((p) => ({
        product: p,
        quantity: props[p.id],
      }));
      setData(savedData);
    });
  };

  // --- Effects ---

  useEffect(() => {
    if (!user.isLoggedIn) {
      const storageCartString = localStorage.getItem("cart-items");
      const storageCart: CartDetail = storageCartString ? JSON.parse(storageCartString) : {};
      const length = Object.keys(storageCart).length;

      if (length > 0) {
        setCartDetail(storageCart);
        cartQuantity(storageCart);
        setCartData(storageCart);
      } else {
        cartQuantity(storageCart);
      }
    } else {
      const storageCartString = localStorage.getItem("cart-items");
      const storageCart: CartDetail = storageCartString ? JSON.parse(storageCartString) : {};

      if (Object.keys(storageCart).length > 0) {
        let dataSet = Object.entries(storageCart);
        // Note: cartContext takes an array of IDs, fixing the input here
        const ids = dataSet.map(([id]) => id);
        cartContext(ids).then(() => {
          localStorage.removeItem("cart-items");
        });
      }

      getCart()
        .then((response) => {
          setData(response);
          let obj = cartQuantityObj(response);
          setCartDetail(obj);
          cartQuantity(obj);
        })
        .catch((e) => {
          console.error('no products in cart ', e);
          if (alert && setalert) {
            const error = { ...alert, message: 'There are no products in cart', type: 'error', hidden: false };
            setalert(error);
          }
        });
    }
  }, [user.isLoggedIn]);

  // --- Actions ---

  const onAddToCart = (proId: string | number, count: number) => {
    if (!user.isLoggedIn) {
      let oldcount = CartDetail[proId] || 0;
      let cartObj: CartDetail = { ...CartDetail, [proId]: oldcount + count };

      localStorage.setItem("cart-items", JSON.stringify(cartObj));
      setCartDetail(cartObj);
      cartQuantity(cartObj);
    } else {
      let obj = cartQuantityObj(data);
      setCartDetail(obj);
      
      const storageCartString = localStorage.getItem("cart-items");
      const storageCart: CartDetail = storageCartString ? JSON.parse(storageCartString) : {};

      if (Object.keys(storageCart).length > 0) {
        obj = { ...storageCart, ...obj };
        localStorage.removeItem("cart-items");
      }

      let oldcount = obj[proId] || 0;
      let cartObj: CartDetail = { ...obj, [proId]: oldcount + count };

      setCartDetail(cartObj);
      cartQuantity(cartObj);

      saveCart(cartObj)
        .then(() => getCart())
        .then((response) => setData(response))
        .catch((e) => console.error('error in api sender ', e));
    }
  };

  const handleDeleteCartItem = (id: string | number) => {
    let tempData: CartDetail = { ...CartDetail };
    // Fixed: 'delete' is an operator, not a function
    delete tempData[id];

    if (!user.isLoggedIn) {
      localStorage.setItem("cart-items", JSON.stringify(tempData));
      setCartDetail(tempData);
      cartQuantity(tempData);
    } else {
      setCartDetail(tempData);
      cartQuantity(tempData);

      saveCart(tempData)
        .then(() => getCart())
        .then((response) => setData(response))
        .catch((e) => console.error('error in api sender ', e));
    }
  };

  const HandleQuantity = (id: string | number, quantity: number) => {
    let cartObj: CartDetail = { ...CartDetail, [id]: quantity };
    setItemQuantity(cartObj);
    setBtn(true);
  };

  const updateQuantity = () => {
    setBtn(false);
    setCartDetail(itemQuantity);
    cartQuantity(itemQuantity);

    if (!user.isLoggedIn) {
      localStorage.setItem("cart-items", JSON.stringify(itemQuantity));
    } else {
      saveCart(itemQuantity)
        .then(() => getCart())
        .then((response) => setData(response))
        .catch((e) => console.error('error in api sender ', e));
    }
  };

  return (
    <cartListContext.Provider
      value={{
        data,
        setData,
        onAddToCart,
        CartCount,
        setUserData,
        handleDeleteCartItem,
        HandleQuantity,
        btn,
        updateQuantity,
      }}
    >
      {props.children}
    </cartListContext.Provider>
  );
};

export default CartState;