// src/data/careBearsData.js

export const CARE_BEARS_CHARACTERS = [
  {
    id: "wish-bear",
    name: "Wish Bear",
    japaneseName: "ウィッシュベア",
    color: "#7fd3ff",
    secondaryColor: "#e0f2fe",
    quote: "星に願いをかけて… あなたの夢が叶いますように",
    description: "夜空に輝く流れ星のお腹マークを持ち、みんなの願い事を応援してくれます。"
  },
  {
    id: "cheer-bear",
    name: "Cheer Bear",
    japaneseName: "チアベア",
    color: "#ff94cb",
    secondaryColor: "#ffe4f1",
    quote: "レインボーパワーで、いつでも元気をチャージ！",
    description: "鮮やかな虹のお腹マークが目印。みんなを笑顔にする頼もしいムードメーカー！"
  },
  {
    id: "share-bear",
    name: "Share Bear",
    japaneseName: "シェアベア",
    color: "#c084fc",
    secondaryColor: "#f3e8ff",
    quote: "大好きなものは、みんなでシェアするのが一番幸せ",
    description: "2本のストローが付いたミルクセーキマーク。分かち合う喜びを教えてくれる心優しいベア。"
  },
  {
    id: "funshine-bear",
    name: "Funshine Bear",
    japaneseName: "ファンシャインベア",
    color: "#facc15",
    secondaryColor: "#fef9c3",
    quote: "太陽の輝きとスマイルで、毎日が冒険！",
    description: "ニコニコ太陽マークのお腹。あかるい黄色で、みんなをポカポカ温かい気持ちにしてくれます。"
  },
  {
    id: "grumpy-bear",
    name: "Grumpy Bear",
    japaneseName: "グランピーベア",
    color: "#38bdf8",
    secondaryColor: "#e0f2fe",
    quote: "たまには雨の日もあるさ。だから晴れの日の嬉しさがわかるんだ",
    description: "雨雲とハートのしずくマーク。ちょっぴり不機嫌な顔もキュートなツンデレベア。"
  },
  {
    id: "bedtime-bear",
    name: "Bedtime Bear",
    japaneseName: "ベッドタイムベア",
    color: "#818cf8",
    secondaryColor: "#e0e7ff",
    quote: "Care-A-Lotの星空の下で、すやすや良い夢を…",
    description: "月と星のお腹マーク。おやすみタイムを守る癒やし系ベア。"
  },
  {
    id: "goodluck-bear",
    name: "Good Luck Bear",
    japaneseName: "グッドラックベア",
    color: "#4ade80",
    secondaryColor: "#dcfce7",
    quote: "四つ葉のクローバーが、あなたに幸運を呼び込むよ",
    description: "幸運のシンボル四つ葉のクローバー。身につけているとワクワクするラッキーが起きちゃうかも！"
  },
  {
    id: "tenderheart-bear",
    name: "Tenderheart Bear",
    japaneseName: "テンダーハートベア",
    color: "#fb923c",
    secondaryColor: "#ffedd5",
    quote: "思いやりの心があれば、世界はもっと優しくなれる",
    description: "真っ赤なハートのお腹マーク。ケアベアたちの温かいハートを持ったリーダー。"
  }
];

export const DEFAULT_CARE_BEAR_ITEMS = [
  {
    id: "cb-001",
    name: "【Wish Bear】Shooting Star パステルふわふわ BIGぬいぐるみ",
    price: 4980,
    category: "Plush Toys",
    bearId: "wish-bear",
    status: "available",
    code: "CB-WISH-01",
    color: "Pastel Blue",
    size: "高さ 35cm",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80",
    description: "Wish Bearの胸に輝く流れ星マークが可愛い、超極細パステルマイクロファイバーを使用した極上の抱き心地のぬいぐるみ。"
  },
  {
    id: "cb-002",
    name: "【Cheer Bear】ハッピーレインボー フーディパジャマ",
    price: 6800,
    category: "Apparel",
    bearId: "cheer-bear",
    status: "available",
    code: "CB-CHEER-02",
    color: "Rainbow Pink",
    size: "M / L",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    description: "胸元に大きな虹のシンボル、フードには立体的なお耳がついたあったかフリースルームウェア！"
  },
  {
    id: "cb-003",
    name: "【Share Bear】ドリーミーミルクセーキ パステルコスメポーチ",
    price: 2400,
    category: "Accessories",
    bearId: "share-bear",
    status: "available",
    code: "CB-SHARE-03",
    color: "Lavender Violet",
    size: "W18cm x H14cm x D6cm",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    description: "ラベンダーパープルのシェルデザインポーチ。お気に入りのコスメをまとめて収納できます。"
  },
  {
    id: "cb-004",
    name: "【Bedtime Bear】Goodnight Moon オーロラナイトランプ",
    price: 4200,
    category: "Home & Interior",
    bearId: "bedtime-bear",
    status: "available",
    code: "CB-BED-04",
    color: "Night Sky Blue",
    size: "15cm x 15cm x 20cm",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    description: "やわらかいオーロラカラーの光でお部屋を夢の世界へと変えるナイトプロジェクターランプ。"
  },
  {
    id: "cb-005",
    name: "【Funshine Bear】キラキラサンシャイン オーロラクリアトート",
    price: 3200,
    category: "Bags",
    bearId: "funshine-bear",
    status: "available",
    code: "CB-FUN-05",
    color: "Sunshine Yellow",
    size: "A4対応 (W34cm x H38cm)",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    description: "光の反射で7色に輝くPVCオーロラトート。通学やおでかけに主役級の可愛さ！"
  },
  {
    id: "cb-006",
    name: "【Grumpy Bear】Raincloud パステルグラデーションスウェット",
    price: 5900,
    category: "Apparel",
    bearId: "grumpy-bear",
    status: "available",
    code: "CB-GRUMP-06",
    color: "Sky Ice Blue",
    size: "Free Size (オーバーサイズ)",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    description: "Grumpy Bearの表情と雨雲ハート刺繍がドッキング！ゆるっと着られるルーズシルエットのスウェットです。"
  },
  {
    id: "cb-007",
    name: "【Good Luck Bear】四つ葉のクローバー ラッキーチャームキーホルダー",
    price: 1800,
    category: "Accessories",
    bearId: "goodluck-bear",
    status: "available",
    code: "CB-LUCK-07",
    color: "Mint Green",
    size: "全長 12cm",
    image: "https://images.unsplash.com/photo-1611591475777-233ca732222e?auto=format&fit=crop&w=800&q=80",
    description: "本物のぷっくりエポキシレジンで仕上げたクローバーチャーム。"
  },
  {
    id: "cb-008",
    name: "【Care Bears】Care-A-Lot 雲の上のドリーミーマグカップセット",
    price: 2980,
    category: "Home & Interior",
    bearId: "cheer-bear",
    status: "available",
    code: "CB-SET-08",
    color: "Pastel Rainbow",
    size: "容量 320ml (2個入り)",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    description: "取っ手がハート型になったグラデーションセラミックマグ。"
  },
  {
    id: "cb-009",
    name: "【Wish Bear】Wishcore 流れ星キラキラスノードーム",
    price: 4500,
    category: "Home & Interior",
    bearId: "wish-bear",
    status: "soldout",
    code: "CB-WISH-09",
    color: "Dreamy Blue",
    size: "直径 10cm x 高さ 14cm",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "振るとホログラムの星とピンクのラメがふわふわ舞い上がるスペシャルスノードーム。"
  }
];
