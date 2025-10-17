"use server";

import { createOrder } from "@/api/repository/order/order-repository";
import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { orderFormSchema } from "../../schema";

export const createOrderAction = async (
  _: SubmissionResult<string[]> | undefined,
  formData: FormData,
) => {
  const submission = parseWithZod(formData, {
    schema: orderFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const values = submission.value;

  try {
    const enterpriseId = "1";

    await createOrder({
      enterpriseId,
      title: values.title,
      description: values.description,
      prefectureId: values.prefectureId,
      city: values.city,
      propertyTypeId: values.propertyTypeId,
      constructionTypeId: values.constructionTypeId,
      laborBudget: values.laborBudget,
      estimateBudget: values.estimateBudget,
      constructionStartDate: values.constructionStartDate
        ? new Date(values.constructionStartDate)
        : undefined,
      constructionEndDate: values.constructionEndDate
        ? new Date(values.constructionEndDate)
        : undefined,
      applicationStartDate: values.applicationStartDate
        ? new Date(values.applicationStartDate)
        : undefined,
      applicationEndDate: values.applicationEndDate
        ? new Date(values.applicationEndDate)
        : undefined,
      contractorPosition: values.contractorPosition,
      paymentClosingDate: values.paymentClosingDate,
      paymentDueMonth: values.paymentDueMonth,
      paymentDueDate: values.paymentDueDate,
      canPayBeforeStart: values.canPayBeforeStart,
      workScope: values.workScope,
      requiredLicensesCertification: values.requiredLicensesCertification,
      requiredInsuranceCoverage: values.requiredInsuranceCoverage,
    });

    return submission.reply();
  } catch (error) {
    console.error("発注登録に失敗しました", error);

    return submission.reply({
      formErrors: ["発注登録に失敗しました。時間をおいて再度お試しください。"],
    });
  }
};
