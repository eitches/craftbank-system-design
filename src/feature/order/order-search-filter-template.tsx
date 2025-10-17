import type { ReactElement } from "react";

export const OrderSearchFilterTemplate = ({
  title,
  description,
  searchFilter,
  children,
}: {
  title: string;
  description: string;
  searchFilter: ReactElement;
  children: ReactElement;
}) => (
  <div className="flex min-h-screen flex-col">
    <div className="flex-1 py-10">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1 pt-9">{searchFilter}</div>
          {children}
        </div>
      </div>
    </div>
  </div>
);
