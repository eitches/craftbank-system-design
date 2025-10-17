import { Card, CardContent, CardHeader } from "@/component/ui/card/card";
import { Skeleton } from "@/component/ui/skeleton/skeleton";

export const OrderFormSkeleton = () => (
  <Card className="h-[1449px] border shadow-sm">
    <CardHeader>
      <Skeleton className="h-7 w-32" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-6">
        <SkeletonField labelWidth="w-24" />
        <SkeletonTextarea labelWidth="w-16" heightClass="h-25" />
        <SkeletonSelect labelWidth="w-24" />
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonSelect labelWidth="w-24" />
          <SkeletonField labelWidth="w-24" />
        </div>
        <SkeletonSelect labelWidth="w-28" />
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonField labelWidth="w-24" />
          <SkeletonField labelWidth="w-28" helperWidth="w-56" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonField labelWidth="w-28" />
          <SkeletonField labelWidth="w-28" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonField labelWidth="w-28" />
          <SkeletonField labelWidth="w-28" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonSelect labelWidth="w-36" />
          <SkeletonSelect labelWidth="w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonSelect labelWidth="w-36" />
          <SkeletonSelect labelWidth="w-36" />
        </div>
        <SkeletonCheckbox labelWidth="w-32" />
        <SkeletonTextarea labelWidth="w-32" heightClass="h-24" />
        <SkeletonTextarea labelWidth="w-48" heightClass="h-24" />
        <div className="flex gap-4 self-end pt-4">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const SkeletonField = ({
  labelWidth,
  helperWidth,
}: {
  labelWidth: string;
  helperWidth?: string;
}) => (
  <div className="space-y-2">
    <Skeleton className={`h-4 ${labelWidth}`} />
    <Skeleton className="h-10 w-full" />
    {helperWidth ? <Skeleton className={`h-3 ${helperWidth}`} /> : null}
  </div>
);

const SkeletonSelect = ({ labelWidth }: { labelWidth: string }) => (
  <div className="space-y-2">
    <Skeleton className={`h-4 ${labelWidth}`} />
    <Skeleton className="h-10 w-full" />
  </div>
);

const SkeletonTextarea = ({
  labelWidth,
  heightClass,
}: {
  labelWidth: string;
  heightClass: string;
}) => (
  <div className="space-y-2">
    <Skeleton className={`h-4 ${labelWidth}`} />
    <Skeleton className={`${heightClass} w-full`} />
  </div>
);

const SkeletonCheckbox = ({ labelWidth }: { labelWidth: string }) => (
  <div className="flex items-center gap-3">
    <Skeleton className="h-4 w-4" />
    <Skeleton className={`h-4 ${labelWidth}`} />
  </div>
);
