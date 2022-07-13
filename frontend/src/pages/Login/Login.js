import "./Login.css";
import { login, logout, register } from "../../features/amazon/amazonSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { isLoggedIn } = useSelector((store) => store.amazon);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onClickSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    await dispatch(login({ email, password }));
    setLoginData({ email: "", password: "" });
  };

  const onClickRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = registerData;

    if (!name || !email || !password || !password2) {
      toast.error(`Enter all fields`, {
        duration: 1000,
      });
    } else if (password !== password2 || password === "") {
      toast.error(`Passwords don't match`, {
        duration: 1000,
      });
    } else {
      await dispatch(register({ name, email, password }));
      setRegisterData({ name: "", email: "", password: "", password2: "" });
    }
  };

  const onClickSignOut = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const onChangeRegister = (e) => {
    setRegisterData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onChangeLogin = (e) => {
    setLoginData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="login">
        <form className="login--form">
          <h3 className="login--heading">Sign-In</h3>
          <label className="login--form--label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="login--form--input"
            value={loginData.email}
            onChange={(e) => onChangeLogin(e)}
          />
          <label className="login--form--label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="login--form--input"
            value={loginData.password}
            onChange={(e) => onChangeLogin(e)}
          />
          <button className="login--form--button" onClick={onClickSignIn}>
            Continue
          </button>
        </form>
        <form className="login--form">
          <h3 className="login--heading">Register</h3>
          <label className="login--form--label" htmlFor="email">
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="login--form--input"
            value={registerData.name}
            onChange={(e) => onChangeRegister(e)}
          />
          <label className="login--form--label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="login--form--input"
            value={registerData.email}
            onChange={(e) => onChangeRegister(e)}
          />
          <label className="login--form--label" htmlFor="email">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="login--form--input"
            value={registerData.password}
            onChange={(e) => onChangeRegister(e)}
          />
          <label className="login--form--label" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            className="login--form--input"
            value={registerData.password2}
            onChange={(e) => onChangeRegister(e)}
          />
          <button className="login--form--button" onClick={onClickRegister}>
            Continue
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="login">
        <form className="login--form">
          <h3 className="login--heading">Sign out</h3>
          <button className="login--form--button" onClick={onClickSignOut}>
            Sign out
          </button>
        </form>
      </div>
    );
  }
};
export default Login;
