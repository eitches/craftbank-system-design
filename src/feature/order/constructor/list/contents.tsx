import { getConstructors } from "@/api/repository/order/constructor-repository";
import { Avatar, AvatarFallback } from "@/component/ui/avatar/avatar";
import { Badge } from "@/component/ui/badge/badge";
import { Button } from "@/component/ui/button/button";
import { Card, CardContent } from "@/component/ui/card/card";
import { Separator } from "@/component/ui/separator/separator";

import type { SearchQuery } from "@/feature/order/types";
import { path } from "@/navi/path";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { NoSearchResultMessage } from "../../no-search-result-message";
import { SearchResultCount } from "../../search-result-count";

export const OrderConstructorListContents = async ({
  query,
}: {
  query: SearchQuery;
}) => {
  const constructors = await getConstructors(query);
  if (!constructors?.length) {
    return <NoSearchResultMessage title="建設業者" />;
  }

  return (
    <div className="lg:col-span-3 flex flex-col">
      <SearchResultCount count={constructors.length} />
      <div className="space-y-4">
        {constructors.map((con) => (
          <Card
            key={con.id}
            className="transition-shadow hover:shadow-lg focus-within:ring-2"
          >
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    <Building2 className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {con.companyName}
                      </h3>
                      {con.constructionBusinessLicenseName && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground"
                        >
                          {con.constructionBusinessLicenseName}
                        </Badge>
                      )}
                    </div>
                    {con.companyRepresentativeName && (
                      <p className="text-sm text-muted-foreground">
                        代表者:
                        {con.companyRepresentativeName}
                      </p>
                    )}
                  </div>

                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {con.companyPrefecture}
                    {con.companyCity}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {(con.constructionTypes ?? []).slice(0, 3).map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {(con.constructionTypes?.length ?? 0) > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{con.constructionTypes!.length - 3}
                      </Badge>
                    )}
                  </div>

                  {con.workScope && (
                    <div className="text-sm text-muted-foreground">
                      <p className="line-clamp-2">{con.workScope}</p>
                      <Link
                        href={path.enterprise.order.constructors.detail({
                          id: con.id,
                        })}
                        className="mt-1 inline-block text-primary underline-offset-2 hover:underline"
                        aria-label={`${con.companyName} の詳細を読む`}
                      >
                        続きを読む
                      </Link>
                    </div>
                  )}

                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {con.companyEmail && (
                        <a
                          href={`mailto:${con.companyEmail}`}
                          className="flex items-center hover:text-foreground"
                          aria-label="メールで問い合わせ"
                        >
                          <Mail className="mr-1 h-3 w-3" />
                          <span>{con.companyEmail}</span>
                        </a>
                      )}
                      {con.companyPhone && (
                        <a
                          href={`tel:${con.companyPhone}`}
                          className="flex items-center hover:text-foreground"
                          aria-label="電話をかける"
                        >
                          <Phone className="mr-1 h-3 w-3" />
                          <span>{con.companyPhone}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        size="sm"
                        aria-label={`${con.companyName} の詳細を見る`}
                      >
                        <Link
                          href={path.enterprise.order.constructors.detail({
                            id: con.id,
                          })}
                        >
                          詳細を見る
                        </Link>
                      </Button>
                      {con.companyEmail && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          aria-label={`${con.companyName} に問い合わせ`}
                        >
                          <a href={`mailto:${con.companyEmail}`}>問い合わせ</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
