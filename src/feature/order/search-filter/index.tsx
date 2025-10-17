import {
  fetchConstructionTypes,
  fetchPropertyTypes,
} from "@/api/repository/order/constructor-repository";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Skeleton } from "@/component/ui/skeleton/skeleton";
import { Suspense } from "react";
import type { SearchQuery } from "../types";
import { SearchFilterForm } from "./form";
import { fetchPrefectures } from "../server/fetch-prefectures";

export const SearchFilter = ({
  query,
  title,
  placeholder,
}: {
  query: SearchQuery;
  title: string;
  placeholder: string;
}) => (
  <Suspense fallback={<SearchFilterSkeleton />}>
    <SearchFilterFetcher
      query={query}
      title={title}
      placeholder={placeholder}
    />
  </Suspense>
);

const SearchFilterFetcher = async ({
  query,
  title,
  placeholder,
}: {
  query: SearchQuery;
  title: string;
  placeholder: string;
}) => {
  const [prefectures, constructionTypes, propertyTypes] = await Promise.all([
    fetchPrefectures(),
    fetchConstructionTypes(),
    fetchPropertyTypes(),
  ]);

  return (
    <SearchFilterForm
      query={query}
      title={title}
      placeholder={placeholder}
      prefectures={prefectures}
      constructionTypes={constructionTypes}
      propertyTypes={propertyTypes}
    />
  );
};

const SearchFilterSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="h-5 w-32">
            <Skeleton className="h-5 w-full" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};
