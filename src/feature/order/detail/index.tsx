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
import { OrderDetailContents } from "./contents";

export const OrderDetail = ({ orderId }: { orderId: string }) => (
  <div className="flex min-h-screen flex-col">
    <div className="flex-1 py-10">
      <div className="container mx-auto max-w-5xl px-4 flex flex-col gap-8">
        <Link
          href={path.enterprise.order.list()}
          className="flex gap-1 items-center text-sm text-muted-foreground w-30"
        >
          <ArrowLeft />
          発注一覧に戻る
        </Link>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">発注詳細</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            募集内容と建設業者情報を確認し、応募フォームからエントリーできます。
          </p>
        </div>

        <Suspense fallback={<OrderDetailSkeleton />}>
          <OrderDetailContents orderId={orderId} />
        </Suspense>
      </div>
    </div>
  </div>
);

const OrderDetailSkeleton = () => (
  <div className="space-y-6">
    <Card className="border shadow-sm h-[537px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeletonなので気にしない
            <div key={index} className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-52" />
          </div>
        </div>

        <div className="flex justify-center py-3">
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>

    <Card className="h-[185px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
