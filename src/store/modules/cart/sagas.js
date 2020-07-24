import { call, select, put, all, takeLatest } from "redux-saga/effects";

import { toast } from "react-toastify";

import api from "../../../services/api";
import history from "../../../services/history";

import { formatPrice } from "../../../util/format";

import {
  addToCartSuccess,
  updateAmountSuccess,
  checkoutCartSuccess,
} from "./actions";

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((product) => product.id === id)
  );

  const stock = yield call(api.get, `products/${id}`);

  const stockAmount = stock.data.quantity;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error("Quantidade solicitada fora do estoque!");
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
    return;
  }

  const response = yield call(api.get, `products/${id}`);

  const data = {
    ...response.data,
    amount: 1,
    priceFormatted: formatPrice(response.data.price),
  };

  yield put(addToCartSuccess(data));

  history.push("/cart");
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `products/${id}`);
  const stockAmount = stock.data.quantity;

  if (amount > stockAmount) {
    toast.error("Quantidade solicitada fora do estoque!");
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

function* checkoutCart() {
  toast.success("Sua compra foi enviada!");

  history.push("/");

  yield put(checkoutCartSuccess());
}

export default all([
  takeLatest("@cart/ADD_REQUEST", addToCart),
  takeLatest("@cart/UPDATE_AMOUNT_REQUEST", updateAmount),
  takeLatest("@cart/CHECKOUT_REQUEST", checkoutCart),
]);
