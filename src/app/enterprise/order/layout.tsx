import { OrderPageSwitcher } from "@/feature/order/order-page-switcher";
import type { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex flex-col">
      <OrderPageSwitcher />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
