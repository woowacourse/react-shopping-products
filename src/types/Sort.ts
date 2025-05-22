type SortKey = "price" | "id";
type SortOrder = "desc" | "asc";

export type PriceSort = `${Extract<SortKey, "price">},${SortOrder}`;
