import type { PublishedOrder, SearchQuery } from "@/feature/order/types";

export const ContractorPositionMap = {
  PRIME_CONTRACTOR: "PRIME_CONTRACTOR", // 元請け
  FIRST_SUB_CONTRACTOR: "FIRST_SUB_CONTRACTOR", // 一次請け
  SECOND_SUB_CONTRACTOR: "SECOND_SUB_CONTRACTOR", // 二次請け
  THIRD_SUB_CONTRACTOR: "THIRD_SUB_CONTRACTOR", // 三次請け
} as const;

export type ContractorPosition =
  (typeof ContractorPositionMap)[keyof typeof ContractorPositionMap];

export const PaymentDateMap = {
  NEGOTIABLE: "NEGOTIABLE", // 要相談
  FIVE_DAY: "FIVE_DAY", // 5日
  TEN_DAY: "TEN_DAY", // 10日
  FIFTEEN_DAY: "FIFTEEN_DAY", // 15日
  TWENTY_DAY: "TWENTY_DAY", // 20日
  TWENTY_FIVE_DAY: "TWENTY_FIVE_DAY", // 25日
  END_OF_MONTH: "END_OF_MONTH", // 末日
} as const;

export type PaymentDate = (typeof PaymentDateMap)[keyof typeof PaymentDateMap];

export const PaymentDueMonthMap = {
  NEGOTIABLE: "NEGOTIABLE", // 要相談
  THIS_MONTH: "THIS_MONTH", // 当月払い
  NEXT_MONTH: "NEXT_MONTH", // 翌月払い
  AFTER_NEXT_MONTH: "AFTER_NEXT_MONTH", // 翌々月払い
} as const;

export type PaymentDueMonth =
  (typeof PaymentDueMonthMap)[keyof typeof PaymentDueMonthMap];

export type CreateOrderInput = {
  enterpriseId: string;
  title: string;
  prefectureId: string;
  city: string;
  propertyTypeId: string;
  constructionTypeId: string;
  description: string | undefined;
  laborBudget: number | undefined;
  estimateBudget: number | undefined;
  constructionStartDate: Date | undefined;
  constructionEndDate: Date | undefined;
  applicationStartDate: Date | undefined;
  applicationEndDate: Date | undefined;
  contractorPosition: ContractorPosition | undefined;
  paymentClosingDate: PaymentDate | undefined;
  paymentDueMonth: PaymentDueMonth | undefined;
  paymentDueDate: PaymentDate | undefined;
  canPayBeforeStart: boolean | undefined;
  workScope: string | undefined;
  requiredLicensesCertification: string | undefined;
  requiredInsuranceCoverage: string | undefined;
};

