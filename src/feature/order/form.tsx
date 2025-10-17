"use client";

import { Button } from "@/component/ui/button/button";
import { Checkbox } from "@/component/ui/checkbox/checkbox";
import { Input } from "@/component/ui/input/input";
import { Label } from "@/component/ui/label/label";
import {
  errorNotifier,
  successNotifier,
} from "@/component/ui/notifier/notifier";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select/select";
import { Textarea } from "@/component/ui/textarea/textarea";
import { useNavigation } from "@/navi/hooks/useNavigation";
import { path } from "@/navi/path";
import { type SubmissionResult, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  ContractorPositionMap,
  PaymentDateMap,
  PaymentDueMonthMap,
} from "@/api/repository/order/order-repository";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { type OrderFormSchema, orderFormSchema } from "./schema";
import type { ConstructionType, Prefecture, PropertyType } from "./types";

const CONTRACTOR_POSITION_LABEL = {
  [ContractorPositionMap.PRIME_CONTRACTOR]: "元請け",
  [ContractorPositionMap.FIRST_SUB_CONTRACTOR]: "一次請け",
  [ContractorPositionMap.SECOND_SUB_CONTRACTOR]: "二次請け",
  [ContractorPositionMap.THIRD_SUB_CONTRACTOR]: "三次請け",
};

const PAYMENT_DATE_LABEL = {
  [PaymentDateMap.NEGOTIABLE]: "要相談",
  [PaymentDateMap.FIVE_DAY]: "5日",
  [PaymentDateMap.TEN_DAY]: "10日",
  [PaymentDateMap.FIFTEEN_DAY]: "15日",
  [PaymentDateMap.TWENTY_DAY]: "20日",
  [PaymentDateMap.TWENTY_FIVE_DAY]: "25日",
  [PaymentDateMap.END_OF_MONTH]: "末日",
};
const PAYMENT_MONTH_LABEL = {
  [PaymentDueMonthMap.NEGOTIABLE]: "応相談",
  [PaymentDueMonthMap.THIS_MONTH]: "当月",
  [PaymentDueMonthMap.NEXT_MONTH]: "翌月",
  [PaymentDueMonthMap.AFTER_NEXT_MONTH]: "翌々月",
};

// biome-ignore lint/complexity/noBannedTypes: API連携で型が決まったら実装。編集画面用
type DefaultOrder = {};

