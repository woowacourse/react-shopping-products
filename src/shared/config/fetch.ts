export const FETCH_TYPES = {
  START: "START",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

export type FetchType = (typeof FETCH_TYPES)[keyof typeof FETCH_TYPES];
