import { Button } from "@/component/ui/button/button";
import { Link } from "@/component/ui/link/Link";
import { path } from "@/navi/path";

const Page = async () => {
  return (
    <div className="h-full flex items-center justify-center p-60">
      <Button asChild variant="outline">
        <Link
          href={path.enterprise.order.list()}
          className="text-lg text-black"
        >
          /enterprise/orderへのパス
        </Link>
      </Button>
    </div>
  );
};

export default Page;
