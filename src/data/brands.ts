/** 主要ブランド：h2セクションで個別に語る5ブランド + サブ訴求8ブランド */
export interface Brand {
  name: string;
  jpName: string;
  slug: string;
  category: "bag" | "watch" | "jewelry";
  popularModels: string[];
  example?: string; // 買取参考価格例
}

/** 業界9社が必出する5強ブランド + 自社訴求7社 */
export const flagshipBrands: Brand[] = [
  {
    name: "HERMES",
    jpName: "エルメス",
    slug: "hermes",
    category: "bag",
    popularModels: ["バーキン25", "バーキン30", "ケリー25", "ケリー28", "ピコタンロック", "エブリン", "ガーデンパーティ", "リンディ"],
    example: "バーキン25 〜2,800,000円｜ケリー28 〜2,800,000円｜ピコタンPM 〜600,000円",
  },
  {
    name: "CHANEL",
    jpName: "シャネル",
    slug: "chanel",
    category: "bag",
    popularModels: ["マトラッセ", "ミニマトラッセ", "ボーイシャネル", "クラシックハンドバッグ", "ココハンドル", "シャネル19"],
    example: "マトラッセ ラージ 〜350,000円｜ミニマトラッセ 〜400,000円",
  },
  {
    name: "LOUIS VUITTON",
    jpName: "ルイ・ヴィトン",
    slug: "louis-vuitton",
    category: "bag",
    popularModels: ["ネヴァーフル", "オンザゴー", "スピーディ", "アルマ", "カプシーヌ", "モノグラム ジッピーウォレット"],
    example: "ネヴァーフルMM 〜120,000円｜オンザゴーPM 〜380,000円｜カプシーヌ 〜700,000円",
  },
  {
    name: "ROLEX",
    jpName: "ロレックス",
    slug: "rolex",
    category: "watch",
    popularModels: ["デイトナ", "サブマリーナ", "GMTマスターII", "エクスプローラー", "デイトジャスト", "ヨットマスター"],
    example: "デイトナ 〜5,500,000円｜サブマリーナ 〜2,500,000円｜デイトジャスト 〜900,000円",
  },
  {
    name: "Cartier",
    jpName: "カルティエ",
    slug: "cartier",
    category: "watch",
    popularModels: ["タンク", "サントス", "バロンブルー", "ラブリング", "トリニティ", "ジュストアンクル"],
    example: "サントス 〜800,000円｜ラブリング 〜200,000円",
  },
] as const;

/** サブ訴求ブランド（h3で並列） */
export const popularBrands: { name: string; jpName: string; category: "bag" | "watch" | "jewelry" | "apparel" }[] = [
  { name: "GUCCI", jpName: "グッチ", category: "bag" },
  { name: "PRADA", jpName: "プラダ", category: "bag" },
  { name: "BOTTEGA VENETA", jpName: "ボッテガ・ヴェネタ", category: "bag" },
  { name: "CELINE", jpName: "セリーヌ", category: "bag" },
  { name: "FENDI", jpName: "フェンディ", category: "bag" },
  { name: "DIOR", jpName: "ディオール", category: "bag" },
  { name: "LOEWE", jpName: "ロエベ", category: "bag" },
  { name: "GOYARD", jpName: "ゴヤール", category: "bag" },
  { name: "OMEGA", jpName: "オメガ", category: "watch" },
  { name: "PATEK PHILIPPE", jpName: "パテック・フィリップ", category: "watch" },
  { name: "AUDEMARS PIGUET", jpName: "オーデマピゲ", category: "watch" },
  { name: "IWC", jpName: "IWC", category: "watch" },
  { name: "BREITLING", jpName: "ブライトリング", category: "watch" },
  { name: "TUDOR", jpName: "チューダー", category: "watch" },
  { name: "FRANCK MULLER", jpName: "フランクミュラー", category: "watch" },
  { name: "TAG HEUER", jpName: "タグホイヤー", category: "watch" },
  { name: "TIFFANY", jpName: "ティファニー", category: "jewelry" },
  { name: "BVLGARI", jpName: "ブルガリ", category: "jewelry" },
  { name: "VAN CLEEF & ARPELS", jpName: "ヴァンクリーフ＆アーペル", category: "jewelry" },
  { name: "HARRY WINSTON", jpName: "ハリー・ウィンストン", category: "jewelry" },
  { name: "CHAUMET", jpName: "ショーメ", category: "jewelry" },
  { name: "PIAGET", jpName: "ピアジェ", category: "jewelry" },
  { name: "BURBERRY", jpName: "バーバリー", category: "apparel" },
  { name: "MONCLER", jpName: "モンクレール", category: "apparel" },
  { name: "BALENCIAGA", jpName: "バレンシアガ", category: "apparel" },
  { name: "MIU MIU", jpName: "ミュウミュウ", category: "apparel" },
];

/** 競合データ収集の結果、自社の最低買取保証額（5ブランド） */
export interface BuybackGuarantee {
  brand: string;
  jpName: string;
  product: string;
  minPrice: number;
  note: string;
}

export const buybackGuarantees: BuybackGuarantee[] = [
  {
    brand: "LOUIS VUITTON",
    jpName: "ルイ・ヴィトン",
    product: "バッグ全般",
    minPrice: 5000,
    note: "状態問わず最低買取保証。ジャンク品の一部除く",
  },
  {
    brand: "CHANEL",
    jpName: "シャネル",
    product: "マトラッセ レザー",
    minPrice: 50000,
    note: "ショルダーバッグ。状態問わず最低買取保証",
  },
  {
    brand: "HERMES",
    jpName: "エルメス",
    product: "バッグ全般（バーキン・ケリー・ピコタン等）",
    minPrice: 100000,
    note: "正規品確認後、状態問わず最低買取保証",
  },
  {
    brand: "ROLEX",
    jpName: "ロレックス",
    product: "メンズ自動巻時計",
    minPrice: 50000,
    note: "手巻き式・レディースモデルは個別査定",
  },
  {
    brand: "Cartier",
    jpName: "カルティエ",
    product: "ラブリング・トリニティ等",
    minPrice: 30000,
    note: "K18・Pt950等の地金保証ベース",
  },
];
