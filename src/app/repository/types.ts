// Data types for CraftBank platform

export type ConstructionType = 
  | '土木工事'
  | '建築工事'
  | '電気工事'
  | '管工事'
  | '鋼構造物工事'
  | '舗装工事'
  | '内装仕上工事'
  | '防水工事'
  | '左官工事'
  | '塗装工事'
  | '大工工事'
  | '屋根工事'
  | '解体工事';

export type Prefecture = 
  | '北海道' | '青森県' | '岩手県' | '宮城県' | '秋田県' | '山形県' | '福島県'
  | '茨城県' | '栃木県' | '群馬県' | '埼玉県' | '千葉県' | '東京都' | '神奈川県'
  | '新潟県' | '富山県' | '石川県' | '福井県' | '山梨県' | '長野県'
  | '岐阜県' | '静岡県' | '愛知県' | '三重県'
  | '滋賀県' | '京都府' | '大阪府' | '兵庫県' | '奈良県' | '和歌山県'
  | '鳥取県' | '島根県' | '岡山県' | '広島県' | '山口県'
  | '徳島県' | '香川県' | '愛媛県' | '高知県'
  | '福岡県' | '佐賀県' | '長崎県' | '熊本県' | '大分県' | '宮崎県' | '鹿児島県' | '沖縄県';

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  title: string;
  description: string;
  contractorId: string;
  contractor: OrderConstructor;
  constructionTypes: ConstructionType[];
  prefecture: Prefecture;
  city: string;
  budget: number;
  budgetMax?: number;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  applicationsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  projectId: string;
  project: Order;
  applicantId: string;
  applicant: OrderConstructor;
  message: string;
  proposedBudget: number;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  projectId: string;
  project: Order;
  contractorId: string;
  contractor: OrderConstructor;
  workerId: string;
  worker: OrderConstructor;
  matchedAt: Date;
  completedAt?: Date;
  rating?: number;
  review?: string;
}

export interface SearchFilters {
  constructionTypes?: ConstructionType[];
  prefecture?: Prefecture;
  keyword?: string;
  budgetMin?: number;
  budgetMax?: number;
}

// --- Order model (replacing Project usage going forward) ---
export interface Order {
  id: string;
  enterpriseId: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  title: string;
  prefectureId: Prefecture;
  city: string;
  propertyTypeId: string;
  constructionTypeId: ConstructionType;
  laborBudget: number | null; // 1円単位
  estimateBudget: number | null; // 1万円単位
  workScope: string | null;
  requiredLicensesCertification: string | null;
  requiredInsuranceCoverage: string | null;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  constructionStartDate: Date;
  constructionEndDate: Date;
  applicationStartDate: Date;
  applicationEndDate: Date;
  contractorPosition: string;
  paymentClosingDate: string;
  paymentDueMonth: string;
  paymentDueDate: string;
  canPayBeforeStart: boolean;
}

// --- OrderConstructor (企業) ---
export interface OrderConstructor {
  id: string;
  companyName: string; // 会社名
  companyEmail: string; // メールアドレス
  companyPhone: string; // 電話番号
  companyAddress: string; // 番地以降の住所
  companyPrefecture: Prefecture; // 都道府県
  companyCity: string; // 市区町村
  companyZipCode: string; // 郵便番号
  companyEstablishedAt: Date | null; // 設立日
  companyAnnualRevenue: number | null; // 年間売上高
  companyRepresentativeName: string | null; // 代表者名
  companyCapital: number | null; // 資本金
  companyUrl: string | null; // 企業URL
  availableAreas: Prefecture[] | null; // 対応可能エリア
  constructionTypes: ConstructionType[] | null; // 工種
  propertyTypes: string[] | null; // 物件ジャンル
  workScope: string | null; // 業務範囲
  managersCount: number | null; // 現場管理者数
  craftsmanCount: number | null; // 自社職人数
  insuranceCoverage: string | null; // 加入保険
  constructionBusinessLicenseName: string | null; // 建設業許可証名
}