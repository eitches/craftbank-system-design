// removed 'use client' to make this a Server Component
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Building2, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/component/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card/card";
import { Badge } from "@/component/ui/badge/badge";
import { Avatar, AvatarFallback } from "@/component/ui/avatar/avatar";
import { Footer } from "@/component/footer";
import { getConstructorById } from "@/app/repository/constructor-repository";
import { OrderConstructor } from "@/app/repository/types";
import OrderPageSwitcher from "@/feature/order-page-switcher";

export default async function ConstructorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const constructorData: OrderConstructor | null = await getConstructorById(
    params.id,
  );

  if (!constructorData) {
    return (
      <div className="flex min-h-screen flex-col">
        <OrderPageSwitcher />
        <main className="flex-1 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  企業が見つかりませんでした
                </p>
                <Button asChild className="mt-4">
                  <Link href="/constructors">一覧に戻る</Link>
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
            <Link href="/constructors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              一覧に戻る
            </Link>
          </Button>

          {/* Page header */}
          <div className="mb-8 rounded-lg border bg-secondary/50 p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-3xl font-semibold tracking-tight">
                企業詳細
              </h1>
              <span className="text-xs text-muted-foreground">Detail</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              企業の基本情報・対応工種・業務範囲・エリアを確認できます。
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                  <Avatar className="h-32 w-32">
                    <AvatarFallback>
                      <Building2 className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div>
                      <div className="mb-2 flex flex-col items-center gap-2 md:flex-row">
                        <h1 className="text-3xl font-bold">
                          {constructorData.companyName}
                        </h1>
                        {constructorData.constructionBusinessLicenseName && (
                          <Badge variant="secondary" className="text-xs">
                            {constructorData.constructionBusinessLicenseName}
                          </Badge>
                        )}
                      </div>
                      {constructorData.companyRepresentativeName && (
                        <p className="text-lg text-muted-foreground">
                          代表者: {constructorData.companyRepresentativeName}
                        </p>
                      )}
                    </div>

                    <p className="flex items-center justify-center text-muted-foreground md:justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      {constructorData.companyPrefecture}{" "}
                      {constructorData.companyCity}{" "}
                      {constructorData.companyAddress}
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      {constructorData.companyEmail && (
                        <Button asChild className="w-full sm:w-auto">
                          <a href={`mailto:${constructorData.companyEmail}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            メールで問い合わせ
                          </a>
                        </Button>
                      )}
                      {constructorData.companyPhone && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          <a href={`tel:${constructorData.companyPhone}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            電話で問い合わせ
                          </a>
                        </Button>
                      )}
                      {constructorData.companyUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          <a
                            href={constructorData.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="mr-2 h-4 w-4" />
                            企業サイト
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>対応可能工種</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(constructorData.constructionTypes ?? []).map((type) => (
                    <Badge key={type} variant="outline" className="text-sm">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {constructorData.workScope && (
              <Card>
                <CardHeader>
                  <CardTitle>対応できる業務範囲</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {constructorData.workScope}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>企業情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">設立日</span>
                  <span className="font-medium">
                    {constructorData.companyEstablishedAt
                      ? new Date(
                          constructorData.companyEstablishedAt,
                        ).toLocaleDateString("ja-JP")
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">資本金</span>
                  <span className="font-medium">
                    {constructorData.companyCapital
                      ? `${constructorData.companyCapital.toLocaleString()}円`
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">年間売上高</span>
                  <span className="font-medium">
                    {constructorData.companyAnnualRevenue
                      ? `${constructorData.companyAnnualRevenue.toLocaleString()}円`
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">加入保険</span>
                  <span className="font-medium">
                    {constructorData.insuranceCoverage ?? "—"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {constructorData.availableAreas &&
              constructorData.availableAreas.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>対応可能エリア</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {constructorData.availableAreas.map((area) => (
                        <Badge key={area} variant="outline" className="text-sm">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
