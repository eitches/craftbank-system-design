import { describe, expect, test } from "vitest";
import { buildQuery } from "./buildQuery";

describe("buildQuery", () => {
  test("undefined の場合、空文字を返す", () => {
    expect(buildQuery(undefined)).toBe("");
  });

  test("空オブジェクトの場合、空文字を返す", () => {
    expect(buildQuery({})).toBe("");
  });

  test("パラメータを指定して、期待する文字列が返る", () => {
    expect(buildQuery({ a: "aaa", b: "bbb", c: "ccc" })).toBe(
      "?a=aaa&b=bbb&c=ccc",
    );
  });

  test("undefined, null の値を持つパラメータを含む場合、当該が除外される", () => {
    expect(buildQuery({ a: "aaa", b: undefined, c: null })).toBe("?a=aaa");
  });

  test("string 型のパラメータを指定して、その文字列が返る", () => {
    expect(buildQuery("a=aaa&b=bbb&c=ccc")).toBe("?a=aaa&b=bbb&c=ccc");
  });
});