// TODO: 本実装後削除する
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// LATER: サーバ側で行う
export async function getPublishedOrders(query?: SearchQuery) {
  // TODO: Suspenseのテスト用。リリース前に消す
  await delay(1000);

  let filteredOrders = mockPublishedOrders;
  // LATER: 現状不必要だが、API側でnull含めるはずなのでハンドリング
  if (!filteredOrders?.length) {
    return undefined;
  }

  if (query?.prefectureId) {
    filteredOrders = filteredOrders.filter(
      (order) => order.prefectureId === query.prefectureId,
    );
  }

  if (query?.constructionTypeId) {
    filteredOrders = filteredOrders.filter(
      (order) => order.constructionTypeId === query.constructionTypeId,
    );
  }

  if (query?.keyword) {
    const keyword = query.keyword.toLowerCase();

    filteredOrders = filteredOrders.filter(
      (order) =>
        order.title.toLowerCase().includes(keyword) ||
        order.description?.toLowerCase().includes(keyword),
    );
  }

  return filteredOrders.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

export async function getPublishedOrder(id: string) {
  // TODO: Suspenseのテスト用。リリース前に消す
  await delay(1000);
  return mockPublishedOrders.find((o) => o.id === id);
}

export async function createOrder(input: CreateOrderInput) {
  // TODO: 本実装後削除する
  await delay(500);
  console.debug(input);
}

export async function getPublishedOrdersCount() {
  // TODO: 本実装後削除する
  await delay(200);

  return mockPublishedOrders.length;
}

// API連携するまでのモック
const mockPublishedOrders: PublishedOrder[] = [
  {
    id: "proj-1",
    enterpriseId: "1",
    title: "渋谷商業ビル新築工事",
    prefectureId: "東京都",
    city: "渋谷区",
    propertyTypeId: "commercial",
    constructionTypeId: "建築工事",
    laborBudget: 50000000,
    estimateBudget: 5000, // 10,000 JPY units
    workScope: "電気工事、管工事、内装工事の協力会社募集",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    description:
      "地上15階建ての商業ビル新築工事です。電気工事、管工事、内装工事の協力会社を募集しています。経験豊富な企業を希望します。",
    constructionStartDate: new Date("2024-04-01"),
    constructionEndDate: new Date("2025-03-31"),
    applicationStartDate: new Date("2024-01-10"),
    applicationEndDate: new Date("2024-03-15"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-2",
    enterpriseId: "1",
    title: "マンション外壁塗装工事",
    prefectureId: "神奈川県",
    city: "横浜市",
    propertyTypeId: "residential",
    constructionTypeId: "塗装工事",
    laborBudget: 15000000,
    estimateBudget: 1500,
    workScope: "外壁塗装および防水工事",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    description:
      "築20年のマンション（8階建て、80戸）の外壁塗装および防水工事を依頼します。",
    constructionStartDate: new Date("2024-05-01"),
    constructionEndDate: new Date("2024-08-31"),
    applicationStartDate: new Date("2024-01-15"),
    applicationEndDate: new Date("2024-04-15"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-3",
    enterpriseId: "6",
    title: "戸建て住宅新築工事（大工工事）",
    prefectureId: "埼玉県",
    city: "さいたま市",
    propertyTypeId: "residential",
    constructionTypeId: "大工工事",
    laborBudget: 8000000,
    estimateBudget: 800,
    workScope: "木造2階建て住宅の在来工法",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    description:
      "木造2階建て住宅の大工工事を依頼します。在来工法での施工をお願いします。",
    constructionStartDate: new Date("2024-03-15"),
    constructionEndDate: new Date("2024-07-31"),
    applicationStartDate: new Date("2024-01-20"),
    applicationEndDate: new Date("2024-03-01"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-4",
    enterpriseId: "6",
    title: "商業施設内装工事",
    prefectureId: "大阪府",
    city: "大阪市",
    propertyTypeId: "commercial",
    constructionTypeId: "内装仕上工事",
    laborBudget: 12000000,
    estimateBudget: 1200,
    workScope: "店舗デザインに基づく内装施工",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22"),
    description:
      "ショッピングモール内のテナント（300㎡）の内装工事です。店舗デザインに基づく施工をお願いします。",
    constructionStartDate: new Date("2024-04-01"),
    constructionEndDate: new Date("2024-05-31"),
    applicationStartDate: new Date("2024-01-22"),
    applicationEndDate: new Date("2024-03-10"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-5",
    enterpriseId: "1",
    title: "オフィスビル解体工事",
    prefectureId: "東京都",
    city: "港区",
    propertyTypeId: "commercial",
    constructionTypeId: "解体工事",
    laborBudget: 20000000,
    estimateBudget: 2000,
    workScope: "アスベスト除去含む解体",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    description:
      "地上5階建ての旧オフィスビルの解体工事です。アスベスト除去も含みます。",
    constructionStartDate: new Date("2024-06-01"),
    constructionEndDate: new Date("2024-09-30"),
    applicationStartDate: new Date("2024-01-25"),
    applicationEndDate: new Date("2024-04-20"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-6",
    enterpriseId: "6",
    title: "道路舗装工事",
    prefectureId: "千葉県",
    city: "千葉市",
    propertyTypeId: "civil",
    constructionTypeId: "舗装工事",
    laborBudget: 18000000,
    estimateBudget: 1800,
    workScope: "市道の舗装（延長500m、幅員6m）",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28"),
    description: "市道の舗装工事（延長500m、幅員6m）を依頼します。",
    constructionStartDate: new Date("2024-05-01"),
    constructionEndDate: new Date("2024-07-31"),
    applicationStartDate: new Date("2024-01-28"),
    applicationEndDate: new Date("2024-04-10"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-7",
    enterpriseId: "1",
    title: "工場屋根改修工事",
    prefectureId: "埼玉県",
    city: "川口市",
    propertyTypeId: "industrial",
    constructionTypeId: "屋根工事",
    laborBudget: 10000000,
    estimateBudget: 1000,
    workScope: "屋根葺き替え（2000㎡）",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    description: "工場建屋の屋根葺き替え工事（面積2000㎡）を依頼します。",
    constructionStartDate: new Date("2024-04-15"),
    constructionEndDate: new Date("2024-06-30"),
    applicationStartDate: new Date("2024-02-01"),
    applicationEndDate: new Date("2024-03-20"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
  {
    id: "proj-8",
    enterpriseId: "6",
    title: "マンション給排水設備改修工事",
    prefectureId: "東京都",
    city: "世田谷区",
    propertyTypeId: "residential",
    constructionTypeId: "管工事",
    laborBudget: 25000000,
    estimateBudget: 2500,
    workScope: "給排水管全面改修",
    requiredLicensesCertification: undefined,
    requiredInsuranceCoverage: undefined,
    createdAt: new Date("2024-02-03"),
    updatedAt: new Date("2024-02-03"),
    description: "築30年のマンション（12階建て）の給排水管全面改修工事です。",
    constructionStartDate: new Date("2024-07-01"),
    constructionEndDate: new Date("2024-12-31"),
    applicationStartDate: new Date("2024-02-03"),
    applicationEndDate: new Date("2024-05-01"),
    contractorPosition: "元請け",
    paymentClosingDate: "毎月末締め",
    paymentDueMonth: "翌月",
    paymentDueDate: "25日",
    canPayBeforeStart: false,
  },
];
