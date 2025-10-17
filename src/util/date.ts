const TIME_ZONE = "Asia/Tokyo";

/**
 * 文字列の日付を日本語形式でフォーマットする
 * @param date - フォーマットする日付文字列
 * @returns "2024年1月1日" 形式の文字列
 */
export const formatStringDateToJP = (date: string) =>
  getJPIntlDateTimeFormat({
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

/**
 * 文字列の日付を詳細な日本語形式でフォーマットする
 * @param date - フォーマットする日付文字列
 * @returns "2024年1月1日(月) 12:34" 形式の文字列
 */
export const formatStringDetailDateToJP = (date: string) =>
  getJPIntlDateTimeFormat({
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));

/**
 * 日付文字列を年月の日本語形式でフォーマットする
 * @param date - フォーマットする日付文字列
 * @returns "2025年9月" 形式の文字列
 */
export const formatDateToJPYearMonth = (date: string) =>
  getJPIntlDateTimeFormat({
    year: "numeric",
    month: "long",
  }).format(convertToDate(date));

/**
 * 日付を短縮形式の日本語でフォーマットする
 * @param date - フォーマットする日付文字列
 * @returns "1月1日" 形式の文字列
 */
export const formatToJPDate = (date: Date | string) =>
  getJPIntlDateTimeFormat({
    month: "short",
    day: "numeric",
  }).format(convertToDate(date));

/**
 * ISO文字列の日付をYYYY-MM-DD形式でフォーマットする
 * shadcn/uiのtype="date"のInputでは"YYYY-MM-DD"形式を要求するが、ja-JP/en-USだと"YYYY/MM/DD"形式になるのでen-CAロケールを使用する。
 * @param isoString - フォーマットするISO日付文字列
 * @returns "2024-01-01" 形式の文字列
 */
export const formatISOStringToDate = (isoString: string) =>
  getCAIntlDateTimeFormat({
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(new Date(isoString));

/**
 * ISO文字列の日付をYYYY-MM形式でフォーマットする
 * type="month"のInputで使用するため。ja-JP/en-USだと"YYYY/MM/DD"形式になるのでen-CAロケールを使用する
 * @param isoString - フォーマットするISO日付文字列
 * @returns "2024-01" 形式の文字列
 */
export const formatISOStringToMonth = (isoString: string) =>
  getCAIntlDateTimeFormat({
    year: "numeric",
    month: "numeric",
  }).format(new Date(isoString));

/**
 * 時刻を日本語形式でフォーマットする
 * @param date - フォーマットするDate型の日付
 * @returns "12:34" 形式の文字列
 */
export const formatDateToTimeStr = (date: Date) =>
  getJPIntlDateTimeFormat({
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

/**
 * 時刻を日本語形式でフォーマットする
 * @param date - フォーマットするDate型の日付
 * @returns "12:34:56" 形式の文字列
 */
export const formatDateToTimeStrWithSeconds = (date: Date) =>
  getJPIntlDateTimeFormat({
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);

const convertToDate = (date: Date | string) =>
  date instanceof Date ? date : new Date(date);

// ex) YYYY/MM/DD
const getJPIntlDateTimeFormat = (
  options: Omit<Intl.DateTimeFormatOptions, "timeZone">,
) =>
  new Intl.DateTimeFormat("ja-JP", {
    ...options,
    timeZone: TIME_ZONE,
  });

// ex) YYYY-MM-DD
const getCAIntlDateTimeFormat = (
  options: Omit<Intl.DateTimeFormatOptions, "timeZone">,
) =>
  new Intl.DateTimeFormat("en-CA", {
    ...options,
    timeZone: TIME_ZONE,
  });
