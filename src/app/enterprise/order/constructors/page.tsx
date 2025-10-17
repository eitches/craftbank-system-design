import { OrderConstructorList } from "@/feature/order/constructor/list";
import { InvalidQueryMessage } from "@/feature/order/invalid-query-message";
import type { SearchQuery } from "@/feature/order/types";
import { orderQuerySchema } from "../types";

export default async function ConstructorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchQuery>;
}) {
  const query = await searchParams;
  const parsed = orderQuerySchema.safeParse(query);
  if (!parsed.success) {
    return <InvalidQueryMessage />;
  }

  const parsedQuery = parsed.data;

  return <OrderConstructorList query={parsedQuery} />;
}
