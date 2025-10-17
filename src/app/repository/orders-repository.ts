import { Order, Prefecture, ConstructionType, SearchFilters, OrderPostingStatus } from './types';
import type { ContractorPosition, PaymentClosingDate, PaymentDueMonth, PaymentDueDate } from './constants';

// Define input type for creating an order (no Zod)
export type CreateOrderInput = {
  enterpriseId: string;
  title: string;
  prefectureId: string;
  city: string;
  propertyTypeId: string;
  constructionTypeId: string;
  description: string | null;
  laborBudget: number | null;
  estimateBudget: number | null;
  constructionStartDate: Date | null;
  constructionEndDate: Date | null;
  applicationStartDate: Date | null;
  applicationEndDate: Date | null;
  contractorPosition: ContractorPosition | null;
  paymentClosingDate: PaymentClosingDate | null;
  paymentDueMonth: PaymentDueMonth | null;
  paymentDueDate: PaymentDueDate | null;
  canPayBeforeStart: boolean | null;
  workScope: string | null;
  requiredLicensesCertification: string | null;
  requiredInsuranceCoverage: string | null;
};

// Mock order data converted from previous project mocks
const mockOrders: Order[] = [
  {
    id: 'proj-1',
    enterpriseId: '1',
    status: 'open',
    title: '渋谷商業ビル新築工事',
    prefectureId: '東京都',
    city: '渋谷区',
    propertyTypeId: 'commercial',
    constructionTypeId: '建築工事',
    laborBudget: 50000000,
    estimateBudget: 5000, // 10,000 JPY units
    workScope: '電気工事、管工事、内装工事の協力会社募集',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    description: '地上15階建ての商業ビル新築工事です。電気工事、管工事、内装工事の協力会社を募集しています。経験豊富な企業を希望します。',
    constructionStartDate: new Date('2024-04-01'),
    constructionEndDate: new Date('2025-03-31'),
    applicationStartDate: new Date('2024-01-10'),
    applicationEndDate: new Date('2024-03-15'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-2',
    enterpriseId: '1',
    status: 'open',
    title: 'マンション外壁塗装工事',
    prefectureId: '神奈川県',
    city: '横浜市',
    propertyTypeId: 'residential',
    constructionTypeId: '塗装工事',
    laborBudget: 15000000,
    estimateBudget: 1500,
    workScope: '外壁塗装および防水工事',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    description: '築20年のマンション（8階建て、80戸）の外壁塗装および防水工事を依頼します。',
    constructionStartDate: new Date('2024-05-01'),
    constructionEndDate: new Date('2024-08-31'),
    applicationStartDate: new Date('2024-01-15'),
    applicationEndDate: new Date('2024-04-15'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-3',
    enterpriseId: '6',
    status: 'open',
    title: '戸建て住宅新築工事（大工工事）',
    prefectureId: '埼玉県',
    city: 'さいたま市',
    propertyTypeId: 'residential',
    constructionTypeId: '大工工事',
    laborBudget: 8000000,
    estimateBudget: 800,
    workScope: '木造2階建て住宅の在来工法',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    description: '木造2階建て住宅の大工工事を依頼します。在来工法での施工をお願いします。',
    constructionStartDate: new Date('2024-03-15'),
    constructionEndDate: new Date('2024-07-31'),
    applicationStartDate: new Date('2024-01-20'),
    applicationEndDate: new Date('2024-03-01'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-4',
    enterpriseId: '6',
    status: 'open',
    title: '商業施設内装工事',
    prefectureId: '大阪府',
    city: '大阪市',
    propertyTypeId: 'commercial',
    constructionTypeId: '内装仕上工事',
    laborBudget: 12000000,
    estimateBudget: 1200,
    workScope: '店舗デザインに基づく内装施工',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    description: 'ショッピングモール内のテナント（300㎡）の内装工事です。店舗デザインに基づく施工をお願いします。',
    constructionStartDate: new Date('2024-04-01'),
    constructionEndDate: new Date('2024-05-31'),
    applicationStartDate: new Date('2024-01-22'),
    applicationEndDate: new Date('2024-03-10'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-5',
    enterpriseId: '1',
    status: 'open',
    title: 'オフィスビル解体工事',
    prefectureId: '東京都',
    city: '港区',
    propertyTypeId: 'commercial',
    constructionTypeId: '解体工事',
    laborBudget: 20000000,
    estimateBudget: 2000,
    workScope: 'アスベスト除去含む解体',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    description: '地上5階建ての旧オフィスビルの解体工事です。アスベスト除去も含みます。',
    constructionStartDate: new Date('2024-06-01'),
    constructionEndDate: new Date('2024-09-30'),
    applicationStartDate: new Date('2024-01-25'),
    applicationEndDate: new Date('2024-04-20'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-6',
    enterpriseId: '6',
    status: 'open',
    title: '道路舗装工事',
    prefectureId: '千葉県',
    city: '千葉市',
    propertyTypeId: 'civil',
    constructionTypeId: '舗装工事',
    laborBudget: 18000000,
    estimateBudget: 1800,
    workScope: '市道の舗装（延長500m、幅員6m）',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28'),
    description: '市道の舗装工事（延長500m、幅員6m）を依頼します。',
    constructionStartDate: new Date('2024-05-01'),
    constructionEndDate: new Date('2024-07-31'),
    applicationStartDate: new Date('2024-01-28'),
    applicationEndDate: new Date('2024-04-10'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-7',
    enterpriseId: '1',
    status: 'open',
    title: '工場屋根改修工事',
    prefectureId: '埼玉県',
    city: '川口市',
    propertyTypeId: 'industrial',
    constructionTypeId: '屋根工事',
    laborBudget: 10000000,
    estimateBudget: 1000,
    workScope: '屋根葺き替え（2000㎡）',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    description: '工場建屋の屋根葺き替え工事（面積2000㎡）を依頼します。',
    constructionStartDate: new Date('2024-04-15'),
    constructionEndDate: new Date('2024-06-30'),
    applicationStartDate: new Date('2024-02-01'),
    applicationEndDate: new Date('2024-03-20'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
  {
    id: 'proj-8',
    enterpriseId: '6',
    status: 'open',
    title: 'マンション給排水設備改修工事',
    prefectureId: '東京都',
    city: '世田谷区',
    propertyTypeId: 'residential',
    constructionTypeId: '管工事',
    laborBudget: 25000000,
    estimateBudget: 2500,
    workScope: '給排水管全面改修',
    requiredLicensesCertification: null,
    requiredInsuranceCoverage: null,
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03'),
    description: '築30年のマンション（12階建て）の給排水管全面改修工事です。',
    constructionStartDate: new Date('2024-07-01'),
    constructionEndDate: new Date('2024-12-31'),
    applicationStartDate: new Date('2024-02-03'),
    applicationEndDate: new Date('2024-05-01'),
    contractorPosition: '元請け',
    paymentClosingDate: '毎月末締め',
    paymentDueMonth: '翌月',
    paymentDueDate: '25日',
    canPayBeforeStart: false,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getOrders(filters?: SearchFilters): Promise<Order[]> {
  await delay(300);

  let filtered = [...mockOrders];

  if (filters?.prefecture) {
    filtered = filtered.filter(o => o.prefectureId === filters.prefecture);
  }

  if (filters?.constructionTypes && filters.constructionTypes.length > 0) {
    filtered = filtered.filter(o => filters.constructionTypes!.includes(o.constructionTypeId as any));
  }

  if (filters?.budgetMin) {
    filtered = filtered.filter(o => (o.laborBudget ?? 0) >= filters.budgetMin!);
  }

  if (filters?.budgetMax) {
    filtered = filtered.filter(o => (o.laborBudget ?? Number.MAX_SAFE_INTEGER) <= filters.budgetMax!);
  }

  if (filters?.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filtered = filtered.filter(o =>
      o.title.toLowerCase().includes(keyword) ||
      o.description.toLowerCase().includes(keyword)
    );
  }

  return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  await delay(200);
  return mockOrders.find(o => o.id === id) || null;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  await delay(500);

  const now = new Date();
  const newOrder: Order = {
    id: `order-${Date.now()}`,
    enterpriseId: input.enterpriseId,
    status: 'open',
    title: input.title,
    prefectureId: input.prefectureId,
    city: input.city,
    propertyTypeId: input.propertyTypeId,
    constructionTypeId: input.constructionTypeId as any,
    description: input.description ?? '',
    laborBudget: input.laborBudget,
    estimateBudget: input.estimateBudget,
    constructionStartDate: input.constructionStartDate ?? now,
    constructionEndDate: input.constructionEndDate ?? now,
    applicationStartDate: input.applicationStartDate ?? now,
    applicationEndDate: input.applicationEndDate ?? now,
    contractorPosition: input.contractorPosition ?? 'PRIME_CONTRACTOR',
    paymentClosingDate: input.paymentClosingDate ?? 'NEGOTIABLE',
    paymentDueMonth: input.paymentDueMonth ?? 'NEGOTIABLE',
    paymentDueDate: input.paymentDueDate ?? 'NEGOTIABLE',
    canPayBeforeStart: input.canPayBeforeStart ?? false,
    workScope: input.workScope,
    requiredLicensesCertification: input.requiredLicensesCertification,
    requiredInsuranceCoverage: input.requiredInsuranceCoverage,
    createdAt: now,
    updatedAt: now,
  };

  mockOrders.push(newOrder);
  return newOrder;
}

export async function getOrdersCount() {
  await delay(200);
  const byStatus = (s: OrderPostingStatus) => mockOrders.filter(o => o.status === s).length;
  return {
    totalOrders: mockOrders.length,
    openOrders: byStatus('open' as OrderPostingStatus),
  };
}