import { OrderDetail } from "@/feature/order/detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: orderId } = await params;

  return <OrderDetail orderId={orderId} />;
}
