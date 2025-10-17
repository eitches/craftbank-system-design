import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HardHat,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/component/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Badge } from "@/component/ui/badge/badge";
import { Footer } from "@/component/footer";
import { getConstructorStats } from "@/app/repository/constructor-repository";
import { getOrdersCount } from "@/app/repository/orders-repository";
import OrderPageSwitcher from "@/feature/order-page-switcher";

export default async function Home() {
  const [userStats, orderStats] = await Promise.all([
    getConstructorStats(),
    getOrdersCount(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <OrderPageSwitcher />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4" variant="secondary">
                マッチング率86%
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                建設工事の受発注を
                <br />
                もっとスムーズに
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                CraftBankは、元請けと協力会社・職人をつなぐ建設工事専門のマッチングプラットフォームです。
                <br />
                登録無料で、毎日新しい発注と出会いが生まれています。
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/orders">
                    発注を探す
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/orders">発注を探す</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/40 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {userStats.totalCompanies.toLocaleString()}社
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  登録企業数
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {userStats.totalCraftsmen.toLocaleString()}人
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  登録職人数
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {orderStats.openOrders}件
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  募集中の発注
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">CraftBankの特徴</h2>
              <p className="text-muted-foreground">
                建設業界に特化した機能で、最適なマッチングを実現
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Building2 className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>豊富な発注情報</CardTitle>
                  <CardDescription>
                    土木、建築、電気、管工事など、様々な工種の発注が毎日更新されています
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>エリア・工種で絞り込み検索</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>詳細な発注情報の閲覧</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>オンラインで簡単応募</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <HardHat className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>信頼できるパートナー探し</CardTitle>
                  <CardDescription>
                    経験豊富な協力会社や職人と出会えるプラットフォーム
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>企業・職人プロフィール閲覧</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>実績・評価の確認が可能</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>直接メッセージでやり取り</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>高いマッチング率</CardTitle>
                  <CardDescription>
                    86%の高いマッチング率で、効率的な受発注を実現
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>AI活用の最適マッチング</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>オフラインイベント「職人酒場」</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>専任スタッフのサポート</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-muted/40 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">ご利用の流れ</h2>
              <p className="text-muted-foreground">
                簡単3ステップで受発注をスタート
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">無料登録</h3>
                  <p className="text-sm text-muted-foreground">
                    企業情報や職人情報を登録。登録は完全無料です。
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">検索・応募</h3>
                  <p className="text-sm text-muted-foreground">
                    希望の発注や協力会社を検索し、オンラインで応募。
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">マッチング成立</h3>
                  <p className="text-sm text-muted-foreground">
                    条件が合えばマッチング成立。受発注をスタート。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                今すぐCraftBankを始めよう
              </h2>
              <p className="mb-8 text-lg opacity-90">
                登録無料。あなたに最適な発注やパートナーが見つかります。
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/orders">
                    発注を探す
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/orders">発注を見る</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
