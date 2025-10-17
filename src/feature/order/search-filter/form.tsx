"use client";

import { Button } from "@/component/ui/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/component/ui/card/card";
import { Input } from "@/component/ui/input/input";
import { Label } from "@/component/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select/select";
import { useForm } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import { Search } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import z from "zod";

import { useNavigation } from "@/navi/hooks/useNavigation";
import { path } from "@/navi/path";
import type {
  ConstructionType,
  Prefecture,
  PropertyType,
  SearchQuery,
} from "../types";

const searchQuerySchema = z.object({
  keyword: z.string().optional(),
  prefectureId: z.string().optional(),
  constructionTypeId: z.string().optional(),
  propertyTypeId: z.string().optional(),
});

type SearchQueryForm = z.infer<typeof searchQuerySchema>;
type State = {
  status: "success" | "error" | undefined;
};

export const SearchFilterForm = ({
  query,
  title,
  placeholder,
  prefectures,
  constructionTypes,
  propertyTypes,
}: {
  query: SearchQuery;
  title: string;
  placeholder: string;
  prefectures: Prefecture[];
  constructionTypes: ConstructionType[];
  propertyTypes: PropertyType[];
}) => {
  const router = useNavigation();

  const submitter = async (_state: State | undefined, formData: FormData) => {
    const keyword = formData.get("keyword")?.toString();
    const prefectureId = formData.get("prefecture")?.toString();
    const constructionTypeId = formData.get("constructionTypeId")?.toString();
    const propertyTypeId = formData.get("propertyTypeId")?.toString();

    if (!keyword && !prefectureId && !constructionTypeId) {
      return {
        status: "error" as const,
      };
    }

    const searchParams = new URLSearchParams();

    if (keyword) {
      searchParams.set("keyword", keyword);
    }

    if (prefectureId) {
      searchParams.set("prefectureId", prefectureId);
    }

    if (constructionTypeId) {
      searchParams.set("constructionTypeId", constructionTypeId);
    }

    if (propertyTypeId) {
      searchParams.set("propertyTypeId", propertyTypeId);
    }

    router.push(
      path.enterprise.order.list({ searchParams: searchParams.toString() }),
    );

    return {
      status: "success" as const,
    };
  };

  const [state, submitAction, isSubmitting] = useActionState(
    submitter,
    undefined,
  );

  const [form, fields] = useForm<SearchQueryForm>({
    lastResult: state,
    constraint: getZodConstraint(searchQuerySchema),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onSubmit",
    defaultValue: query,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search />
          <p className="text-xl">{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id={form.id}
          action={submitAction}
          className="flex flex-col gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="keyword">キーワード</Label>
            <Input
              id="keyword"
              name="keyword"
              placeholder={placeholder}
              defaultValue={query.keyword}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prefecture">都道府県</Label>
            <Select name="prefecture" defaultValue={query.prefectureId}>
              <SelectTrigger>
                <SelectValue placeholder="都道府県を選択" />
              </SelectTrigger>
              <SelectContent>
                {prefectures.map((pref) => (
                  <SelectItem key={pref.id} value={pref.id}>
                    {pref.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="constructionTypeId">工種</Label>
            <Select
              name="constructionTypeId"
              defaultValue={query.constructionTypeId}
            >
              <SelectTrigger>
                <SelectValue placeholder="工種を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {constructionTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyTypeId">物件種別</Label>
            <Select name="propertyTypeId" defaultValue={query.propertyTypeId}>
              <SelectTrigger>
                <SelectValue placeholder="物件種別を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center gap-4">
            <Button type="submit" size="sm">
              <Search />
              検索
            </Button>
            <Button variant="outline" size="sm">
              <Link href={path.enterprise.order.list()}>リセット</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
