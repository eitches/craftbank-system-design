import type { QueryParams } from "./queryParams";

export const buildQuery = (params?: QueryParams) => {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }

  if (typeof params === "string") {
    return `?${params}`;
  }

  const filteredParams = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null,
    // [ビルドエラー解消] as使わないようにしたい。そもそもオブジェクトなど[string, string]以外の形でURLSearchParamsに渡せないか
  ) as [string, string][];

  return `?${new URLSearchParams(filteredParams).toString()}`;
};
