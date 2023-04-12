import { type VariantProps as RawVariantProps } from "cva";
export { cva, cx } from "cva"

type RemoveNull<T> = { [P in keyof T]: Partial<NonNullable<T[P]>>; };
export type VariantProps<T extends (...args: any) => any> = RemoveNull<RawVariantProps<T>>