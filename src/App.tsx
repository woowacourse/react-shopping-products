import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppLayout, ProductListLayout } from "@/layout";
import {
  Cart,
  Filter,
  Header,
  ProductList,
  ProductListTitle,
} from "@/components";
import type { ProductItem } from "./types";
import { getProducts } from "@/api/product";

function App() {
  const productList: ProductItem[] = [
    {
      id: 2,
      name: "나이키",
      price: 1000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
    {
      id: 3,
      name: "아디다스",
      price: 2000,
      imageUrl:
        "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
      category: "fashion",
    },
    {
      id: 10,
      name: "퓨마",
      price: 10000,
      imageUrl:
        "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
      category: "fashion",
    },
    {
      id: 11,
      name: "리복",
      price: 20000,
      imageUrl:
        "https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg",
      category: "fashion",
    },
    {
      id: 12,
      name: "컨버스",
      price: 20000,
      imageUrl:
        "https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg",
      category: "fashion",
    },
    {
      id: 21,
      name: "나이키",
      price: 20000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
    {
      id: 34,
      name: "코카콜라",
      price: 10000,
      imageUrl:
        "https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg",
      category: "beverage",
    },
    {
      id: 35,
      name: "스마트폰",
      price: 950000,
      imageUrl:
        "https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 36,
      name: "노트북",
      price: 1500000,
      imageUrl:
        "https://images.unsplash.com/photo-1647503380147-e075b24f4cbe?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 37,
      name: "헤드폰",
      price: 200000,
      imageUrl:
        "https://images.unsplash.com/photo-1638740396066-e5186f6dd452?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 38,
      name: "스마트워치",
      price: 350000,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1686069040492-1ac799fd3b01?q=80&w=3300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 39,
      name: "태블릿",
      price: 400000,
      imageUrl:
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 40,
      name: "카메라",
      price: 600000,
      imageUrl:
        "https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 41,
      name: "게임콘솔",
      price: 500000,
      imageUrl:
        "https://images.unsplash.com/photo-1647503380147-e075b24f4cbe?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 42,
      name: "블루투스스피커",
      price: 150000,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1686069040492-1ac799fd3b01?q=80&w=3300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 43,
      name: "모니터",
      price: 300000,
      imageUrl:
        "https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 44,
      name: "외장하드",
      price: 100000,
      imageUrl:
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 45,
      name: "전자책리더기",
      price: 200000,
      imageUrl:
        "https://images.unsplash.com/photo-1647503380147-e075b24f4cbe?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 46,
      name: "휴대용충전기",
      price: 50000,
      imageUrl:
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
    {
      id: 47,
      name: "무선마우스",
      price: 50000,
      imageUrl:
        "https://images.unsplash.com/photo-1638740396066-e5186f6dd452?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "electronics",
    },
  ];

  const {
    data,
    // error,
    // fetchNextPage,
    // hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: () => 1,
  });

  console.log(data);

  return (
    <AppLayout>
      <Header />
      <ProductListLayout>
        <ProductListTitle />
        <Filter style={{ marginTop: "24px", marginBottom: "28px" }} />
        <ProductList productList={productList} />
      </ProductListLayout>
    </AppLayout>
  );
}

export default App;
