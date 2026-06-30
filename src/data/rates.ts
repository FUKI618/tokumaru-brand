/**
 * ブランド別買取相場データ（事実ベース）
 *
 * 出典: competitor-reports/2026-05-04_brand_buyback/_research-rates-speed-comparison.md
 * - 各モデル 3社以上のクロスチェック済み（出典数 4〜5社）
 * - 「最低相場」=中古B〜AB状態・付属品なしや使用感ありを含む最低帯
 * - 「中央値」  =出現データの中位帯（範囲表記）
 * - 「最高相場」=新品・未使用品・人気色・付属品完備のプレミアム上限
 * - 推論禁止ルール準拠：個別の単一推定値は出さず、レンジ表記
 */

export interface RateModel {
  brand: string;
  brandJp: string;
  model: string;
  variant?: string;
  category: "bag" | "watch" | "jewelry";
  min: number;
  midLabel: string; // 例: "¥2,500,000 〜 ¥2,800,000"
  max: number;
  sources: number;
  note?: string;
}

export const rateData: RateModel[] = [
  // バッグ
  {
    brand: "HERMES",
    brandJp: "エルメス",
    model: "バーキン25",
    variant: "トゴ ブラック",
    category: "bag",
    min: 1_136_200,
    midLabel: "¥1,136,200 〜 ¥2,800,000",
    max: 3_900_000,
    sources: 5,
  },
  {
    brand: "HERMES",
    brandJp: "エルメス",
    model: "ケリー28",
    variant: "ブラック ゴールド金具",
    category: "bag",
    min: 1_914_000,
    midLabel: "¥2,400,000 〜 ¥2,800,000",
    max: 3_454_000,
    sources: 5,
  },
  {
    brand: "HERMES",
    brandJp: "エルメス",
    model: "ピコタンPM",
    variant: "トリヨン",
    category: "bag",
    min: 103_992,
    midLabel: "¥103,992 〜 ¥518,375",
    max: 735_000,
    sources: 5,
    note: "人気色（タッチ等）は上限超え",
  },
  {
    brand: "CHANEL",
    brandJp: "シャネル",
    model: "マトラッセ ラージ",
    variant: "デカマトラッセ30",
    category: "bag",
    min: 430_000,
    midLabel: "¥550,000 〜 ¥600,000",
    max: 914_900,
    sources: 4,
  },
  {
    brand: "CHANEL",
    brandJp: "シャネル",
    model: "ミニマトラッセ",
    variant: "16〜20cm",
    category: "bag",
    min: 221_000,
    midLabel: "¥280,000 〜 ¥355,000",
    max: 604_000,
    sources: 5,
  },
  {
    brand: "LOUIS VUITTON",
    brandJp: "ルイ・ヴィトン",
    model: "ネヴァーフルMM",
    variant: "ダミエ",
    category: "bag",
    min: 59_500,
    midLabel: "¥90,000 〜 ¥125,000",
    max: 260_700,
    sources: 5,
    note: "色違い（スリーズ等）で上限変動",
  },
  {
    brand: "LOUIS VUITTON",
    brandJp: "ルイ・ヴィトン",
    model: "オンザゴーPM",
    variant: "モノグラム",
    category: "bag",
    min: 180_000,
    midLabel: "¥250,000 〜 ¥300,000",
    max: 335_000,
    sources: 5,
    note: "アンプラント・バイカラーは上限",
  },

  // 時計
  {
    brand: "ROLEX",
    brandJp: "ロレックス",
    model: "デイトナ",
    variant: "116500LN ホワイト",
    category: "watch",
    min: 3_300_000,
    midLabel: "¥4,100,000 〜 ¥4,700,000",
    max: 5_400_000,
    sources: 4,
    note: "2025年6月→2026年3月で約+64%上昇",
  },
  {
    brand: "ROLEX",
    brandJp: "ロレックス",
    model: "サブマリーナー",
    variant: "124060",
    category: "watch",
    min: 1_480_000,
    midLabel: "¥1,700,000 〜 ¥1,900,000",
    max: 2_190_000,
    sources: 5,
    note: "直近1年で約+48%上昇",
  },

  // ジュエリー
  {
    brand: "Cartier",
    brandJp: "カルティエ",
    model: "ラブリング",
    variant: "K18WG (1色)",
    category: "jewelry",
    min: 40_000,
    midLabel: "¥46,750 〜 ¥186,340",
    max: 196_020,
    sources: 5,
    note: "刻印・地金重量で変動",
  },
  {
    brand: "VAN CLEEF & ARPELS",
    brandJp: "ヴァンクリーフ＆アーペル",
    model: "ヴィンテージアルハンブラ",
    variant: "ペンダント YG",
    category: "jewelry",
    min: 242_000,
    midLabel: "¥250,000 〜 ¥341,332",
    max: 548_400,
    sources: 5,
    note: "カーネリアン・状態Aで上限",
  },
  {
    brand: "TIFFANY",
    brandJp: "ティファニー",
    model: "ソリティア",
    variant: "ダイヤ Pt950 0.20〜0.26ct",
    category: "jewelry",
    min: 40_800,
    midLabel: "¥45,500 〜 ¥51,000",
    max: 56_000,
    sources: 4,
  },
];

