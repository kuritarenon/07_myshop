// src/pages/ItemDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { DEFAULT_CARE_BEAR_ITEMS } from "../data/careBearsData.js";

// サンプルカスタマーレビューデータ
const INITIAL_REVIEWS = [
  {
    id: 1,
    author: "もも",
    rating: 5,
    date: "2026/07/15",
    comment: "写真通りのパステルカラーでとっても可愛いです！抱き心地も最高で毎日癒やされています。"
  },
  {
    id: 2,
    author: "CareBearFan",
    rating: 5,
    date: "2026/07/18",
    comment: "プレゼント用に購入しました。ラッピングも可愛くてとても喜んでもらえました！"
  },
  {
    id: 3,
    author: "ほしぞら",
    rating: 4,
    date: "2026/07/20",
    comment: "作りがしっかりしていて満足です。色違いも欲しくなりました。"
  }
];

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // レビュー状態
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    getDocs(collection(db, "items"))
      .then((snapshot) => {
        if (!isMounted) return;
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const list = data.length > 0 ? data : DEFAULT_CARE_BEAR_ITEMS;
        const found = list.find((i) => i.id === id);
        setItem(found ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Firestore error fallback", err);
        if (isMounted) {
          const found = DEFAULT_CARE_BEAR_ITEMS.find((i) => i.id === id);
          setItem(found ?? null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // 星を描画するヘルパー
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star-icon is-filled" : "star-icon"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // レビュー追加処理
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry = {
      id: Date.now(),
      author: newAuthor.trim() || "匿名ユーザー",
      rating: Number(newRating),
      date: new Date().toLocaleDateString("ja-JP"),
      comment: newComment.trim()
    };

    setReviews([newEntry, ...reviews]);
    setNewAuthor("");
    setNewComment("");
    setNewRating(5);
    setIsFormOpen(false);
    setSubmittedMessage("レビューを投稿しました。ありがとうございます！");

    setTimeout(() => setSubmittedMessage(""), 4000);
  };

  // 平均評価の計算
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  if (loading) {
    return <p className="loading">読み込み中...</p>;
  }

  if (!item) {
    return (
      <div className="item-detail item-detail--notfound">
        <p>アイテムが見つかりません。</p>
        <Link to="/" className="item-detail__back">
          ← 一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="item-detail-wrapper">
      <div className="item-detail">
        <Link to="/" className="item-detail__back">
          ← 一覧へ戻る
        </Link>
        <div className="item-detail__image">
          <img src={item.image} alt={item.name} />
          {item.status === "soldout" && <span className="item-detail__badge">soldout</span>}
        </div>
        <div className="item-detail__body">
          <p className="item-detail__category">{item.category}</p>
          <h2 className="item-detail__name">{item.name}</h2>
          <p className="item-detail__price">¥{item.price ? item.price.toLocaleString() : 0}</p>

          {/* 平均星評価バッジ */}
          <div className="item-detail__rating-summary">
            <span className="rating-stars">{renderStars(Math.round(avgRating))}</span>
            <span className="rating-score">{avgRating}</span>
            <span className="rating-count">（{reviews.length}件のレビュー）</span>
          </div>

          <p className="item-detail__description">{item.description}</p>

          <dl className="item-detail__specs">
            <div className="item-detail__spec">
              <dt>品番</dt>
              <dd>{item.code || "CB-001"}</dd>
            </div>
            <div className="item-detail__spec">
              <dt>カラー</dt>
              <dd>{item.color || "パステルマルチ"}</dd>
            </div>
            <div className="item-detail__spec">
              <dt>サイズ</dt>
              <dd>{item.size || "フリー"}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ---------- カスタマーレビュー一覧 ---------- */}
      <section className="item-reviews-section">
        <h3 className="reviews-title">カスタマーレビュー</h3>

        <div className="reviews-overview">
          <div className="overview-score-box">
            <span className="overview-score">{avgRating}</span>
            <div className="overview-stars">{renderStars(Math.round(avgRating))}</div>
            <span className="overview-total">5点満点中 / {reviews.length}件の評価</span>
          </div>
        </div>

        {submittedMessage && <p className="review-submitted-msg">{submittedMessage}</p>}

        {/* レビュー一覧 */}
        <div className="reviews-list">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card__header">
                <div className="review-card__stars">{renderStars(rev.rating)}</div>
                <span className="review-card__rating-num">{rev.rating}.0</span>
                <span className="review-card__author">{rev.author}</span>
                <span className="review-card__date">{rev.date}</span>
              </div>
              <p className="review-card__comment">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* レビューの下に「レビューを書く」ボタン */}
        <div className="write-review-container">
          <button
            type="button"
            className="write-review-toggle-btn"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? "閉じる" : "レビューを書く"}
          </button>
        </div>

        {/* 開閉されるレビュー投稿フォーム */}
        {isFormOpen && (
          <form className="review-form" onSubmit={handleAddReview}>
            <h4>レビューを投稿する</h4>

            <div className="review-form__row">
              <label className="review-form__label">
                評価（星の数）:
                <select
                  className="review-form__select"
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                >
                  <option value="5">★★★★★ (5 - 最高！)</option>
                  <option value="4">★★★★☆ (4 - 満足)</option>
                  <option value="3">★★★☆☆ (3 - 普通)</option>
                  <option value="2">★★☆☆☆ (2 - イマイチ)</option>
                  <option value="1">★☆☆☆☆ (1 - 不満)</option>
                </select>
              </label>

              <label className="review-form__label">
                お名前:
                <input
                  type="text"
                  className="review-form__input"
                  placeholder="例: もも"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </label>
            </div>

            <label className="review-form__label">
              コメント:
              <textarea
                className="review-form__textarea"
                rows="3"
                placeholder="商品の感想を教えてください..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="review-form__submit">
              投稿する
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
