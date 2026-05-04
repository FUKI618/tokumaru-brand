/** 査定員紹介データ — E-E-A-T（Expertise + Authority）の人物軸 */
export interface Staff {
  initial: string;
  surname: string;
  surnameKana: string;
  role: string;
  specialty: string[];
  message: string;
  policy: string;
}

export const staff: Staff[] = [
  {
    initial: "K",
    surname: "小山",
    surnameKana: "Koyama",
    role: "時計・ジュエリー査定担当",
    specialty: ["ブランド時計", "ジュエリー", "貴金属"],
    message:
      "ロレックスやパテック・フィリップ、カルティエなど機械式時計はムーブメントの状態とリファレンスごとの市場相場を一点ずつ照合します。ジュエリーは石の種類・カラット・地金の純度を専用機材で計測し、感覚ではなく数値で価格を組み立てるのが私のスタイルです。",
    policy:
      "「適正な根拠のある価格を提示する」が信条です。査定額の内訳は必ずお客様にご説明し、納得いただいた上でお取引いただきます。",
  },
  {
    initial: "K",
    surname: "加藤",
    surnameKana: "Kato",
    role: "バッグ・アパレル査定担当",
    specialty: ["ブランドバッグ", "アパレル", "革小物"],
    message:
      "エルメス・シャネル・ヴィトンなどのバッグは、革の質感・金具のメッキ・縫製・付属品の有無を細かく拝見します。状態の良いお品はもちろん、使用感のあるバッグでも「この箇所は減点せず、ここを評価する」という積み上げで査定するため、他店で値が付かなかったお品でも査定金額が出ることが多いです。",
    policy:
      "「使われていた時間も含めて価値を見る」が信条です。長くご愛用いただいたお品ほど、丁寧に拝見させていただきます。",
  },
];
