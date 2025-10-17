"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/component/ui/button/button";
import { Input } from "@/component/ui/input/input";
import { Label } from "@/component/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card/card";
import { Prefecture, ConstructionType } from "@/app/repository/types";

export function ConstructorFilters({
  prefectures,
  constructionTypes,
}: {
  prefectures: Prefecture[];
  constructionTypes: ConstructionType[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState<string>("");
  const [prefecture, setPrefecture] = useState<string>();
  const [constructionType, setConstructionType] = useState<string>();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    const setOrDelete = (key: string, value?: string) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    };

    setOrDelete("keyword", keyword);
    setOrDelete("prefecture", prefecture);
    setOrDelete("constructionType", constructionType);

    const query = params.toString();
    router.push(query ? `/constructors?${query}` : "/constructors");
  };

  const handleReset = () => {
    setKeyword("");
    setPrefecture(undefined);
    setConstructionType(undefined);
    router.push("/constructors");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2 h-5 w-5" />
          企業を検索
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="keyword">キーワード</Label>
          <Input
            id="keyword"
            placeholder="企業名で検索"
            value={keyword}
            onChange={(e) => {
              const v = e.target.value;
              setKeyword(v);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prefecture">都道府県</Label>
          <Select value={prefecture} onValueChange={setPrefecture}>
            <SelectTrigger>
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {prefectures.map((pref) => (
                <SelectItem key={pref} value={pref}>
                  {pref}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="constructionType">工種</Label>
          <Select value={constructionType} onValueChange={setConstructionType}>
            <SelectTrigger>
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {constructionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            検索
          </Button>
          <Button onClick={handleReset} variant="outline">
            リセット
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
