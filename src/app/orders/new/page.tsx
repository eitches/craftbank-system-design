import { Footer } from '@/components/footer';
import { OrderCreateForm } from '@/feature/orders/form';
import { getPrefectures } from '@/app/repository/prefecture-repository';
import { getConstructionTypes } from '@/app/repository/construction-type-repository';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderPageSwitcher from '@/feature/order-page-switcher';

export default async function NewOrderPage() {
  const prefectures = await getPrefectures();
  const constructionTypes = await getConstructionTypes();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top switcher links (header removed) */}
      <OrderPageSwitcher />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">発注登録</h1>
            <p className="mt-2 text-sm text-muted-foreground">新しい工事発注を登録して、最適な協力会社や職人を募集しましょう。</p>
          </div>

          <Separator className="mb-8" />

          <Card className="border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">発注情報</CardTitle>
              <CardDescription>必要な情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <OrderCreateForm prefectures={prefectures} constructionTypes={constructionTypes} />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}