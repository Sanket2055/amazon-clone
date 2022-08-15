import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const getProducts = createAsyncThunk("amazon/getProducts", async (q) => {
  if (q) {
    const response = await axios.get(`/api/products?q=${q}`);
    return response.data;
  }

  const response = await axios.get(`/api/products`);
  return response.data;
});

export const getOrders = createAsyncThunk("amazon/getOrders", async () => {
  const response = await axios.get("/api/orders", {
    headers: {
      Authorization: `Bearer ${globalToken}`,
    },
  });
  return response.data;
});

export const order = createAsyncThunk(
  "amazon/order",
  async ({ cartItems, token, totalPrice }, thunkAPI) => {
    const response = await axios.post("/api/checkout", {
      token,
      cartItems,
      totalPrice,
    });
    const { success } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue();
    }
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
  }
);

export const register = createAsyncThunk(
  "amazon/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      await axios.post("/api/users", {
        name,
        email,
        password,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const login = createAsyncThunk(
  "amazon/login",
  async ({ email, password }) => {
    const response = await axios.post("/api/users/login", {
      email,
      password,
    });
    return response.data;
  }
);

const amazonSlice = createSlice({
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

    clearCart: (state) => {
      state.itemsCount = 0;
      state.cartItems = [];
      state.totalPrice = 0;
    },

    removeFromCart: (state, { payload }) => {
      const { price, _id, quantity } = payload;
      state.cartItems = state.cartItems.filter((item) => item.item._id !== _id);
      state.itemsCount = state.itemsCount - quantity;
      state.totalPrice = state.totalPrice - price * quantity;
    },

    logout: (state) => {
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
      toast.success(`Successfully logged out`, {
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
      toast.success(`Hello ${name}`, {
        duration: 1000,
      });
    },
    [login.rejected]: () => {
      toast.error(`Wrong credentials`, {
        duration: 1000,
      });
    },

    [register.fulfilled]: () => {
      toast.success(`Successfully registered, login to continue`, {
        duration: 3000,
      });
    },
    [register.rejected]: (state, { payload }) => {
      toast.error(payload, {
        duration: 1000,
      });
    },

    [order.fulfilled]: (state) => {
      state.itemsCount = 0;
      state.totalPrice = 0;
      state.cartItems = [];
    },
    [order.rejected]: () => {
      toast.error("Payment failed", {
        duration: 1000,
      });
    },

    [getOrders.fulfilled]: (state, { payload }) => {
      const { orders } = payload;
      state.allOrders = orders;
    },
  },
});

export const { reset, onClickAdd, clearCart, removeFromCart, logout } =
  amazonSlice.actions;

export default amazonSlice.reducer;
