import { Card, CardContent } from "@/component/ui/card/card";
import { Separator } from "@/component/ui/separator/separator";
import { Skeleton } from "@/component/ui/skeleton/skeleton";
import { OrderSearchFilterTemplate } from "@/feature/order/order-search-filter-template";
import type { SearchQuery } from "@/feature/order/types";
import { Suspense } from "react";
import { SearchFilter } from "../../search-filter";
import { OrderConstructorListContents } from "./contents";

export const OrderConstructorList = async ({
  query,
}: {
  query: SearchQuery;
}) => (
  <OrderSearchFilterTemplate
    title="建設業者一覧"
    description="建設業者を検索して、最適なパートナーを見つけましょう。"
    searchFilter={
      <SearchFilter
        query={query}
        title="建設業者を検索"
        placeholder="建設業者名で検索"
      />
    }
  >
    <Suspense fallback={<OrderConstructorListSkeleton />}>
      <OrderConstructorListContents query={query} />
    </Suspense>
  </OrderSearchFilterTemplate>
);

const OrderConstructorListSkeleton = () => (
  <div className="lg:col-span-3 flex flex-col gap-5">
    <div className="text-sm self-end flex gap-1">
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
          key={index}
          className="transition-shadow hover:shadow-lg focus-within:ring-2"
        >
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-5">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-28" />
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Skeleton className="mr-1 h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>

                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-14" />
                </div>

                <div className="text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-24" />
                </div>

                <Separator className="my-5" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
