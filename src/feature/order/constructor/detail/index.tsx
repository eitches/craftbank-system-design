import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Link } from "@/component/ui/link/Link";
import { Skeleton } from "@/component/ui/skeleton/skeleton";
import { path } from "@/navi/path";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { OrderConstructorDetailContents } from "./contents";

export const OrderConstructorDetail = ({
  constructorId,
}: {
  constructorId: string;
}) => (
  <div className="flex min-h-screen flex-col">
    <div className="flex-1 py-10">
      <div className="container mx-auto max-w-5xl px-4 flex flex-col gap-8">
        <>
          <Link
            href={path.enterprise.order.constructors.list()}
            className="flex gap-1 items-center text-sm text-muted-foreground w-30"
          >
            <ArrowLeft />
            企業一覧に戻る
          </Link>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight">企業詳細</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              企業の基本情報・対応工種・業務範囲・エリアを確認できます。
            </p>
          </div>

          <Suspense fallback={<OrderConstructorDetailSkeleton />}>
            <OrderConstructorDetailContents constructorId={constructorId} />
          </Suspense>
        </>
      </div>
    </div>
  </div>
);

const OrderConstructorDetailSkeleton = () => (
  <div className="space-y-6">
    <Card className="border shadow-sm">
      <CardContent className="pt-6 h-[216px] flex items-center">
        <div className="flex items-center gap-8">
          <Skeleton className="size-32 rounded-full" />
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="mb-2 flex flex-col items-center gap-2 md:flex-row">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-5 w-52" />
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <Skeleton className="h-4 w-64 md:w-80" />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {Array.from({ length: 3 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
                <Skeleton key={index} className="h-10 w-full sm:w-44" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="h-[129px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
            <Skeleton key={index} className="h-6 w-20" />
          ))}
        </div>
      </CardContent>
    </Card>

    <Card className="h-[123px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>

    <Card className="h-[259px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
            key={index}
            className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="h-[130px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
            <Skeleton key={index} className="h-6 w-16" />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
