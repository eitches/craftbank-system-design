import {
  ContractorPositionMap,
  PaymentDateMap,
  PaymentDueMonthMap,
} from "@/api/repository/order/order-repository";
import { z } from "zod";

export const orderFormSchema = z.object({
  title: z.string({ message: "発注名を入力してください" }),
  prefectureId: z.string({ message: "都道府県を選択してください" }),
  city: z.string({ message: "市区町村を入力してください" }),
  propertyTypeId: z.string({ message: "物件種別を選択してください" }),
  constructionTypeId: z.string({ message: "工種を選択してください" }),
  description: z.string({ message: "詳細説明を入力してください" }).optional(),
  laborBudget: z
    .string({ message: "労務費予算を入力してください" })
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  estimateBudget: z
    .string({ message: "見積予算を入力してください" })
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  constructionStartDate: z
    .string({ message: "工事開始日を入力してください" })
    .optional(),
  constructionEndDate: z
    .string({ message: "工事終了日を入力してください" })
    .optional(),
  applicationStartDate: z
    .string({ message: "応募開始日を入力してください" })
    .optional(),
  applicationEndDate: z
    .string({ message: "応募終了日を入力してください" })
    .optional(),
  contractorPosition: z
    .nativeEnum(ContractorPositionMap, {
      message: "掲載者ポジションを選択してください",
    })
    .optional(),
  paymentClosingDate: z
    .nativeEnum(PaymentDateMap, {
      message: "支払い締め日を選択してください",
    })
    .optional(),
  paymentDueMonth: z
    .nativeEnum(PaymentDueMonthMap, {
      message: "支払いサイト（月）を選択してください",
    })
    .optional(),
  paymentDueDate: z
    .nativeEnum(PaymentDateMap, {
      message: "支払いサイト（日）を選択してください",
    })
    .optional(),
  canPayBeforeStart: z
    .boolean({ message: "着手金支払い可否を選択してください" })
    .optional()
    .transform((val) => val ?? false),
  workScope: z.string({ message: "作業範囲を入力してください" }).optional(),
  requiredLicensesCertification: z
    .string({ message: "必要な資格・認証を入力してください" })
    .optional(),
  requiredInsuranceCoverage: z
    .string({ message: "必要な保険適用範囲を入力してください" })
    .optional(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
