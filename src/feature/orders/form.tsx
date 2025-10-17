"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/component/ui/button/button";
import { Input } from "@/component/ui/input/input";
import { Label } from "@/component/ui/label/label";
import { Textarea } from "@/component/ui/textarea/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select/select";
import { Separator } from "@/component/ui/separator/separator";
import {
  createOrder,
  type CreateOrderInput,
} from "@/app/repository/orders-repository";
import type { Prefecture, ConstructionType } from "@/app/repository/types";

const orderSchema = z.object({
  title: z.string().min(5, "タイトルは5文字以上で入力してください"),
  description: z.string().min(20, "詳細説明は20文字以上で入力してください"),
  prefectureId: z.string().min(1, "都道府県を選択してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  propertyTypeId: z.string().min(1, "物件種別を選択してください"),
  constructionTypeId: z.string().min(1, "工種を選択してください"),
  laborBudget: z.string().min(1, "予算を入力してください"),
  estimateBudget: z.string().optional(),
  constructionStartDate: z.string().min(1, "工期開始日を入力してください"),
  constructionEndDate: z.string().min(1, "工期終了日を入力してください"),
  applicationStartDate: z.string().min(1, "募集開始日を入力してください"),
  applicationEndDate: z.string().min(1, "募集終了日を入力してください"),
  contractorPosition: z.string().min(1, "請負階層を選択してください"),
  paymentClosingDate: z.string().min(1, "支払い締め日を選択してください"),
  paymentDueMonth: z.string().min(1, "支払いサイト（月）を選択してください"),
  paymentDueDate: z.string().min(1, "支払いサイト（日）を選択してください"),
  canPayBeforeStart: z.string().optional(),
  workScope: z.string().optional(),
  requiredLicensesCertification: z.string().optional(),
  requiredInsuranceCoverage: z.string().optional(),
});

export const OrderCreateForm = ({
  prefectures,
  constructionTypes,
}: {
  prefectures: Prefecture[];
  constructionTypes: ConstructionType[];
}) => {
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: orderSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    async onSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      try {
        const formEl = event.currentTarget as HTMLFormElement;
        const formData = new FormData(formEl);

        const getStr = (key: string) => {
          const v = formData.get(key);
          return (typeof v === "string" ? v : "") as string;
        };

        const toDate = (v: string) => (v ? new Date(v) : null);
        const toNum = (v: string) => (v ? Number(v) : null);

        const input: CreateOrderInput = {
          enterpriseId: "1",
          title: getStr("title"),
          prefectureId: getStr("prefectureId"),
          city: getStr("city"),
          propertyTypeId: getStr("propertyTypeId"),
          constructionTypeId: getStr("constructionTypeId"),
          description: getStr("description") || null,
          laborBudget: toNum(getStr("laborBudget")),
          estimateBudget: toNum(getStr("estimateBudget")),
          constructionStartDate: toDate(getStr("constructionStartDate")),
          constructionEndDate: toDate(getStr("constructionEndDate")),
          applicationStartDate: toDate(getStr("applicationStartDate")),
          applicationEndDate: toDate(getStr("applicationEndDate")),
          contractorPosition: (getStr("contractorPosition") || null) as any,
          paymentClosingDate: (getStr("paymentClosingDate") || null) as any,
          paymentDueMonth: (getStr("paymentDueMonth") || null) as any,
          paymentDueDate: (getStr("paymentDueDate") || null) as any,
          canPayBeforeStart: formData.get("canPayBeforeStart") ? true : false,
          workScope: getStr("workScope") || null,
          requiredLicensesCertification:
            getStr("requiredLicensesCertification") || null,
          requiredInsuranceCoverage:
            getStr("requiredInsuranceCoverage") || null,
        };

        await createOrder(input);
        router.push("/orders");
      } catch (error) {
        // no-op; could add toast
      }
    },
  });

  return (
    <form {...form.props} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">
          発注名 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="例: 渋谷商業ビル新築工事"
          defaultValue={fields.title.value}
        />
        {fields.title.errors && (
          <p className="text-sm text-destructive">{fields.title.errors}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          詳細説明 <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="発注の詳細、必要な資格、条件などを記入してください"
          rows={6}
          defaultValue={fields.description.value}
        />
        {fields.description.errors && (
          <p className="text-sm text-destructive">
            {fields.description.errors}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyTypeId">
          物件種別 <span className="text-destructive">*</span>
        </Label>
        <Select name="propertyTypeId">
          <SelectTrigger>
            <SelectValue placeholder="物件種別を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">住宅</SelectItem>
            <SelectItem value="commercial">商業施設</SelectItem>
            <SelectItem value="industrial">工場・倉庫</SelectItem>
            <SelectItem value="civil">土木</SelectItem>
          </SelectContent>
        </Select>
        {fields.propertyTypeId?.errors && (
          <p className="text-sm text-destructive">
            {fields.propertyTypeId.errors}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="prefectureId">
            都道府県 <span className="text-destructive">*</span>
          </Label>
          <Select name="prefectureId">
            <SelectTrigger>
              <SelectValue placeholder="都道府県を選択" />
            </SelectTrigger>
            <SelectContent>
              {prefectures.map((pref) => (
                <SelectItem key={pref} value={pref}>
                  {pref}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fields.prefectureId?.errors && (
            <p className="text-sm text-destructive">
              {fields.prefectureId.errors}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">
            市区町村 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            placeholder="渋谷区"
            defaultValue={fields.city.value}
          />
          {fields.city.errors && (
            <p className="text-sm text-destructive">{fields.city.errors}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="constructionTypeId">
          必要工種 <span className="text-destructive">*</span>
        </Label>
        <Select name="constructionTypeId">
          <SelectTrigger>
            <SelectValue placeholder="工種を選択" />
          </SelectTrigger>
          <SelectContent>
            {constructionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fields.constructionTypeId?.errors && (
          <p className="text-sm text-destructive">
            {fields.constructionTypeId.errors}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="laborBudget">
            予算（円） <span className="text-destructive">*</span>
          </Label>
          <Input
            id="laborBudget"
            name="laborBudget"
            type="number"
            placeholder="10000000"
          />
          {fields.laborBudget?.errors && (
            <p className="text-sm text-destructive">
              {fields.laborBudget.errors}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimateBudget">概算見積（千円単位）</Label>
          <Input
            id="estimateBudget"
            name="estimateBudget"
            type="number"
            placeholder="1500"
          />
          <p className="text-xs text-muted-foreground">
            任意: 概算見積（例: 1500 は 1,500,000 円）
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="constructionStartDate">
            工期開始日 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="constructionStartDate"
            name="constructionStartDate"
            type="date"
          />
          {fields.constructionStartDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.constructionStartDate.errors}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="constructionEndDate">
            工期終了日 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="constructionEndDate"
            name="constructionEndDate"
            type="date"
          />
          {fields.constructionEndDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.constructionEndDate.errors}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="applicationStartDate">
            募集開始日 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="applicationStartDate"
            name="applicationStartDate"
            type="date"
          />
          {fields.applicationStartDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.applicationStartDate.errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicationEndDate">
            募集終了日 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="applicationEndDate"
            name="applicationEndDate"
            type="date"
          />
          {fields.applicationEndDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.applicationEndDate.errors}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contractorPosition">
            請負階層 <span className="text-destructive">*</span>
          </Label>
          <Select name="contractorPosition">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PRIME_CONTRACTOR">元請け</SelectItem>
              <SelectItem value="FIRST_SUB_CONTRACTOR">一次請け</SelectItem>
              <SelectItem value="SECOND_SUB_CONTRACTOR">二次請け</SelectItem>
              <SelectItem value="THIRD_SUB_CONTRACTOR">三次請け</SelectItem>
            </SelectContent>
          </Select>
          {fields.contractorPosition?.errors && (
            <p className="text-sm text-destructive">
              {fields.contractorPosition.errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentClosingDate">
            支払い締め日 <span className="text-destructive">*</span>
          </Label>
          <Select name="paymentClosingDate">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEGOTIABLE">応相談</SelectItem>
              <SelectItem value="FIVE_DAY">5日</SelectItem>
              <SelectItem value="TEN_DAY">10日</SelectItem>
              <SelectItem value="FIFTEEN_DAY">15日</SelectItem>
              <SelectItem value="TWENTY_DAY">20日</SelectItem>
              <SelectItem value="TWENTY_FIVE_DAY">25日</SelectItem>
              <SelectItem value="END_OF_MONTH">月末</SelectItem>
            </SelectContent>
          </Select>
          {fields.paymentClosingDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.paymentClosingDate.errors}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="paymentDueMonth">
            支払いサイト（月） <span className="text-destructive">*</span>
          </Label>
          <Select name="paymentDueMonth">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEGOTIABLE">応相談</SelectItem>
              <SelectItem value="THIS_MONTH">当月</SelectItem>
              <SelectItem value="NEXT_MONTH">翌月</SelectItem>
              <SelectItem value="AFTER_NEXT_MONTH">翌々月</SelectItem>
            </SelectContent>
          </Select>
          {fields.paymentDueMonth?.errors && (
            <p className="text-sm text-destructive">
              {fields.paymentDueMonth.errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentDueDate">
            支払いサイト（日） <span className="text-destructive">*</span>
          </Label>
          <Select name="paymentDueDate">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEGOTIABLE">応相談</SelectItem>
              <SelectItem value="FIVE_DAY">5日</SelectItem>
              <SelectItem value="TEN_DAY">10日</SelectItem>
              <SelectItem value="FIFTEEN_DAY">15日</SelectItem>
              <SelectItem value="TWENTY_DAY">20日</SelectItem>
              <SelectItem value="TWENTY_FIVE_DAY">25日</SelectItem>
              <SelectItem value="END_OF_MONTH">月末</SelectItem>
            </SelectContent>
          </Select>
          {fields.paymentDueDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.paymentDueDate.errors}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <input
            id="canPayBeforeStart"
            name="canPayBeforeStart"
            type="checkbox"
            className="h-4 w-4"
          />
          <Label htmlFor="canPayBeforeStart">着工前支払い可</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workScope">業務範囲（任意）</Label>
        <Textarea
          id="workScope"
          name="workScope"
          placeholder="例: 電気工事、管工事、内装工事の協力会社募集"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredLicensesCertification">
          必要な資格・免許（任意）
        </Label>
        <Textarea
          id="requiredLicensesCertification"
          name="requiredLicensesCertification"
          placeholder="例: 第一種電気工事士"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredInsuranceCoverage">必要な保険（任意）</Label>
        <Textarea
          id="requiredInsuranceCoverage"
          name="requiredInsuranceCoverage"
          placeholder="例: 労災保険、賠償責任保険"
        />
      </div>

      <Separator className="my-6" />
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" asChild>
          <Link href="/orders">キャンセル</Link>
        </Button>
        <Button type="submit">発注を登録</Button>
      </div>
    </form>
  );
};

export default OrderCreateForm;
