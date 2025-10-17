import { getPublishedOrder } from "@/api/repository/order/order-repository";
import { Avatar, AvatarFallback } from "@/component/ui/avatar/avatar";
import { Badge } from "@/component/ui/badge/badge";
import { Button } from "@/component/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Link } from "@/component/ui/link/Link";
import { path } from "@/navi/path";
import { formatStringDateToJP } from "@/util/date";
import { Building2, Calendar, MapPin } from "lucide-react";
import { OrderApplyButton } from "./apply-button";

export const OrderDetailContents = async ({ orderId }: { orderId: string }) => {
  const order = await getPublishedOrder(orderId);
  if (!order) {
    return <OrderDetailNotFound />;
  }

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="mb-2 text-2xl">{order.title}</CardTitle>
              <CardDescription className="flex items-center text-base">
                <MapPin className="mr-1 h-4 w-4" />
                {order.prefectureId} {order.city}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">発注詳細</h3>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {order.description}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">対応工種</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{order.constructionTypeId}</Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">予算</h3>
              <p className="flex items-center text-muted-foreground">
                <Building2 className="mr-2 h-4 w-4" />
                {/* サーバ側から単位付きで返す */}
                {order.laborBudget}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">工期</h3>
              <p className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {formatStringDateToJP(
                  order.constructionStartDate.toISOString(),
                )}
                〜
                {formatStringDateToJP(order.constructionEndDate.toISOString())}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">募集期間</h3>
              <p className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {formatStringDateToJP(order.applicationStartDate.toISOString())}
                〜{formatStringDateToJP(order.applicationEndDate.toISOString())}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">支払い条件</h3>
              <p className="text-muted-foreground text-sm">
                締め日: {order.paymentClosingDate} / 支払月:
                {order.paymentDueMonth} / 支払日: {order.paymentDueDate}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <OrderApplyButton orderId={orderId} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>発注元情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="mb-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {order.prefectureId} {order.city}
              </p>
              <div className="mb-3 flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  役割: {order.contractorPosition}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  物件種別: {order.propertyTypeId}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                支払い前払い可: {order.canPayBeforeStart ? "可" : "不可"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const OrderDetailNotFound = () => (
  <Card>
    <CardContent className="py-12 text-center">
      <div className="mx-auto max-w-md text-left">
        <div>
          <p>発注が見つかりませんでした</p>
          <p>URLをご確認のうえ、発注一覧から再度お探しください。</p>
        </div>
      </div>
      <Button asChild className="mt-4">
        <Link href={path.enterprise.order.list()}>発注一覧に戻る</Link>
      </Button>
    </CardContent>
  </Card>
);
