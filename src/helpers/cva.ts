import { type VariantProps as RawVariantProps, cva as _cva, cx as _cx } from "cva";
import { type ClassValue } from "cva/dist/types";
import { twMerge as _merge } from "tailwind-merge"

type CVA = typeof _cva
type RemoveNull<T> = { [P in keyof T]: Partial<NonNullable<T[P]>>; };
export type VariantProps<T extends (...args: any) => any> = RemoveNull<RawVariantProps<T>>

export const cva: CVA = (base, config) => (props) => _merge(_cva(base, config)(props))
export const cx = (...inputs: ClassValue[]) => _merge(_cx(inputs)) 
