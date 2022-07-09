import "./CheckoutItem.css";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../features/amazon/amazonSlice";

const CheckoutItem = ({ item }) => {
  const { quantity } = item;
  const { name, price, img, _id } = item.item;
  const dispatch = useDispatch();

  const onClickRemove = () => {
    dispatch(removeFromCart({ _id }));
  };

  return (
    <div className="checkoutItem">
      <div className="checkoutItem--info">
        <div className="checkoutItem--info--name">{name}</div>
        <img src={img} alt={name} className="checkoutItem--info--img" />
      </div>
      <div className="checkoutItem--quantity">
        <div className="checkoutItem--quantity-remove" onClick={onClickRemove}>
          Remove item
        </div>
        <div className="checkoutItem--quantity--quantity">Qty: {quantity}</div>
        <div className="checkoutItem--quantity--price">₹ {price}</div>
      </div>
    </div>
  );
};
export default CheckoutItem;
