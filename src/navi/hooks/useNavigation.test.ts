import { renderHook } from "@testing-library/react-hooks";
import * as nextNavigationModule from "next/navigation";
import { describe, expect, test, vi } from "vitest";
import { useNavigation } from "./useNavigation";

vi.unmock("./useNavigation");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
  redirect: vi.fn(),
}));

describe("useNavigation", () => {
  test("returns correct values", () => {
    const useRouterSpy = vi.spyOn(nextNavigationModule, "useRouter");
    const usePathnameSpy = vi.spyOn(nextNavigationModule, "usePathname");
    const useParamsSpy = vi.spyOn(nextNavigationModule, "useParams");

    const mockPush = vi.fn();
    const mockBack = vi.fn();
    const mockReplace = vi.fn();
    const mockPrefetch = vi.fn();
    const mockForward = vi.fn();
    const mockRefresh = vi.fn();
    const mockPathname = "/example-path";
    const mockParams = { id: "123" };

    useRouterSpy.mockReturnValue({
      push: mockPush,
      back: mockBack,
      replace: mockReplace,
      prefetch: mockPrefetch,
      forward: mockForward,
      refresh: mockRefresh,
    });
    usePathnameSpy.mockReturnValue(mockPathname);
    useParamsSpy.mockReturnValue(mockParams);

    const { result } = renderHook(() => useNavigation());

    expect(result.current.push).toBe(mockPush);
    expect(result.current.pathname).toBe(mockPathname);
    expect(result.current.params).toBe(mockParams);

    useRouterSpy.mockRestore();
    usePathnameSpy.mockRestore();
    useParamsSpy.mockRestore();
  });

  test("redirect function calls correctly", () => {
    const redirectSpy = vi.spyOn(nextNavigationModule, "redirect");

    const { result } = renderHook(() => useNavigation());

    const redirectPath = "/example-path";
    result.current.redirect(redirectPath);

    expect(redirectSpy).toHaveBeenCalledWith(redirectPath);

    redirectSpy.mockRestore();
  });
});
