import { InvalidQueryMessage } from "@/feature/order/invalid-query-message";
import { OrderList } from "@/feature/order/list";
import type { SearchQuery } from "@/feature/order/types";
import { orderQuerySchema } from "./types";

export default async function OrdersPage({
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

  return <OrderList query={parsedQuery} />;
}
