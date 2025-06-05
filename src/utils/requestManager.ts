const ongoingRequests = new Map<string, Promise<unknown>>();

export const requestManager = {
  async execute<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existingRequest = ongoingRequests.get(key);
    if (existingRequest) {
      return existingRequest as Promise<T>;
    }

    const newRequest = fetcher().finally(() => {
      ongoingRequests.delete(key);
    });

    ongoingRequests.set(key, newRequest);

    return newRequest;
  },

  abort(key: string) {
    ongoingRequests.delete(key);
  },
};
