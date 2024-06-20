export type InfiniteScrollData<Page = unknown, PageParams = unknown> = {
  pages: Page[];
  pageParams: PageParams[];
};

export type PageData<T> = {
  content: T[];
  hasNextPage: boolean;
  nextCursor: number;
};
