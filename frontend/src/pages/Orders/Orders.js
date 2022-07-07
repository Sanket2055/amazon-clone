import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem";
import { getOrders } from "../../features/products/productsSlice";
import { useEffect } from "react";

const Orders = () => {
  const dispatch = useDispatch();
  const { id, allOrders } = useSelector((store) => store.products);

  useEffect(() => {
    if (id !== null) dispatch(getOrders());
  }, [dispatch, id]);

  if (id === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="orders--box">
          <div className="orders--box--noorders">You have no orders</div>
        </div>
      ) : (
        <div className="orders--box">
          <h2 className="orders--box--heading">Your orders</h2>
          <div className="orders--box--items">
            {allOrders
              .slice(0)
              .reverse()
              .map((order) => {
                return <OrderItem order={order} key={order._id} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Orders;
