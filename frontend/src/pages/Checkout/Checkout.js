import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearCart, order } from "../../features/amazon/amazonSlice";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice, id } = useSelector((store) => store.amazon);

  const onClickClearCart = () => {
    dispatch(clearCart());
    toast(`Cart cleared`, {
      duration: 1000,
    });
  };

  const onClickOrder = async () => {
    if (cartItems.length !== 0) {
      await dispatch(order(cartItems));
      navigate("/orders");
      toast(`Order placed`, {
        duration: 1000,
      });
    } else {
      toast(`Nothing to order`, {
        duration: 1000,
      });
    }
  };

  if (id === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="checkout">
      {cartItems.length === 0 ? (
        <div className="checkout--box">
          <div className="checkout--box--noproduct">
            Your Amazon Cart is empty
          </div>
        </div>
      ) : (
        <div className="checkout--box">
          <h2 className="checkout--box--heading">Shopping Cart</h2>
          <div className="checkout--box--items">
            {cartItems.map((item) => {
              return <CheckoutItem item={item} key={item.item._id} />;
            })}
          </div>
        </div>
      )}
      <div className="checkout--btn">
        <button onClick={onClickClearCart} className="checkout-btn-clearcart">
          Clear Cart
        </button>
        <button className="checkout-btn-placeorder" onClick={onClickOrder}>
          Place Order
        </button>
        <div className="checkout--btn--total_price">
          <span className="checkout--btn--total_price--span">Subtotal: </span>
          <small>₹</small>
          {totalPrice}
        </div>
      </div>
    </div>
  );
};
export default Checkout;
