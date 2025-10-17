import { useSearchParams as useSearchParamsNext } from "next/navigation";

export const useAppendParams = () => {
  const searchParams = useSearchParamsNext();

  const append = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as unknown as string);
    params.delete(key);
    params.append(key, value);
    return params.toString();
  };

  return { append };
};
