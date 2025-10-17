import { Undefinable } from "@/util/types";

type RequiredOrder = {
  description: string;
  constructionStartDate: Date;
  constructionEndDate: Date;
  applicationStartDate: Date;
  applicationEndDate: Date;
  contractorPosition: string;
  paymentClosingDate: string;
  paymentDueMonth: string;
  paymentDueDate: string;
};

type BaseOrder = {
  id: string;
  enterpriseId: string;
  title: string;
  prefectureId: string;
  city: string;
  propertyTypeId: string;
  constructionTypeId: string;
  laborBudget: number | undefined; // 1円単位
  estimateBudget: number | undefined; // 1万円単位
  canPayBeforeStart: boolean;
  workScope: string | undefined;
  requiredLicensesCertification: string | undefined;
  requiredInsuranceCoverage: string | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type DraftOrder = BaseOrder & Undefinable<RequiredOrder>;
export type PublishedOrder = BaseOrder & RequiredOrder;

export interface OrderConstructor {
  id: string;
  companyName: string; // 会社名
  companyEmail: string; // メールアドレス
  companyPhone: string; // 電話番号
  companyAddress: string; // 番地以降の住所
  companyPrefecture: string; // 都道府県
  companyCity: string; // 市区町村
  companyZipCode: string; // 郵便番号
  companyEstablishedAt: Date | undefined; // 設立日
  companyAnnualRevenue: number | undefined; // 年間売上高
  companyRepresentativeName: string | undefined; // 代表者名
  companyCapital: number | undefined; // 資本金
  companyUrl: string | undefined; // 建設業者URL
  availableAreas: string[] | undefined; // 対応可能エリア
  constructionTypes: string[] | undefined; // 工種
  propertyTypes: string[] | undefined; // 物件ジャンル
  workScope: string | undefined; // 業務範囲
  managersCount: number | undefined; // 現場管理者数
  craftsmanCount: number | undefined; // 自社職人数
  insuranceCoverage: string | undefined; // 加入保険
  constructionBusinessLicenseName: string | undefined; // 建設業許可証名
}

export type SearchQuery = {
  keyword?: string;
  prefectureId?: string;
  constructionTypeId?: string;
  propertyTypeId?: string;
};

type OrderMasterData = { id: string; name: string };

export type PropertyType = OrderMasterData;
export type ConstructionType = OrderMasterData;
export type Prefecture = OrderMasterData;
