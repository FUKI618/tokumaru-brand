/**
 * ビルド時自動更新用カレンダーヘルパー
 *
 * GitHub Actions の月次 cron でリビルドすると、各月の表記が自動的に切り替わる。
 * （cron 設定: .github/workflows/deploy.yml の schedule）
 */

const now = new Date();

export const currentYear = now.getFullYear();
export const currentMonth = now.getMonth() + 1; // 1-12
export const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

/** 例: "2026.5" — Hero バナー meta 表記 */
export const yearDotMonth = `${currentYear}.${currentMonth}`;

/** 例: "2026年5月" — フル日付ラベル */
export const yearMonthJP = `${currentYear}年${currentMonth}月`;

/** 例: "5月" — 月のみ */
export const monthJP = `${currentMonth}月`;

/** 例: "2026年5月1日〜31日" — 対象期間（1日〜末日） */
export const monthRangeJP = `${currentYear}年${currentMonth}月1日〜${lastDayOfMonth}日`;

/** 翌月（来月予告等で使用） */
export const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
export const nextMonthJP = `${nextMonth}月`;
