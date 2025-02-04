
import Header from './components/Header'
import Producto from './components/Producto'
import { useCart } from './hooks/useCart'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

    const {data, cart, addToCart, isEmpty,removeFromCart, increaseQuantity, decreaseQuantity, total, clearCart} = useCart();

    

  return (
    <>
      
    <Header 
        cart={cart}
        isEmpty={isEmpty}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        total={total}
        clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((producto) => (
                <Producto 
                 key = {producto.id}
                 producto = {producto}
                 addToCart={addToCart}
                 
                
                />
                
            ))}
            
        </div>
        <ToastContainer />

    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GearAndTechZone - Todos los derechos Reservados</p>
        </div>
    </footer>

      
    </>
  )
}

export default App