// セクション情報
import { yearMonthJP, currentYear, currentMonth } from "../lib/calendar";

// 集計期間: 「12ヶ月前 〜 先月」を自動算出
const periodStart = new Date(currentYear, currentMonth - 13, 1);
const periodEnd = new Date(currentYear, currentMonth - 1, 1);
const collectionPeriod = `${periodStart.getFullYear()}年${periodStart.getMonth() + 1}月 〜 ${periodEnd.getFullYear()}年${periodEnd.getMonth() + 1}月`;

export const rateMetadata = {
  collectionPeriod,
  updatedAt: yearMonthJP,
  sourceCount: "12モデル × 3社以上クロスチェック",
  disclaimer: "相場は店舗の在庫状況・状態・付属品・色・刻印年・市況・為替で大きく変動します。掲載値はあくまで業界の参考レンジであり、実際の買取金額を保証するものではありません。",
};

/** 4チャネル比較データ（業界初の自社内比較表） */
export interface Channel {
  id: string;
  name: string;
  nameEn: string;
  speed: string;
  hours: string;
  area: string;
  effort: string;
  recommended: string;
  payment: string;
  cooling: string;
}

export const channelData: Channel[] = [
  {
    id: "visit",
    name: "出張買取",
    nameEn: "VISIT",
    speed: "最短当日訪問",
    hours: "9:00〜21:00 年中無休",
    area: "名古屋市16区＋尾張・知多・西三河",
    effort: "ご自宅で待つだけ",
    recommended: "大量・高額・梱包したくない方",
    payment: "現金即払い",
    cooling: "8日間クーリングオフ対応",
  },
  {
    id: "line",
    name: "LINE査定",
    nameEn: "LINE",
    speed: "最短15分で参考額",
    hours: "24時間受付・営業時間内に返信",
    area: "全国",
    effort: "写真と型番を送るだけ",
    recommended: "事前見積り・売却検討中",
    payment: "出張または宅配で実支払",
    cooling: "実買取契約時に準ずる",
  },
  {
    id: "mail",
    name: "宅配買取",
    nameEn: "MAIL",
    speed: "最短当日振込",
    hours: "宅配キット24時間受付",
    area: "全国（離島除く）",
    effort: "詰めて送るだけ",
    recommended: "遠方・高額品・非対面希望",
    payment: "銀行振込（最大5,000万円運送保険）",
    cooling: "発送後の返送無料",
  },
];

/** 速度差別化データ */
export interface SpeedItem {
  metric: string;
  value: string;
  unit: string;
  context: string;
  industry: string;
}

export const speedData: SpeedItem[] = [
  {
    metric: "LINE査定の参考買取額",
    value: "15",
    unit: "分",
    context: "最短",
    industry: "業界h2/h3 採用 0%",
  },
  {
    metric: "営業時間",
    value: "12",
    unit: "時間",
    context: "9-21時",
    industry: "業界平均より3時間長い",
  },
  {
    metric: "年中無休営業",
    value: "365",
    unit: "日",
    context: "年間",
    industry: "12時間×無休は業界唯一",
  },
];
