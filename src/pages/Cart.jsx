// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { DEFAULT_CARE_BEAR_ITEMS } from "../data/careBearsData.js";

export default function Cart({ cart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getDocs(collection(db, "items"))
      .then((snapshot) => {
        if (!isMounted) return;
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(data.length > 0 ? data : DEFAULT_CARE_BEAR_ITEMS);
      })
      .catch(() => {
        if (isMounted) {
          setItems(DEFAULT_CARE_BEAR_ITEMS);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = cart.entries
    .map((entry) => {
      const item = items.find((i) => i.id === entry.id);
      return item ? { ...item, quantity: entry.quantity } : null;
    })
    .filter((row) => row !== null);

  const totalPrice = rows.reduce((sum, row) => sum + row.price * row.quantity, 0);

  if (cart.entries.length === 0) {
    return (
      <div className="page-placeholder">
        <h2>cart</h2>
        <p>
          カートは空です。<Link to="/">一覧へ戻る</Link>
        </p>
      </div>
    );
  }

  return (
    <section className="cart">
      <h2>カート</h2>
      <ul className="cart-list">
        {rows.map((row) => (
          <li key={row.id} className="cart-row">
            <img src={row.image} alt={row.name} />
            <div className="cart-row__info">
              <p>{row.name}</p>
              <p>¥{row.price ? row.price.toLocaleString() : 0}</p>
            </div>
            <div className="cart-row__quantity">
              <button type="button" onClick={() => cart.update(row.id, row.quantity - 1)}>−</button>
              <span>{row.quantity}</span>
              <button type="button" onClick={() => cart.update(row.id, row.quantity + 1)}>＋</button>
            </div>
            <p className="cart-row__subtotal">¥{(row.price * row.quantity).toLocaleString()}</p>
            <button type="button" className="cart-row__remove" onClick={() => cart.remove(row.id)}>削除</button>
          </li>
        ))}
      </ul>
      <p className="cart-total">合計：¥{totalPrice.toLocaleString()}</p>
    </section>
  );
}
