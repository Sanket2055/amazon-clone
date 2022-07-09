import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { onClickAdd } from "../../features/amazon/amazonSlice";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";

const Product = ({ name, rating, img, price, _id }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.amazon);

  const onClick = () => {
    if (id === null) {
      toast(`Please login`, {
        duration: 1000,
      });
      return;
    }

    dispatch(onClickAdd({ _id, name, img, price, rating }));
    toast(`Added ${name} to cart`, {
      duration: 1000,
    });
  };

  return (
    <div className="product">
      <div className="product--info">
        <p>{name}</p>
        <p className="product--price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product--rating">
          <StarRatings
            rating={rating}
            starRatedColor="#FFD700"
            starDimension="2em"
          />
        </div>
        <img src={img} className="product--img" alt="product" />
        <button onClick={onClick} className="product--info--addtocart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Product;
