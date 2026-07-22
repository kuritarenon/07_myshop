// src/pages/Home.jsx
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { DEFAULT_CARE_BEAR_ITEMS } from "../data/careBearsData.js";

const INITIAL_COUNT = 9;
const STEP = 9;

// キャラクター分類グループの定義
const CHARACTER_CATEGORIES = [
  { id: "all", name: "すべて" },
  { id: "cheer-bear", name: "チアベア", bears: ["cheer-bear"] },
  { id: "wish-bear", name: "ウィッシュベア", bears: ["wish-bear"] },
  { id: "grumpy-bear", name: "グランピーベア", bears: ["grumpy-bear"] },
  { id: "share-bear", name: "シェアベア", bears: ["share-bear"] },
  { id: "funshine-bear", name: "ファンシャインベア", bears: ["funshine-bear"] },
  { id: "goodluck-bear", name: "グッドラックベア", bears: ["goodluck-bear"] },
  { id: "tenderheart-bear", name: "テンダーハートベア", bears: ["tenderheart-bear"] },
  { id: "bedtime-bear", name: "ベッドタイムベア", bears: ["bedtime-bear"] },
];

export default function Home({ favorites, cart }) {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);
  const [selectedCharacterId, setSelectedCharacterId] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let isMounted = true;
    getDocs(collection(db, "items"))
      .then((snapshot) => {
        if (!isMounted) return;
        const firestoreItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (firestoreItems.length > 0) {
          setItems(firestoreItems);
        } else {
          setItems(DEFAULT_CARE_BEAR_ITEMS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Firestore error fallback", err);
        if (isMounted) {
          setItems(DEFAULT_CARE_BEAR_ITEMS);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="loading">読み込み中...</p>;
  }

  const currentCharacterCategory = CHARACTER_CATEGORIES.find((c) => c.id === selectedCharacterId);

  // 1. キャラクター分類で絞り込み
  let filteredItems = items.filter((item) => {
    if (selectedCharacterId === "all") return true;
    if (!currentCharacterCategory) return true;
    return currentCharacterCategory.bears.includes(item.bearId);
  });

  // 2. 並び替え（ソート）
  filteredItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-asc") {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortBy === "price-desc") {
      return (b.price || 0) - (a.price || 0);
    }
    if (sortBy === "newest") {
      return String(b.id).localeCompare(String(a.id));
    }
    return 0;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <div className="home">
      {/* キャラクター別で分類するフィルター */}
      <div className="color-filter">
        <div className="color-filter__buttons">
          {CHARACTER_CATEGORIES.map((charCat) => (
            <button
              type="button"
              key={charCat.id}
              className={`color-btn ${selectedCharacterId === charCat.id ? "is-active" : ""}`}
              onClick={() => {
                setSelectedCharacterId(charCat.id);
                setVisibleCount(INITIAL_COUNT);
              }}
            >
              {charCat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 件数表示 & 並び替え (ソート) バー */}
      <div className="home-control-bar">
        <div className="item-count-badge">
          {currentCharacterCategory ? `${currentCharacterCategory.name}のアイテム` : "すべてのアイテム"}:{" "}
          <span className="count-num">{filteredItems.length}</span> 件
        </div>

        <div className="sort-box">
          <label htmlFor="sort-select" className="sort-label">
            並び替え:
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">おすすめ順</option>
            <option value="price-asc">価格が安い順</option>
            <option value="price-desc">価格が高い順</option>
            <option value="newest">新着順</option>
          </select>
        </div>
      </div>

      <ul className="home__list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} favorites={favorites} cart={cart} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className="home__more"
          onClick={() => setVisibleCount((c) => c + STEP)}
        >
          more
        </button>
      )}
    </div>
  );
}
