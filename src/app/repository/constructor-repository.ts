import { OrderConstructor, ConstructionType } from './types';

// Mock order constructor (企業) data
const mockConstructors: OrderConstructor[] = [
  {
    id: '1',
    companyName: '山田建設株式会社',
    companyEmail: 'info@yamada-kensetsu.co.jp',
    companyPhone: '03-1234-5678',
    companyPrefecture: '東京都',
    companyCity: '千代田区',
    companyAddress: '丸の内1-1-1',
    companyZipCode: '100-0005',
    companyEstablishedAt: new Date('1973-04-01'),
    companyAnnualRevenue: 12000000000,
    companyRepresentativeName: '山田 太郎',
    companyCapital: 50000000,
    companyUrl: 'https://yamada-kensetsu.co.jp',
    availableAreas: ['東京都', '神奈川県', '千葉県', '埼玉県'],
    constructionTypes: ['建築工事', '土木工事'],
    propertyTypes: ['commercial', 'residential'],
    workScope: '大規模修繕、RC造新築、商業施設改修',
    managersCount: 12,
    craftsmanCount: 40,
    insuranceCoverage: '損害賠償保険、労災保険',
    constructionBusinessLicenseName: '特定建設業 東京都知事許可(特-3)第12345号',
  },
  {
    id: '2',
    companyName: '鈴木電気工事',
    companyEmail: 'contact@suzuki-denki.jp',
    companyPhone: '03-2345-6789',
    companyPrefecture: '東京都',
    companyCity: '渋谷区',
    companyAddress: '渋谷2-2-2',
    companyZipCode: '150-0002',
    companyEstablishedAt: new Date('1995-02-15'),
    companyAnnualRevenue: 2400000000,
    companyRepresentativeName: '鈴木 一郎',
    companyCapital: 10000000,
    companyUrl: null,
    availableAreas: ['東京都', '神奈川県'],
    constructionTypes: ['電気工事'],
    propertyTypes: ['office', 'residential'],
    workScope: '高圧受電設備、弱電、LED更新',
    managersCount: 4,
    craftsmanCount: 15,
    insuranceCoverage: '損害賠償保険',
    constructionBusinessLicenseName: '一般建設業 東京都知事許可(般-2)第23456号',
  },
  {
    id: '3',
    companyName: '田中塗装工業',
    companyEmail: 'hello@tanaka-coatings.jp',
    companyPhone: '03-3456-7890',
    companyPrefecture: '東京都',
    companyCity: '品川区',
    companyAddress: '大井4-4-4',
    companyZipCode: '140-0014',
    companyEstablishedAt: new Date('2001-06-01'),
    companyAnnualRevenue: 900000000,
    companyRepresentativeName: '田中 花子',
    companyCapital: 8000000,
    companyUrl: 'https://tanaka-coatings.jp',
    availableAreas: ['東京都', '千葉県', '埼玉県'],
    constructionTypes: ['塗装工事', '防水工事'],
    propertyTypes: ['apartment'],
    workScope: '外壁塗装、屋上防水、シーリング更新',
    managersCount: 3,
    craftsmanCount: 18,
    insuranceCoverage: '損害賠償保険、労災保険',
    constructionBusinessLicenseName: '一般建設業 東京都知事許可(般-4)第34567号',
  },
  {
    id: '4',
    companyName: '渡辺建設工業株式会社',
    companyEmail: 'contact@watanabe-con.jp',
    companyPhone: '06-1234-5678',
    companyPrefecture: '大阪府',
    companyCity: '大阪市 中央区',
    companyAddress: '南本町6-6-6',
    companyZipCode: '541-0054',
    companyEstablishedAt: new Date('1988-09-01'),
    companyAnnualRevenue: 5600000000,
    companyRepresentativeName: '渡辺 大介',
    companyCapital: 40000000,
    companyUrl: 'https://watanabe-con.jp',
    availableAreas: ['大阪府', '兵庫県', '京都府'],
    constructionTypes: ['建築工事', '土木工事', '解体工事'],
    propertyTypes: ['commercial', 'public'],
    workScope: '商業施設建築、解体、造成',
    managersCount: 10,
    craftsmanCount: 55,
    insuranceCoverage: '損害賠償保険、労災保険',
    constructionBusinessLicenseName: '特定建設業 大阪府知事許可(特-1)第45678号',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getConstructors(filters: {
  keyword?: string;
  prefecture?: string;
  constructionTypes?: string[];
}) {
  await delay(300);

  let filtered = [...mockConstructors];

  if (filters?.prefecture) {
    filtered = filtered.filter(u => u.companyPrefecture === filters.prefecture);
  }

  if (filters?.constructionTypes && filters.constructionTypes.length > 0) {
    filtered = filtered.filter(u =>
      (u.constructionTypes ?? []).some(ct => filters.constructionTypes?.includes(ct as ConstructionType))
    );
  }

  if (filters?.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filtered = filtered.filter(u =>
      u.companyName.toLowerCase().includes(keyword) ||
      (u.workScope ?? '').toLowerCase().includes(keyword) ||
      (u.companyRepresentativeName ?? '').toLowerCase().includes(keyword)
    );
  }

  return filtered;
}

export async function getConstructorById(id: string) {
  await delay(200);
  return mockConstructors.find(u => u.id === id) || null;
}

export async function getConstructorStats() {
  await delay(200);

  const totalCompanies = mockConstructors.length;
  const totalCraftsmen = mockConstructors.reduce((sum, c) => sum + (c.craftsmanCount ?? 0), 0);

  return {
    totalCompanies,
    totalCraftsmen,
    contractors: totalCompanies,
    subcontractors: 0,
    craftsmen: totalCraftsmen,
  };
}

// Create new constructor (mock)
export async function createConstructor(input: {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyPrefecture: string;
  companyCity: string;
  companyAddress?: string | null;
  companyZipCode?: string | null;
  companyEstablishedAt?: Date | null;
  companyAnnualRevenue?: number | null;
  companyRepresentativeName?: string | null;
  companyCapital?: number | null;
  companyUrl?: string | null;
  availableAreas?: string[] | null;
  constructionTypes: string[];
  propertyTypes?: string[] | null;
  workScope?: string | null;
  managersCount?: number | null;
  craftsmanCount?: number | null;
  insuranceCoverage?: string | null;
  constructionBusinessLicenseName?: string | null;
}) {
  await delay(300);
  const newItem: OrderConstructor = {
    id: String(Date.now()),
    companyName: input.companyName,
    companyEmail: input.companyEmail,
    companyPhone: input.companyPhone,
    companyPrefecture: input.companyPrefecture,
    companyCity: input.companyCity,
    companyAddress: input.companyAddress ?? '',
    companyZipCode: input.companyZipCode ?? '',
    companyEstablishedAt: input.companyEstablishedAt ?? null,
    companyAnnualRevenue: input.companyAnnualRevenue ?? null,
    companyRepresentativeName: input.companyRepresentativeName ?? null,
    companyCapital: input.companyCapital ?? null,
    companyUrl: input.companyUrl ?? null,
    availableAreas: input.availableAreas ?? null,
    constructionTypes: input.constructionTypes as ConstructionType[],
    propertyTypes: input.propertyTypes ?? null,
    workScope: input.workScope ?? '',
    managersCount: input.managersCount ?? null,
    craftsmanCount: input.craftsmanCount ?? null,
    insuranceCoverage: input.insuranceCoverage ?? null,
    constructionBusinessLicenseName: input.constructionBusinessLicenseName ?? null,
  };

  mockConstructors.unshift(newItem);
  return newItem;
}