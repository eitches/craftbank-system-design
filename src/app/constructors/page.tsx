import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Badge } from "@/component/ui/badge/badge";
import { Button } from "@/component/ui/button/button";
import OrderPageSwitcher from "@/feature/order-page-switcher";
import { Footer } from "@/component/footer";
import { getConstructors } from "@/app/repository/constructor-repository";
import { Suspense } from "react";
import { Skeleton as UISkeleton } from "@/component/ui/skeleton/skeleton";
import { Avatar, AvatarFallback } from "@/component/ui/avatar/avatar";
import { Building2, MapPin, Mail, Phone } from "lucide-react";
import { ConstructorFilters } from "@/feature/constructors/constructor-filters";
import { getPrefectures } from "@/app/repository/prefecture-repository";
import { getConstructionTypes } from "@/app/repository/construction-type-repository";

export default async function ConstructorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const keyword =
    typeof searchParams.keyword === "string" ? searchParams.keyword : undefined;
  const prefectureParam =
    typeof searchParams.prefecture === "string"
      ? searchParams.prefecture
      : undefined;
  const constructionTypeParam =
    typeof searchParams.constructionType === "string"
      ? searchParams.constructionType
      : undefined;

  const constructors = await getConstructors({
    keyword,
    prefecture:
      prefectureParam && prefectureParam !== "all"
        ? prefectureParam
        : undefined,
    constructionTypes:
      constructionTypeParam && constructionTypeParam !== "all"
        ? [constructionTypeParam]
        : undefined,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <OrderPageSwitcher />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">企業一覧</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              協力会社を検索して、最適なパートナーを見つけましょう。
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <Suspense fallback={<Skeleton />}>
                {/* Server Component that fetches options */}
                <ConstructorFilterFetcher />
              </Suspense>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{`${constructors.length}件が見つかりました`}</p>
              </div>

              <div className="space-y-4">
                {constructors.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">
                        条件に一致する企業が見つかりませんでした
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  constructors.map((constructorItem) => (
                    <Card
                      key={constructorItem.id}
                      className="transition-shadow hover:shadow-lg focus-within:ring-2"
                    >
                      <CardContent className="pt-6">
                        <div
                          className="flex items-start space-x-4"
                          role="article"
                        >
                          <Avatar className="h-16 w-16">
                            <AvatarFallback>
                              <Building2 className="h-8 w-8" />
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="mb-1 flex items-center gap-2">
                                <h3 className="text-lg font-semibold tracking-tight">
                                  {constructorItem.companyName}
                                </h3>
                                {constructorItem.constructionBusinessLicenseName && (
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground"
                                  >
                                    {
                                      constructorItem.constructionBusinessLicenseName
                                    }
                                  </Badge>
                                )}
                              </div>
                              {constructorItem.companyRepresentativeName && (
                                <p className="text-sm text-muted-foreground">
                                  代表者:{" "}
                                  {constructorItem.companyRepresentativeName}
                                </p>
                              )}
                            </div>

                            <p className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {constructorItem.companyPrefecture}{" "}
                              {constructorItem.companyCity}
                            </p>

                            <div className="flex flex-wrap gap-1">
                              {(constructorItem.constructionTypes ?? [])
                                .slice(0, 3)
                                .map((type) => (
                                  <Badge
                                    key={type}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {type}
                                  </Badge>
                                ))}
                              {(constructorItem.constructionTypes?.length ??
                                0) > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +
                                  {constructorItem.constructionTypes!.length -
                                    3}
                                </Badge>
                              )}
                            </div>

                            {constructorItem.workScope && (
                              <div className="text-sm text-muted-foreground">
                                <p className="line-clamp-2">
                                  {constructorItem.workScope}
                                </p>
                                <Link
                                  href={`/constructors/${constructorItem.id}`}
                                  className="mt-1 inline-block text-primary underline-offset-2 hover:underline"
                                  aria-label={`${constructorItem.companyName} の詳細を読む`}
                                >
                                  続きを読む
                                </Link>
                              </div>
                            )}

                            <div className="mt-2 flex items-center justify-between border-t pt-3">
                              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                {constructorItem.companyEmail && (
                                  <a
                                    href={`mailto:${constructorItem.companyEmail}`}
                                    className="flex items-center hover:text-foreground"
                                    aria-label="メールで問い合わせ"
                                  >
                                    <Mail className="mr-1 h-3 w-3" />
                                    <span>{constructorItem.companyEmail}</span>
                                  </a>
                                )}
                                {constructorItem.companyPhone && (
                                  <a
                                    href={`tel:${constructorItem.companyPhone}`}
                                    className="flex items-center hover:text-foreground"
                                    aria-label="電話をかける"
                                  >
                                    <Phone className="mr-1 h-3 w-3" />
                                    <span>{constructorItem.companyPhone}</span>
                                  </a>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  asChild
                                  size="sm"
                                  aria-label={`${constructorItem.companyName} の詳細を見る`}
                                >
                                  <Link
                                    href={`/constructors/${constructorItem.id}`}
                                  >
                                    詳細を見る
                                  </Link>
                                </Button>
                                {constructorItem.companyEmail && (
                                  <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    aria-label={`${constructorItem.companyName} に問い合わせ`}
                                  >
                                    <a
                                      href={`mailto:${constructorItem.companyEmail}`}
                                    >
                                      問い合わせ
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
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

function Skeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="h-5 w-32">
            <UISkeleton className="h-5 w-full" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <UISkeleton className="h-4 w-24" />
          <UISkeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <UISkeleton className="h-4 w-24" />
          <UISkeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <UISkeleton className="h-4 w-24" />
          <UISkeleton className="h-10 w-full" />
        </div>
        <div className="flex gap-2">
          <UISkeleton className="h-10 flex-1" />
          <UISkeleton className="h-10 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export async function ConstructorFilterFetcher() {
  const [prefectures, constructionTypes] = await Promise.all([
    getPrefectures(),
    getConstructionTypes(),
  ]);

  return (
    <ConstructorFilters
      prefectures={prefectures}
      constructionTypes={constructionTypes}
    />
  );
}
