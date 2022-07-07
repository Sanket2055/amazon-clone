import "./OrderItem.css";

const OrderItem = ({ order }) => {
  const { name, price, img, quantity } = order;
  return (
    <div className="OrderItem">
      <div className="OrderItem--info">
        <div className="OrderItem--info--name">{name}</div>
        <img src={img} alt={name} className="OrderItem--info--img" />
      </div>
      <div className="ckeckoutItem--quantity">
        <div className="OrderItem--quantity--quantity">Qty: {quantity}</div>
        <div className="OrderItem--quantity--price">
          <span className="OrderItem--quantity--quantity">Total: </span>₹{" "}
          {price * quantity}
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
