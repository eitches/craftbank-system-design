import Link from 'next/link';
import { ArrowLeft, MapPin, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Footer } from '@/components/footer';
import { getOrderById } from '@/app/repository/orders-repository';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import OrderPageSwitcher from '@/feature/order-page-switcher';
import { applyOrder } from '@/feature/orders/server/apply-order';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);

  // Bind server action to this order id
  const apply = order ? applyOrder.bind(null, order.id) : undefined;

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col">
        <OrderPageSwitcher />
        <main className="flex-1 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <Card>
              <CardContent className="py-12 text-center">
                <div className="mx-auto max-w-md text-left">
                  <Alert>
                    <AlertTitle>発注が見つかりませんでした</AlertTitle>
                    <AlertDescription>
                      URLをご確認のうえ、発注一覧から再度お探しください。
                    </AlertDescription>
                  </Alert>
                </div>
                <Button asChild className="mt-4">
                  <Link href="/orders">発注一覧に戻る</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <OrderPageSwitcher />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              発注一覧に戻る
            </Link>
          </Button>

          {/* Page header */}
          <div className="mb-8 rounded-lg border bg-secondary/50 p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-3xl font-semibold tracking-tight">発注詳細</h1>
              <span className="text-xs text-muted-foreground">Detail</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">募集内容と企業情報を確認し、応募フォームからエントリーできます。</p>
          </div>

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
                  <Badge variant="secondary" className="text-base">
                    {order.status === 'open' ? '募集中' : '進行中'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">発注詳細</h3>
                  <p className="whitespace-pre-wrap text-muted-foreground">{order.description}</p>
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
                      {typeof order.laborBudget === 'number' ? `¥${order.laborBudget.toLocaleString()}` : '未設定'}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">工期</h3>
                    <p className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(order.constructionStartDate).toLocaleDateString('ja-JP')} 〜{' '}
                      {new Date(order.constructionEndDate).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold">募集期間</h3>
                    <p className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(order.applicationStartDate).toLocaleDateString('ja-JP')} 〜{' '}
                      {new Date(order.applicationEndDate).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">支払い条件</h3>
                    <p className="text-muted-foreground text-sm">
                      締め日: {order.paymentClosingDate} / 支払月: {order.paymentDueMonth} / 支払日: {order.paymentDueDate}
                    </p>
                  </div>
                </div>

                <Separator className="mt-2 mb-6" />
                <h3 className="mb-4 font-semibold">この発注に応募する</h3>
                <form action={apply} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="proposedBudget">希望予算（円）</Label>
                    <Input
                      id="proposedBudget"
                      name="proposedBudget"
                      type="number"
                      placeholder="10000000"
                      required
                      min={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">メッセージ</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="実績や提案内容を記入してください"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    応募する
                  </Button>
                </form>
                <p className="mt-2 text-xs text-muted-foreground">送信後は発注一覧に戻ります。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>発注元情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={undefined} />
                    <AvatarFallback>
                      <Building2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold">
                      企業ID: {order.enterpriseId}
                    </h3>
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
                    <p className="text-sm text-muted-foreground">支払い前払い可: {order.canPayBeforeStart ? '可' : '不可'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-right">
              <Button asChild variant="outline">
                <Link href="/orders">一覧へ戻る</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}