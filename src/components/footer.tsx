import Link from 'next/link';
import { Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span className="text-lg font-bold">CraftBank</span>
            </div>
            <p className="text-sm text-muted-foreground">
              建設工事の受発注プラットフォーム
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">サービス</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                  発注を探す
                </Link>
              </li>
              <li>
                <Link href="/constructors" className="text-muted-foreground hover:text-foreground">
                  企業・職人を探す
                </Link>
              </li>
              <li>
                <Link href="/orders/new" className="text-muted-foreground hover:text-foreground">
                  発注を登録
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">お問い合わせ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CraftBank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}