import { OrderConstructorDetail } from "@/feature/order/constructor/detail";

export default async function ConstructorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: constructorId } = await params;

  return <OrderConstructorDetail constructorId={constructorId} />;
}
