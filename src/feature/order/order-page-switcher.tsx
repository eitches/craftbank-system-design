"use client";

import { Button } from "@/component/ui/button/button";
import { path } from "@/navi/path";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const OrderPageSwitcher = () => {
  const pathname = usePathname();

  const data = [
    { label: "発注を探す", path: path.enterprise.order.list() },
    {
      label: "建設会社を探す",
      path: path.enterprise.order.constructors.list(),
    },
    { label: "発注を登録", path: path.enterprise.order.create() },
  ];

  return (
    <div className="container mx-auto pt-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {data.map((item) => (
          <Button
            key={item.label}
            asChild
            variant={pathname === item.path ? "default" : "outline"}
          >
            <Link href={item.path}>{item.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
