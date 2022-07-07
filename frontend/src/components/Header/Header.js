import img from "../../img/amazon_logo.png";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { itemsCount, name } = useSelector((store) => store.products);

  return (
    <div className="header">
      <Link to="/">
        <img src={img} alt="Amazon Logo" className="header--logo" />
      </Link>
      <div className="header--search">
        <input type="text" className="header--search--inputbox" />
        <SearchIcon className="header--search--searchlogo" />
      </div>
      <div className="header--nav">
        <Link to="/login">
          <div className="header--nav--items">
            <span className="header--nav--lineone">Hello</span>
            <span className="header--nav--linetwo">
              {name ? name : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header--nav--items">
            <span className="header--nav--lineone">Returns</span>
            <span className="header--nav--linetwo">& Orders</span>
          </div>
        </Link>
        <a href="https://www.amazon.in/amazonprime" target="__blank">
          <div className="header--nav--items">
            <span className="header--nav--lineone">Your</span>
            <span className="header--nav--linetwo">Prime</span>
          </div>
        </a>
        <Link to="/checkout">
          <div className="header--nav--cart">
            <ShoppingCartIcon />
            <div className="header--nav--cart--count">{itemsCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Header;
