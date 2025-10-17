import { Card, CardContent } from "@/component/ui/card/card";
import { Skeleton } from "@/component/ui/skeleton/skeleton";
import { OrderSearchFilterTemplate } from "@/feature/order/order-search-filter-template";
import type { SearchQuery } from "@/feature/order/types";
import { Suspense } from "react";
import { SearchFilter } from "../search-filter";
import { OrderListContents } from "./contents";

export const OrderList = async ({ query }: { query: SearchQuery }) => (
  <OrderSearchFilterTemplate
    title="発注一覧"
    description="建設工事発注を検索して、最適な発注に応募しましょう。"
    searchFilter={
      <SearchFilter
        query={query}
        title="発注を検索"
        placeholder="発注名や詳細で検索"
      />
    }
  >
    <Suspense fallback={<OrderListSkeleton />}>
      <OrderListContents query={query} />
    </Suspense>
  </OrderSearchFilterTemplate>
);

const OrderListSkeleton = () => (
  <div className="lg:col-span-3 flex flex-col gap-1">
    <div className="text-sm self-end flex gap-1 pb-4">
      <Skeleton className="h-4 w-6" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
          key={index}
          className="transition-shadow hover:shadow-sm h-[229px]"
        >
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-64" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>

            <Skeleton className="h-4 w-full" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>

            <div className="grid gap-2 text-sm md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
