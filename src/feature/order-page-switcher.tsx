import Link from "next/link";
import { Button } from "@/component/ui/button/button";

// Shared centered switcher (RSC)
export default function OrderPageSwitcher() {
  return (
    <div className="border-b bg-muted/40">
      <div className="container mx-auto max-w-4xl px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button asChild variant="outline">
            <Link href="/orders">発注を探す</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/constructors">建設会社を探す</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/orders/new">発注を登録</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
