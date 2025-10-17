// { a: string, b: number } -> { a: string | undefined, b: number | undefined }
export type Undefinable<T> = {
  [P in keyof T]: T[P] | undefined;
};
