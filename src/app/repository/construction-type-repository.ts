import type { ConstructionType } from "@/app/repository/types";

export const constructionTypes: ConstructionType[] = [
  '土木工事', '建築工事', '電気工事', '管工事', '鋼構造物工事', '舗装工事',
  '内装仕上工事', '防水工事', '左官工事', '塗装工事', '大工工事', '屋根工事', '解体工事',
];

export function getConstructionTypes(): ConstructionType[] {
  return constructionTypes;
}