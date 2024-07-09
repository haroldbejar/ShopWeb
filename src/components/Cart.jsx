import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { decreaseQuantity, removeFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center border p-4 mb-4 rounded-lg shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-700">Cantidad: {item.quantity}</p>
                <p className="text-gray-700">
                  Precio por unidad: ${item.price}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.productId)}
                    className="bg-gray-200 p-2 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(item.productId)}
                    className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-bold">
                  Precio total: ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-6 p-4 border-t">
            <h2 className="text-xl font-bold">Resumen</h2>
            <p className="text-gray-700">Total de productos: {totalQuantity}</p>
            <p className="text-gray-800 font-bold">
              Costo total: ${totalPrice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
