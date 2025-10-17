import { path } from "@/navi/path";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      {/* ユーザーメニューボタンのpaddingの分だけ右に余白があるのでその分のpaddingを減らして調整している */}
      <header className="flex-shrink-0 h-16 pl-6 pr-2 shadow-[0px_2px_4px_0px_#00000040] flex items-center">
        <div className="flex items-center h-full gap-8">
          <Link
            href={path.enterprise.top()}
            className="flex items-center gap-4"
          >
            <span className="text-xl text-slate-600 tracking-[0.1em]">
              MONULL
            </span>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
