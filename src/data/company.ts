export const company = {
  name: "徳丸商会",
  phone: "052-990-3968",
  phoneTel: "0529903968",
  hours: "9:00〜21:00（年中無休）",
  hoursShort: "9-21時 年中無休",
  license: "古物商許可 第541042309800号",
  licenseAuthority: "愛知県公安委員会",
  line: "https://lin.ee/j4wK9IM",
  address: {
    postal: "〒453-0863",
    street: "愛知県名古屋市中村区横井2丁目71番地",
    locality: "名古屋市中村区",
    region: "愛知県",
    country: "JP",
    full: "〒453-0863 愛知県名古屋市中村区横井2丁目71番地",
  },
  areas: [
    "千種区","東区","北区","西区","中村区","中区","昭和区","瑞穂区",
    "熱田区","中川区","港区","南区","守山区","緑区","名東区","天白区",
  ],
  nearby: [
    "あま市","清須市","北名古屋市","津島市","愛西市","弥富市",
    "東海市","大府市","刈谷市","豊明市","知多市","常滑市",
    "豊田市","岡崎市","安城市","刈谷市","半田市","一宮市",
  ],
  // 既存LP（クロスリンク用）
  relatedLps: {
    estate: "https://fuki618.github.io/tokumaru-estate/",
  },
} as const;
