import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import logo from "../../assets/images/logo.svg";
import { formatPrice } from "../../util/format";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: 16,
  },
  appbar: {
    backgroundColor: "#E60014",
  },
  badge: {
    backgroundColor: "#CD0114",
    color: "#FFF",
  },
  cartSection: {
    display: "flex",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  icon: {
    color: "#FFF",
  },
}));

export default function Header() {
  const classes = useStyles();

  const totalPrice = useSelector((state) =>
    formatPrice(
      state.cart.reduce(
        (sumTotal, product) => sumTotal + product.price * product.amount,
        0
      )
    )
  );

  const totalItems = useSelector((state) => state.cart.length);

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link to="/">
            <figure>
              <img src={logo} alt="logo" />
            </figure>
          </Link>
          <div className={classes.grow} />
          <div className={classes.cartSection}>
            <Typography className={classes.price} variant="h6" noWrap>
              {totalPrice}
            </Typography>
            <Link to="/cart">
              <IconButton>
                <Badge
                  badgeContent={totalItems}
                  classes={{ badge: classes.badge }}
                >
                  <ShoppingCart className={classes.icon} />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
