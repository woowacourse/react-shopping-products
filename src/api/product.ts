export default async function getProduct({ sortBy }: { sortBy: string }) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const params = new URLSearchParams({
    page: "0",
    size: "20",
    sort: sortBy,
  });

  return fetch(
    `${import.meta.env.VITE_BASE_URL}/products?${params.toString()}`,
    options
  ).then((res) => res.json());
}
