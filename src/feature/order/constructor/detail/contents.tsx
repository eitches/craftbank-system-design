import { getConstructor } from "@/api/repository/order/constructor-repository";
import { Avatar, AvatarFallback } from "@/component/ui/avatar/avatar";
import { Badge } from "@/component/ui/badge/badge";
import { Button } from "@/component/ui/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Link } from "@/component/ui/link/Link";
import { path } from "@/navi/path";
import { formatStringDateToJP } from "@/util/date";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

export const OrderConstructorDetailContents = async ({
  constructorId,
}: {
  constructorId: string;
}) => {
  const con = await getConstructor(constructorId);
  if (!con) {
    return <OrderConstructorDetailNotFound />;
  }

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-8">
            <Avatar className="size-32">
              <AvatarFallback>
                <Building2 className="size-16" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <div className="mb-2 flex flex-col items-center gap-2 md:flex-row">
                  <h1 className="text-3xl font-bold">{con.companyName}</h1>
                  {con.constructionBusinessLicenseName && (
                    <Badge variant="secondary" className="text-xs">
                      {con.constructionBusinessLicenseName}
                    </Badge>
                  )}
                </div>
                {con.companyRepresentativeName && (
                  <p className="text-lg text-muted-foreground">
                    代表者: {con.companyRepresentativeName}
                  </p>
                )}
              </div>

              <p className="flex items-center justify-center text-muted-foreground md:justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                {con.companyPrefecture} {con.companyCity} {con.companyAddress}
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                {con.companyEmail && (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={`mailto:${con.companyEmail}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      メールで問い合わせ
                    </a>
                  </Button>
                )}
                {con.companyPhone && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <a href={`tel:${con.companyPhone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      電話で問い合わせ
                    </a>
                  </Button>
                )}
                {con.companyUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <a
                      href={con.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      建設業者サイト
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
            {(con.constructionTypes ?? []).map((type) => (
              <Badge key={type} variant="outline" className="text-sm">
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {con.workScope && (
        <Card>
          <CardHeader>
            <CardTitle>対応できる業務範囲</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {con.workScope}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>建設業者情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <DetailRow label="設立日">
            {con.companyEstablishedAt
              ? formatStringDateToJP(con.companyEstablishedAt.toISOString())
              : "—"}
          </DetailRow>
          {/* サーバ側から単位付きで返す */}
          <DetailRow label="資本金">{con.companyCapital}</DetailRow>
          {/* サーバ側から単位付きで返す */}
          <DetailRow label="年間売上高">{con.companyAnnualRevenue}</DetailRow>
          <DetailRow label="加入保険">{con.insuranceCoverage}</DetailRow>
        </CardContent>
      </Card>

      {con.availableAreas && con.availableAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>対応可能エリア</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {con.availableAreas.map((area) => (
                <Badge key={area} variant="outline">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{children}</span>
  </div>
);

const OrderConstructorDetailNotFound = () => (
  <Card>
    <CardContent className="py-12 text-center">
      <p className="text-muted-foreground">建設業者が見つかりませんでした</p>
      <Button asChild className="mt-4">
        <Link href={path.enterprise.order.constructors.list()}>一覧に戻る</Link>
      </Button>
    </CardContent>
  </Card>
);
