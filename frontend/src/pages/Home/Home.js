import img from "../../img/poster.jpg";
import Product from "../../components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/amazon/amazonSlice";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { productsList } = useSelector((store) => store.amazon);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home--container">
        <a
          href="https://www.primevideo.com/detail/The-Terminal-List/0NGB908JKDOZ29WLQ2GS45USOV"
          target="__blank"
        >
          <img src={img} className="home--poster" alt="the-terminal-list" />
        </a>
      </div>
      <div className="products">
        {productsList.map((product) => {
          return <Product {...product} key={product._id} />;
        })}
      </div>
    </div>
  );
};
export default Home;
