import { getPublishedOrders } from "@/api/repository/order/order-repository";
import { Badge } from "@/component/ui/badge/badge";
import { Button } from "@/component/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { SearchResultCount } from "@/feature/order/search-result-count";
import type { SearchQuery } from "@/feature/order/types";
import { path } from "@/navi/path";
import { formatStringDateToJP } from "@/util/date";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { NoSearchResultMessage } from "../no-search-result-message";

export const OrderListContents = async ({ query }: { query: SearchQuery }) => {
  const orders = await getPublishedOrders(query);
  if (!orders?.length) {
    return <NoSearchResultMessage title="発注" />;
  }

  return (
    <div className="lg:col-span-3 flex flex-col">
      <SearchResultCount count={orders.length} />
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="transition-shadow hover:shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{order.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {order.prefectureId} {order.city}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{order.contractorPosition}</Badge>
                  <Button asChild>
                    <Link
                      href={path.enterprise.order.detail({
                        id: order.id,
                      })}
                    >
                      詳細を見る
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {order.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{order.constructionTypeId}</Badge>
              </div>

              <div className="grid gap-2 text-sm md:grid-cols-3">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    予算：
                    {order.laborBudget
                      ? `${order.laborBudget.toLocaleString()}円`
                      : "未設定"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    工期開始日：
                    {formatStringDateToJP(
                      order.constructionStartDate.toISOString(),
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    応募締切：
                    {formatStringDateToJP(
                      order.applicationEndDate.toISOString(),
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
