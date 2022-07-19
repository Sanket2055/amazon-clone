import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearCart, order } from "../../features/amazon/amazonSlice";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import toast from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice, id, name } = useSelector(
    (store) => store.amazon
  );

  const onClickClearCart = () => {
    dispatch(clearCart());
    toast.success(`Cart cleared`, {
      duration: 1000,
    });
  };

  const handleToken = async (token, addresses) => {
    if (cartItems.length !== 0) {
      try {
        const res = await dispatch(order({ cartItems, token, totalPrice }));
        if (!res.error) {
          navigate("/orders");
          toast.success(`Order placed`, {
            duration: 1000,
          });
        }
      } catch (error) {
        toast.error(`Payment failed`, {
          duration: 1000,
        });
      }
    } else {
      toast.error(`Nothing to order`, {
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
        <StripeCheckout
          className="checkout-btn-placeorder"
          stripeKey="pk_test_51LN1xFSFXPK1gBPWkoFKNVWNyw045v2BvCAG29SU7oCZ3rHBOWrBaugdryUGP6lrl37EDb2IsaAiqXyvYmdfGrOP002HqIKdye"
          token={handleToken}
          amount={totalPrice * 100}
          currency="INR"
          name={name}
          billingAddress
          shippingAddress
        />
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
