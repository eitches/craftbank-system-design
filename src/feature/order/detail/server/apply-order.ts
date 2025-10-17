"use server";

import { createApplication } from "@/api/repository/order/applications-repository";

export const applyToOrder = async (orderId: string) => {
  await createApplication(orderId);
};
