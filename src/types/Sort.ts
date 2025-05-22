type SortKey = "price" | "id";
type SortOrder = "desc" | "asc";

export type Sort = `${SortKey},${SortOrder}`;
