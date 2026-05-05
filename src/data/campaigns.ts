/**
 * キャンペーン施策データ（3軸常設）
 *
 * - ブランド別買取UP（期間限定）
 * - LINE登録特典（CRM構築）
 * - ご紹介キャンペーン（口コミ流入）
 *
 * 規約: 虚偽数値の使用禁止。すべて事業者として実施可能な範囲の記述に留め、
 *       条件・期間はユーザー側で運用調整しやすい構造とする。
 *
 * 月次自動更新: ./calendar.ts の値を参照。GitHub Actions の月次cron で
 *               リビルドすると当月の表記が自動的に切り替わる。
 */

import { monthJP, monthRangeJP } from "../lib/calendar";

export interface Campaign {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaTarget: "phone" | "line" | "form";
  period?: string;
  note: string;
}

export const campaigns: Campaign[] = [
  {
    id: "brand-up",
    badge: "期間限定",
    title: "ブランド別 買取UP",
    subtitle: "対象ブランドを通常買取額より UP",
    description:
      `${monthJP}のご来店・出張・宅配買取を対象に、エルメス・シャネル・ロレックスをはじめとした主要ブランドの買取額を通常より引き上げてお見積もりします。お持ち込みのタイミングがお決まりでしたら、ぜひご利用ください。`,
    bullets: [
      `対象期間：${monthRangeJP}`,
      "対象：エルメス／シャネル／ロレックス（バッグ・時計・ジュエリー）",
      "通常の買取額より +5%〜10% を上限に上乗せ",
      "他キャンペーンとの併用は1点につき1つまで",
    ],
    ctaLabel: "対象ブランドで査定を依頼する",
    ctaTarget: "form",
    period: monthRangeJP,
    note: "在庫状況・市況により対象ブランド・上乗せ率は予告なく変更となる場合があります。",
  },
  {
    id: "line-bonus",
    badge: "常設特典",
    title: "公式LINEご登録 で +3%",
    subtitle: "友だち追加した方限定の買取額アップ",
    description:
      "徳丸商会の公式LINEを友だち追加していただいたお客様に、買取額の +3% UP を常設の特典としてご用意しています。LINE上で写真と型番を送るだけで、最短15分の参考査定もご利用いただけます。",
    bullets: [
      "公式LINE友だち追加（無料）",
      "買取契約時に「LINE特典」とお伝えください",
      "買取額に +3% を上乗せ（査定額10万円以上から適用）",
      "LINE査定の事前見積もりも併せてご利用可",
    ],
    ctaLabel: "公式LINEを友だち追加する",
    ctaTarget: "line",
    note: "LINE特典の併用条件は、店頭・出張・宅配いずれの買取方法でも同条件で適用されます。",
  },
  {
    id: "referral",
    badge: "ご紹介",
    title: "ご紹介キャンペーン",
    subtitle: "ご紹介者・紹介された方の双方に特典",
    description:
      "ご親族・ご友人など、徳丸商会を初めてご利用される方をご紹介いただいたお客様には、QUOカードを進呈します。ご紹介された方も同額のQUOカードを買取契約時にお受け取りいただけます。",
    bullets: [
      "ご紹介者：5,000円分のQUOカード",
      "紹介された方：5,000円分のQUOカード（買取成立後）",
      "ご紹介の人数に上限はありません（1ご紹介に1セット）",
      "お電話・LINE・フォームのいずれでも「○○様のご紹介」とお伝えください",
    ],
    ctaLabel: "ご紹介でのお問い合わせ",
    ctaTarget: "form",
    note: "ご紹介された方が買取成立に至らなかった場合、QUOカードは発送されません。",
  },
];
