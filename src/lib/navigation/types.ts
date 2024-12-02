import { pathnames } from "@/lib/navigation/config";

export type PathnamesKeys = keyof typeof pathnames;
export type PathnameValues = {
  [K in PathnamesKeys]: (typeof pathnames)[K] extends string ? string : keyof (typeof pathnames)[K];
};
export type ValidPathnames = PathnamesKeys;
