import styles from "./Cart.module.css";
import { useContext } from "react";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const context = useContext(AppContext);

  return (
    <>
      {context.items.length === 0 && (
        <div className={styles.empty}>
          <img src="/images/plants/bag.png" alt="" />
          <h3>Whoops...Your bag is empty. </h3>
          <h4>Looks like you haven't added anything to your bag yet</h4>{" "}
        </div>
      )}

      {context.items.length > 0 && (
        <div className={styles.wrapper}>
          <div className={styles.cart}>
            {context.items.map((product) => {
              return (
                <div className={styles.product} key={product._id}>
                  <img src={product.image} alt="" />
                  <div>
                    <div className={styles.name}>{product.name}</div>

                    <div>
                      <button
                        type="button"
                        onClick={() => context.removeItem(product)}
                      >
                        -
                      </button>
                      {/* <input type="number" value={product.amount} /> */}
                      <input type="number" value={product.amount} readOnly disabled />
                      <button
                        type="button"
                        onClick={() => context.addItem(product)}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.price}>{`$${
                      product.price * product.amount
                    }`}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <section className={styles.summary}>
            <h3>Order Summary</h3>
            <div>
              <div>
                <div>Order</div>

                <span>{`$${context.totalPrice}`}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>$10</span>
              </div>
              <div>
                <span>Total</span>
                <span>{`$${context.totalPrice + 10}`}</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className={styles.button}>Place Order</button>
            </Link>
          </section>
        </div>
      )}
    </>
  );
};

export default Cart;
