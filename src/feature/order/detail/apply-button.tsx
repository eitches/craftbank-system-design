"use client";

import { Button } from "@/component/ui/button/button";
import { applyToOrder } from "./server/apply-order";

export const OrderApplyButton = ({ orderId }: { orderId: string }) => (
  <Button
    type="button"
    onClick={() => applyToOrder(orderId)}
    className="my-4 w-24 self-center"
  >
    応募する
  </Button>
);
