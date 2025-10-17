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
import { createOrderAction } from "@/feature/order/create/server/create-order";
import { OrderForm } from "@/feature/order/form";
import { Suspense } from "react";
import { OrderFormSkeleton } from "./skeleton";
import { fetchPrefectures } from "../server/fetch-prefectures";

export const OrderCreater = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">発注登録</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              新しい工事発注を登録して、最適な協力会社や職人を募集しましょう。
            </p>
          </div>

          <Suspense fallback={<OrderFormSkeleton />}>
            <OrderCreaterFormFetcher />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

const OrderCreaterFormFetcher = async () => {
  const [prefectures, constructionTypes, propertyTypes] = await Promise.all([
    fetchPrefectures(),
    fetchConstructionTypes(),
    fetchPropertyTypes(),
  ]);

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">発注情報</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderForm
          prefectures={prefectures}
          constructionTypes={constructionTypes}
          propertyTypes={propertyTypes}
          submit={createOrderAction}
        />
      </CardContent>
    </Card>
  );
};
