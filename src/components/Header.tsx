import { CartItem, Producto } from "../types/index"
import { useToast } from "../hooks/useToast"

type HeaderProps = {
    cart: CartItem[],
    isEmpty: boolean,
    increaseQuantity: (id: Producto['id']) => void
    decreaseQuantity: (id: Producto['id']) => void
    removeFromCart: (id: Producto['id']) => void
    total: number
    clearCart: () => void
}
const {mostrarAlertaError} = useToast()

export default function Header({cart, isEmpty,removeFromCart, increaseQuantity, decreaseQuantity, total, clearCart}: HeaderProps){
    return (
        
<header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <h1>GearAndTechZone</h1>                    
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ) : ( 
                                <>
                            <table className="w-100 table">
                                <thead>
                                    <tr >
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(producto => (
                                    <tr key={producto.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${producto.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{producto.name}</td>
                                        <td className="fw-bold">
                                                ${producto.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => decreaseQuantity(producto.id)}
                                            >
                                                -
                                            </button>
                                                {producto.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => increaseQuantity(producto.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => {removeFromCart(producto.id),mostrarAlertaError(`Se ha eliminado ${producto.name} del carrito`)}}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}       
                                </tbody>
                                </table>                          
                            <p className="text-end">Total pagar: <span className="fw-bold">${total}</span></p>
                            </>
                            )}
                            <button 
                            className="btn btn-dark w-100 mt-3 p-2"
                            onClick={() => {clearCart(),mostrarAlertaError('Se ha vaciado el carrito')}}
                            >
                                Vaciar Carrito</button>
                                
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>


    )
}