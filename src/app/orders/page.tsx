import Link from 'next/link';
import { MapPin, Calendar, Briefcase, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Footer } from '@/components/footer';
import { OrderFilters } from '@/feature/orders/order-filters';
import { getOrders } from '@/app/repository/orders-repository';
import OrderPageSwitcher from '@/feature/order-page-switcher';

interface PageProps {
  searchParams: {
    keyword?: string;
    prefecture?: string;
    constructionType?: string;
  };
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = searchParams;
  
  const orders = await getOrders({
    keyword: params.keyword,
    prefecture: params.prefecture === 'all' ? undefined : (params.prefecture as any),
    constructionTypes: params.constructionType && params.constructionType !== 'all' 
      ? [params.constructionType as any] 
      : undefined,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <OrderPageSwitcher />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">発注一覧</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              建設工事発注を検索して、最適な発注に応募しましょう。
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <OrderFilters 
                initialKeyword={params.keyword}
                initialPrefecture={params.prefecture}
                initialConstructionType={params.constructionType}
              />
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {orders.length}件の発注が見つかりました
                </p>
                <Button asChild>
                  <Link href="/orders/new">発注を登録</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <div className="mx-auto max-w-md text-left">
                        <Alert>
                          <AlertTitle>該当する発注がありません</AlertTitle>
                          <AlertDescription>
                            条件を変更するか、キーワードを調整して再検索してください。
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order) => (
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
                          <Badge variant="secondary">{order.status === 'open' ? '募集中' : '進行中'}</Badge>
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
                            <span>予算: {typeof order.laborBudget === 'number' ? `¥${order.laborBudget.toLocaleString()}` : '未設定'}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{new Date(order.constructionStartDate).toLocaleDateString('ja-JP')}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>募集締切: {new Date(order.applicationEndDate).toLocaleDateString('ja-JP')}</span>
                          </div>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-sm">
                            <p className="font-medium">{order.contractorPosition}</p>
                            <p className="text-muted-foreground">発注元ID: {order.enterpriseId}</p>
                          </div>
                          <Button asChild>
                            <Link href={`/orders/${order.id}`}>詳細を見る</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}