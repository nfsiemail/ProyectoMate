import { useCart } from "../../context/CartContext";
import { FcPaid, FcEmptyTrash } from "react-icons/fc";


export const CartSummary = () => {
  const { getCartTotal, checkout, clearCart } = useCart();

  const total = getCartTotal();
  const handleClearCart = () => {
    if (window.confirm("¿Querés vaciar el carrito?")) {
      clearCart();
    }
  };

  return (
    <>
      <p>TOTAL A PAGAR:👉 ${total} </p>
      <button className="btn bg-success primary"
        onClick={checkout}
        type="button"
        >FINALIZAR COMPRA<FcPaid />
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleClearCart}
        >Vaciar carrito<FcEmptyTrash />
      </button>
    </>
  );
};
