# Query

## SSOT

1. 모든 서버 상태는 QueryProvider에서 관리합니다.
   1. 상태 - data : key는 queryKey를, value에는 이 queryKey에 해당하는 서버 데이터를 저장합니다. 이 데이터는 서버 데이터가 변경되면 자동으로 업데이트됩니다.
   2. 상태 - status : key는 queryKey를, value에는 이 queryKey에 해당하는 서버 데이터의 상태를 저장합니다. 이 상태는 서버 상태가 변경되면 자동으로 업데이트됩니다. 상태는 "idle" | "loading" | "success" | "error" 4가지 상태를 가질 수 있습니다.
2. QueryProvider에서는 Context API를 사용해 하위 컴포넌트에서 서버 상태에 접근할 수 있도록 합니다.

```ts
// data
{
  cartItems:{
    content: CartItem[],
    totalElements: number,
    totalPages: number,
    // ..
  },
  products: {
    content: Product[],
    // ..
  },
  // ..
}
```

## useQuery / useMutation

1. 사용자는 QueryProivder의 함수에 직접 접근하지 않고, useQuery와 useMutation훅을 통해 서버 상태를 불러오고, 서버 상태를 변경할 수 있습니다.

### 1. useQuery

```ts
const { data: products, status: productsStatus } = useQuery({
  queryFn: ProductApi.getAllProducts,
  queryKey: "products",
});
```

1. useQuery는 서버 데이터를 불러오는 훅입니다.
2. 인자로 전달받은 queryFn를 호출여 queryKey에 해당하는 서버 데이터를 불러옵니다.
3. 만약 캐싱된 데이터가 있다면 캐싱된 데이터를 반환합니다. 캐싱된 데이터는 QueryProvider의 data를 통해 체크합니다.

   ```ts
   const { getQueryData, setQueryStatus } = useQueryClient();
   const fetchData = async (forceFetch = false) => {
     if (getQueryData(queryKey) && !forceFetch) {
       setQueryStatus(queryKey, "success");
       return;
     }
     // ..
   // ..

   ```

4. 만약 이미 데이터를 호출 중이라면, 해당 Promise를 활용합니다.
   ```ts
   let promise = getQueryPromise(queryKey);
   ```
   이 promise는 `QueryPromises.ts`파일에서 queryPromise 객체로 관리를 합니다.

### 2. useMutation

```ts
const { mutate: mutatePostCartItem } = useMutation<PostCartItemsParams, void, GetCartItemsResponse>({
  mutationFn: CartItemApi.postCartItems,
  queryKey: "cartItems",
});
```

1. useMutation은 서버 데이터를 변경하는 훅입니다.
2. 인자로 전달받은 mutationFn를 호출해 서버 데이터를 변경합니다.
3. useMutation이 반환하는 mutate 함수는 서버 데이터를 변경합니다.
4. 만약 낙관적 업데이트가 필요하다면 mutate의 두 번째 인자로 낙관적 업데이트를 할 수 있습니다.
