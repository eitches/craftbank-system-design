import { renderHook } from "@testing-library/react-hooks";
import * as nextNavigation from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { describe, expect, test, vi } from "vitest";
import { useAppendParams } from "./useAppendParams";

vi.mock("next/navigation");

describe("useAppendParams", () => {
  test("パラメータを追加すると、すでに登録済みのパラメータと結合して返す", () => {
    vi.spyOn(nextNavigation, "useSearchParams").mockReturnValue(
      new URLSearchParams("r=hello") as unknown as ReadonlyURLSearchParams,
    );

    const { append } = renderHook(() => useAppendParams()).result.current;
    const actual = append("q", "all");

    expect(actual).toBe("r=hello&q=all");
  });
});
