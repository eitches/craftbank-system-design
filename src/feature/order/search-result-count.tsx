export const SearchResultCount = ({ count }: { count: number }) => (
  <div className="text-sm self-end flex gap-1 pb-4">
    <strong>{count}</strong>
    <span>件の検索結果</span>
  </div>
);
