'use client'
import { useState, useEffect } from 'react';

export function useCart(initialValue = 0) {

    const [cartItems, setCartItems] = useState<any[]>([]); // State to hold cart items
    useEffect(()=>{
        const fetchCartItems = () => {
            // Retrieve cart items from Local Storage
            const storedCartItems = localStorage.getItem('cartItems');
            if (storedCartItems) {
              setCartItems(JSON.parse(storedCartItems)); // Parse and set in state
            }
          };
          fetchCartItems()
    },[])
    const addToCart = (product: any) => {
        // Retrieve existing cart items from Local Storage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
        const exist = existingCartItems.find((item: any) => item.id === product.id);
        if (exist) {
          // If product already exists, increase quantity
          const updatedCartItems = existingCartItems.map((item: any) =>
            item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item
          );

          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
          // If it's a new product, add it to the cart
          const newProduct = { ...product, quantity: 1 };
          existingCartItems.push(newProduct);
          localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
           
        }
    
        console.log('Product added to cart:', product);
      };
    const totalItems=cartItems.length

  return [cartItems, setCartItems,totalItems,addToCart];
}