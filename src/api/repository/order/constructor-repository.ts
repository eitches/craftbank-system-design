import type { OrderConstructor, SearchQuery } from "@/feature/order/types";

// LATER: 実装確認後削除
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// LATER: API連携するまでのモック
export const fetchConstructionTypes = async () => {
  // TODO: Suspenseのテスト用。リリース前に消す
  await delay(1000);

  return [
    { id: "cm0abc123def456ghi789jkl", name: "土木工事" },
    { id: "cm0mno234pqr567stu890vwx", name: "建築工事" },
    { id: "cm0yza345bcd678efg901hij", name: "電気工事" },
    { id: "cm0klm456nop789qrs012tuv", name: "管工事" },
    { id: "cm0wxy567zab890cde123fgh", name: "鋼構造物工事" },
    { id: "cm0ijk678lmn901opq234rst", name: "舗装工事" },
    { id: "cm0uvw789xyz012abc345def", name: "内装仕上工事" },
    { id: "cm0ghi890jkl123mno456pqr", name: "防水工事" },
    { id: "cm0stu901vwx234yza567bcd", name: "左官工事" },
    { id: "cm0efg012hij345klm678nop", name: "塗装工事" },
    { id: "cm0qrs123tuv456wxy789zab", name: "大工工事" },
    { id: "cm0cde234fgh567ijk890lmn", name: "屋根工事" },
    { id: "cm0opq345rst678uvw901xyz", name: "解体工事" },
  ];
};

// LATER: API連携するまでのモック
export const fetchPropertyTypes = async () => {
  // TODO: Suspenseのテスト用。リリース前に消す
  await delay(1000);

  return [
    { id: "8cm34r1xbxaevkkyq3b42zws1", name: "一般住宅" },
    { id: "a88o11fmjkp6ly02icqcdzy87", name: "マンション" },
    { id: "aioehhed8r59dz3bfeev4988z", name: "戸建て住宅" },
  ];
};

// LATER: 現状動かないが、一旦仮実装。SQLで行う
export async function getConstructors(query: SearchQuery) {
  // TODO: Suspenseのテスト用。リリース前に消す
  await delay(1000);

  let filteredConstructors = [...mockConstructors];
  // LATER: 現状不必要だが、API側でnull含めるはずなのでハンドリング
  if (!filteredConstructors?.length) {
    return undefined;
  }

  if (query?.prefectureId) {
    filteredConstructors = filteredConstructors.filter(
      // LATER: ここ間違ってる
      (con) => con.companyPrefecture === query.prefectureId,
    );
  }

  if (query?.constructionTypeId) {
    filteredConstructors = filteredConstructors.filter((con) =>
      con.constructionTypes?.includes(query.constructionTypeId!),
    );
  }

  if (query?.keyword) {
    const keyword = query.keyword.toLowerCase();

    filteredConstructors = filteredConstructors.filter(
      (con) =>
        con.companyName.toLowerCase().includes(keyword) ||
        con.companyPrefecture.toLowerCase().includes(keyword) ||
        con.companyZipCode.toLowerCase().includes(keyword),
    );
  }

  return filteredConstructors;
}

export async function getConstructor(id: string) {
  // TODO: Suspenseのテスト用。リリース前に消す
  await delay(1000);
  return mockConstructors.find((con) => con.id === id);
}

const mockConstructors: OrderConstructor[] = [
  {
    id: "1",
    companyName: "山田建設株式会社",
    companyEmail: "info@yamada-kensetsu.co.jp",
    companyPhone: "03-1234-5678",
    companyPrefecture: "東京都",
    companyCity: "千代田区",
    companyAddress: "丸の内1-1-1",
    companyZipCode: "100-0005",
    companyEstablishedAt: new Date("1973-04-01"),
    companyAnnualRevenue: 12000000000,
    companyRepresentativeName: "山田 太郎",
    companyCapital: 50000000,
    companyUrl: "https://yamada-kensetsu.co.jp",
    availableAreas: ["東京都", "神奈川県", "千葉県", "埼玉県"],
    constructionTypes: ["建築工事", "土木工事"],
    propertyTypes: ["commercial", "residential"],
    workScope: "大規模修繕、RC造新築、商業施設改修",
    managersCount: 12,
    craftsmanCount: 40,
    insuranceCoverage: "損害賠償保険、労災保険",
    constructionBusinessLicenseName: "特定建設業 東京都知事許可(特-3)第12345号",
  },
  {
    id: "2",
    companyName: "鈴木電気工事",
    companyEmail: "contact@suzuki-denki.jp",
    companyPhone: "03-2345-6789",
    companyPrefecture: "東京都",
    companyCity: "渋谷区",
    companyAddress: "渋谷2-2-2",
    companyZipCode: "150-0002",
    companyEstablishedAt: new Date("1995-02-15"),
    companyAnnualRevenue: 2400000000,
    companyRepresentativeName: "鈴木 一郎",
    companyCapital: 10000000,
    companyUrl: undefined,
    availableAreas: ["東京都", "神奈川県"],
    constructionTypes: ["電気工事"],
    propertyTypes: ["office", "residential"],
    workScope: "高圧受電設備、弱電、LED更新",
    managersCount: 4,
    craftsmanCount: 15,
    insuranceCoverage: "損害賠償保険",
    constructionBusinessLicenseName: "一般建設業 東京都知事許可(般-2)第23456号",
  },
  {
    id: "3",
    companyName: "田中塗装工業",
    companyEmail: "hello@tanaka-coatings.jp",
    companyPhone: "03-3456-7890",
    companyPrefecture: "東京都",
    companyCity: "品川区",
    companyAddress: "大井4-4-4",
    companyZipCode: "140-0014",
    companyEstablishedAt: new Date("2001-06-01"),
    companyAnnualRevenue: 900000000,
    companyRepresentativeName: "田中 花子",
    companyCapital: 8000000,
    companyUrl: "https://tanaka-coatings.jp",
    availableAreas: ["東京都", "千葉県", "埼玉県"],
    constructionTypes: ["塗装工事", "防水工事"],
    propertyTypes: ["apartment"],
    workScope: "外壁塗装、屋上防水、シーリング更新",
    managersCount: 3,
    craftsmanCount: 18,
    insuranceCoverage: "損害賠償保険、労災保険",
    constructionBusinessLicenseName: "一般建設業 東京都知事許可(般-4)第34567号",
  },
  {
    id: "4",
    companyName: "渡辺建設工業株式会社",
    companyEmail: "contact@watanabe-con.jp",
    companyPhone: "06-1234-5678",
    companyPrefecture: "大阪府",
    companyCity: "大阪市 中央区",
    companyAddress: "南本町6-6-6",
    companyZipCode: "541-0054",
    companyEstablishedAt: new Date("1988-09-01"),
    companyAnnualRevenue: 5600000000,
    companyRepresentativeName: "渡辺 大介",
    companyCapital: 40000000,
    companyUrl: "https://watanabe-con.jp",
    availableAreas: ["大阪府", "兵庫県", "京都府"],
    constructionTypes: ["建築工事", "土木工事", "解体工事"],
    propertyTypes: ["commercial", "public"],
    workScope: "商業施設建築、解体、造成",
    managersCount: 10,
    craftsmanCount: 55,
    insuranceCoverage: "損害賠償保険、労災保険",
    constructionBusinessLicenseName: "特定建設業 大阪府知事許可(特-1)第45678号",
  },
];
