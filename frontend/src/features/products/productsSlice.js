// eslint-disable-next-line
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

let globalToken = JSON.parse(localStorage.getItem("token"));
let name = JSON.parse(localStorage.getItem("name"));
let id = JSON.parse(localStorage.getItem("id"));

const initialState = {
  name: name ? name : null,
  id: id ? id : null,
  productsList: [],
  isLoggedIn: id ? true : false,
  itemsCount: 0,
  cartItems: [],
  allOrders: [],
  totalPrice: 0,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get("/api/products");
    return response.data;
  }
);

export const getOrders = createAsyncThunk("products/getOrders", async () => {
  const response = await axios.get("/api/orders", {
    headers: {
      Authorization: `Bearer ${globalToken}`,
    },
  });
  console.log(response);
  return response.data;
});

export const order = createAsyncThunk("products/order", async (cartItems) => {
  for (const cartItem of cartItems) {
    const { _id, name, img, price } = cartItem.item;
    const quantity = cartItem.quantity;
    await axios.post(
      "/api/orders",
      {
        productId: _id,
        name,
        img,
        price,
        quantity,
        userId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${globalToken}`,
        },
      }
    );
  }
});

export const register = createAsyncThunk(
  "products/register",
  async ({ name, email, password }) => {
    await axios.post("/api/users", {
      name,
      email,
      password,
    });
  }
);

export const login = createAsyncThunk(
  "products/login",
  async ({ email, password }) => {
    const response = await axios.post("/api/users/login", {
      email,
      password,
    });
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    onClickAdd: (state, { payload }) => {
      const price = payload.price;

      let exists = false;
      state.cartItems.forEach((item) => {
        if (item.item._id === payload._id) {
          item.quantity++;
          exists = true;
        }
      });

      if (!exists) {
        state.cartItems.push({ item: payload, quantity: 1 });
      }

      state.totalPrice = state.totalPrice + price;
      state.itemsCount++;
    },

    clearCart: (state, action) => {
      state.itemsCount = 0;
      state.cartItems = [];
      state.totalPrice = 0;
    },

    removeFromCart: (state, { payload }) => {
      const id = payload._id;
      state.cartItems = state.cartItems.filter((item) => item.item._id !== id);
      state.itemsCount = state.itemsCount - 1;
    },

    logout: (state, action) => {
      state.token = null;
      state.name = null;
      state.id = null;
      state.productsList = [];
      state.itemsCount = 0;
      state.cartItems = [];
      state.allOrders = [];
      state.totalPrice = 0;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      toast(`Successfully logged out`, {
        duration: 3000,
      });
    },
  },

  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.productsList = payload.products;
    },

    [login.fulfilled]: (state, { payload }) => {
      const { token, name, id } = payload;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("name", JSON.stringify(name));
      localStorage.setItem("id", JSON.stringify(id));
      globalToken = token;
      state.isLoggedIn = true;
      state.token = token;
      state.name = name;
      state.id = id;
      toast(`Hello ${name}`, {
        duration: 1000,
      });
    },
    [login.rejected]: (state, action) => {
      toast(`Wrong credentials`, {
        duration: 1000,
      });
    },

    [register.fulfilled]: (state, action) => {
      toast(`Successfully registered, login to continue`, {
        duration: 3000,
      });
    },
    [register.rejected]: (state, action) => {
      toast(`Email already exists`, {
        duration: 1000,
      });
    },

    [order.fulfilled]: (state, action) => {
      state.itemsCount = 0;
      state.totalPrice = 0;
      state.cartItems = [];
    },

    [getOrders.fulfilled]: (state, { payload }) => {
      const { orders } = payload;
      state.allOrders = orders;
    },
  },
});

export const { reset, onClickAdd, clearCart, removeFromCart, logout } =
  productsSlice.actions;

export default productsSlice.reducer;
