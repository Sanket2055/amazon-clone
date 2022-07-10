import img from "../../img/amazon_logo.png";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { itemsCount, name } = useSelector((store) => store.amazon);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${search}`);
    setSearch("");
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={img} alt="Amazon Logo" className="header--logo" />
      </Link>
      <form className="header--search" onSubmit={(e) => onClickSearch(e)}>
        <input
          type="text"
          name="search"
          className="header--search--inputbox"
          value={search}
          onChange={(e) => onChange(e)}
        />
        <SearchIcon
          className="header--search--searchlogo"
          onClick={onClickSearch}
        />
      </form>
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
