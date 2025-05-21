export const sortOptions = ["낮은 가격 순", "높은 가격 순"] as const;
export type SortOptionsKey = (typeof sortOptions)[number];

export const categoryOptions = ["전체", "식료품", "패션잡화"] as const;
export type CategoryOptionsKey = (typeof categoryOptions)[number];
