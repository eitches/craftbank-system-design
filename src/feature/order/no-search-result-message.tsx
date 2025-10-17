import { Card, CardContent } from "@/component/ui/card/card";

export const NoSearchResultMessage = ({ title }: { title: string }) => (
  <div className="lg:col-span-3 flex flex-col gap-4">
    <Card>
      <CardContent className="py-12 text-center">
        <div className="mx-auto max-w-md text-left">
          <div>
            <p>該当する{title}が見つかりません</p>
            <p>条件を変更するか、キーワードを調整して再検索してください。</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
