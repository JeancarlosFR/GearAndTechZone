import { Producto, CartItem } from '../types/index';
import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart= localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      },[cart])

    function addToCart(item: Producto){

        const itemExists = cart.findIndex((producto) => producto.id === item.id)

        if(itemExists >= 0){
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart);
        }else{
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem]);
        }
        
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]) 


    return {
        data,
        cart,
        addToCart,
        isEmpty

    }
}