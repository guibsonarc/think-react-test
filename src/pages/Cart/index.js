import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from "react-icons/md";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { formatPrice } from "../../util/format";
import {
  updateAmountRequest,
  removeFromCart,
} from "../../store/modules/cart/actions";

import { Container, ProductTable, Total } from "./styles";

import FormCheckoutCart from "../../components/FormCheckoutCart";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const totalProducts = useSelector((state) => state.cart.length);
  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce(
        (sumTotal, product) => sumTotal + product.price * product.amount,
        0
      )
    )
  );
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <div className="root">
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {cart.map((product) => (
              <tr>
                <td>
                  <img src={product.picture} alt={product.title} />
                </td>

                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>

                <td>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#e60014" />
                    </button>

                    <input type="number" readOnly value={product.amount} />

                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#e60014" />
                    </button>
                  </div>
                </td>

                <td>
                  <strong>{product.subtotal}</strong>
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    <MdDelete size={20} color="#e60014" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <button
            onClick={() => (totalProducts > 0 ? setOpen(true) : null)}
            type="button"
          >
            Finalizar pedido
          </button>

          <Total>
            <span>Total</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <FormCheckoutCart />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
