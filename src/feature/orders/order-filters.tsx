import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/component/ui/button/button";
import { Input } from "@/component/ui/input/input";
import { Label } from "@/component/ui/label/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card/card";
import { prefectures } from "@/app/repository/prefecture-repository";
import { constructionTypes } from "@/app/repository/construction-type-repository";

interface OrderFiltersProps {
  initialKeyword?: string;
  initialPrefecture?: string;
  initialConstructionType?: string;
}

export function OrderFilters({
  initialKeyword = "",
  initialPrefecture = "",
  initialConstructionType = "",
}: OrderFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2 h-5 w-5" />
          発注を検索
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form method="GET" action="/orders" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyword">キーワード</Label>
            <Input
              id="keyword"
              name="keyword"
              placeholder="発注名や詳細で検索"
              defaultValue={initialKeyword ?? ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prefecture">都道府県</Label>
            <div className="relative">
              <select
                id="prefecture"
                name="prefecture"
                defaultValue={initialPrefecture ?? "all"}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">すべて</option>
                {prefectures.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="constructionType">工種</Label>
            <div className="relative">
              <select
                id="constructionType"
                name="constructionType"
                defaultValue={initialConstructionType ?? "all"}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">すべて</option>
                {constructionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              検索
            </Button>
            <Button asChild variant="outline">
              <Link href="/orders">リセット</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