export const OrderForm = <T extends SubmissionResult>({
  prefectures,
  constructionTypes,
  propertyTypes,
  defaultValue,
  submit,
}: {
  prefectures: Prefecture[];
  constructionTypes: ConstructionType[];
  propertyTypes: PropertyType[];
  defaultValue?: DefaultOrder;
  submit: (state_: T | undefined, formData: FormData) => Promise<T>;
}) => {
  const router = useNavigation();

  const submitter = async (state: T | undefined, formData: FormData) => {
    const result = await submit(state, formData);

    if (result?.status === "success") {
      successNotifier("発注を登録しました", {
        position: "top-center",
      });
      router.push(path.enterprise.job.list());
      return;
    }

    if (result?.status === "error") {
      errorNotifier("発注の登録に失敗しました", {
        position: "top-center",
      });
    }

    return result;
  };

  const [state, submitAction, isSubmitting] = useActionState(
    submitter,
    undefined,
  );

  const [form, fields] = useForm<OrderFormSchema>({
    lastResult: state,
    constraint: getZodConstraint(orderFormSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: orderFormSchema });
    },
  });

  // エラーや前回送信した値を含むすべての状態をクリアしてしまうため、プログレッシブ・エンハンスメントの設定が壊れてしまう
  // 参考: https://github.com/edmundhung/conform/issues/681#issuecomment-2174388025
  useEffect(() => {
    const preventDefault = (event: Event) => {
      if (event.target === document.forms.namedItem(form.id)) {
        event.preventDefault();
      }
    };

    document.addEventListener("reset", preventDefault, true);

    return () => {
      document.removeEventListener("reset", preventDefault, true);
    };
  }, [form.id]);

  return (
    <form id={form.id} action={submitAction} className="flex flex-col gap-6">
      <div className="space-y-2">
        <RequiredLabel htmlFor="title" label="発注名" />
        <Input
          id="title"
          name="title"
          placeholder="例: 渋谷商業ビル新築工事"
          defaultValue={fields.title.value}
          className="text-sm"
        />
        {fields.title.errors && (
          <p className="text-sm text-destructive">{fields.title.errors}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">概要</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="発注の詳細、必要な資格、条件などを記入してください"
          rows={6}
          defaultValue={fields.description.value}
          className="text-sm"
        />
        {fields.description.errors && (
          <p className="text-sm text-destructive">
            {fields.description.errors}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="propertyTypeId" label="物件種別" />
        <Select name="propertyTypeId">
          <SelectTrigger>
            <SelectValue placeholder="物件種別を選択" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.id} value={type.name}>
                {type.name}
              </SelectItem>
            ))}
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
          <RequiredLabel htmlFor="prefectureId" label="都道府県" />
          <Select name="prefectureId">
            <SelectTrigger>
              <SelectValue placeholder="都道府県を選択" />
            </SelectTrigger>
            <SelectContent>
              {prefectures.map((pref) => (
                <SelectItem key={pref.id} value={pref.name}>
                  {pref.name}
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
          <RequiredLabel htmlFor="city" label="市区町村" />
          <Input
            id="city"
            name="city"
            placeholder="渋谷区"
            defaultValue={fields.city.value}
            className="text-sm"
          />
          {fields.city.errors && (
            <p className="text-sm text-destructive">{fields.city.errors}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="constructionTypeId" label="必要工種" />
        <Select name="constructionTypeId">
          <SelectTrigger>
            <SelectValue placeholder="工種を選択" />
          </SelectTrigger>
          <SelectContent>
            {constructionTypes.map((type) => (
              <SelectItem key={type.id} value={type.name}>
                {type.name}
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
          <Label htmlFor="laborBudget">予算（万円）</Label>
          <Input
            id="laborBudget"
            name="laborBudget"
            type="number"
            placeholder="10000000"
            className="text-sm"
          />
          {fields.laborBudget?.errors && (
            <p className="text-sm text-destructive">
              {fields.laborBudget.errors}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimateBudget">概算見積（円）</Label>
          <Input
            id="estimateBudget"
            name="estimateBudget"
            type="number"
            placeholder="1500"
            className="text-sm"
          />
          <p className="text-xs text-muted-foreground">
            任意: 概算見積（例: 1500 は 1,500,000 円）
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="constructionStartDate">工期開始日</Label>
          <Input
            id="constructionStartDate"
            name="constructionStartDate"
            type="date"
            className="text-sm"
          />
          {fields.constructionStartDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.constructionStartDate.errors}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="constructionEndDate">工期終了日</Label>
          <Input
            id="constructionEndDate"
            name="constructionEndDate"
            type="date"
            className="text-sm"
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
          <Label htmlFor="applicationStartDate">募集開始日</Label>
          <Input
            id="applicationStartDate"
            name="applicationStartDate"
            type="date"
            className="text-sm"
          />
          {fields.applicationStartDate?.errors && (
            <p className="text-sm text-destructive">
              {fields.applicationStartDate.errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicationEndDate">募集終了日</Label>
          <Input
            id="applicationEndDate"
            name="applicationEndDate"
            type="date"
            className="text-sm"
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
          <Label htmlFor="contractorPosition">掲載者ポジション</Label>
          <Select name="contractorPosition">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ContractorPositionMap).map((position) => (
                <SelectItem key={position} value={position}>
                  {CONTRACTOR_POSITION_LABEL[position]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fields.contractorPosition?.errors && (
            <p className="text-sm text-destructive">
              {fields.contractorPosition.errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentClosingDate">支払い締め日</Label>
          <Select name="paymentClosingDate">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PaymentDateMap).map((date) => (
                <SelectItem key={date} value={date}>
                  {PAYMENT_DATE_LABEL[date]}
                </SelectItem>
              ))}
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
          <Label htmlFor="paymentDueMonth">支払いサイト（月）</Label>
          <Select name="paymentDueMonth">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PaymentDueMonthMap).map((month) => (
                <SelectItem key={month} value={month}>
                  {PAYMENT_MONTH_LABEL[month]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fields.paymentDueMonth?.errors && (
            <p className="text-sm text-destructive">
              {fields.paymentDueMonth.errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentDueDate">支払いサイト（日）</Label>
          <Select name="paymentDueDate">
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PaymentDateMap).map((date) => (
                <SelectItem key={date} value={date}>
                  {PAYMENT_DATE_LABEL[date]}
                </SelectItem>
              ))}
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
          <Label>
            <Checkbox name="canPayBeforeStart" className="h-4 w-4" />
            着工前支払い可
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workScope">業務範囲（任意）</Label>
        <Textarea
          id="workScope"
          name="workScope"
          placeholder="例: 電気工事、管工事、内装工事の協力会社募集"
          className="text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredLicensesCertification">
          必要な資格・免許（任意）
        </Label>
        <Textarea
          name="requiredLicensesCertification"
          placeholder="例: 第一種電気工事士"
          className="text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredInsuranceCoverage">必要な保険（任意）</Label>
        <Textarea
          name="requiredInsuranceCoverage"
          placeholder="例: 労災保険、賠償責任保険"
          className="text-sm"
        />
      </div>

      <div className="flex gap-4 self-end pt-4">
        <Button type="button" variant="outline" asChild className="w-[100px]">
          <Link href={path.enterprise.order.list()}>キャンセル</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting} className="w-[100px]">
          {isSubmitting ? (
            <LoaderCircle className="animate-spin w-full" />
          ) : (
            "発注を登録"
          )}
        </Button>
      </div>
    </form>
  );
};

const RequiredLabel = ({
  htmlFor,
  label,
}: {
  htmlFor: string;
  label: string;
}) => (
  <div className="flex">
    <Label htmlFor={htmlFor}>{label}</Label>
    <span className="ml-1 text-xs text-destructive">*</span>
  </div>
);
