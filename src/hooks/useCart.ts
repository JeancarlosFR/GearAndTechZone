import { Producto, CartItem } from '../types/index';
import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import "react-toastify/dist/ReactToastify.css";

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

    function removeFromCart(id: Producto['id']){
        const updatedCart = cart.filter((producto) => producto.id !== id)
        setCart(updatedCart)
    }

    function increaseQuantity(id: Producto['id']){
        const updatedCart = cart.map((producto) => {
            if(producto.id === id){
                return {
                    ...producto,
                    quantity: producto.quantity + 1
                }
            }
            return producto
    })
    setCart(updatedCart)
    }

    function decreaseQuantity(id: Producto['id']){
        const updatedCart = cart.map((producto) => {
            if(producto.id === id && producto.quantity > 1){
                return {
                    ...producto,
                    quantity: producto.quantity - 1
                }
            }
            return producto
    })
    setCart(updatedCart)
    }

    function clearCart(){
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]) 
    const total = useMemo(() => cart.reduce((total, item) => total + (item.price*item.quantity), 0), [cart])


    return {
        data,
        cart,
        addToCart,
        isEmpty,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        total,
        clearCart

    }
}