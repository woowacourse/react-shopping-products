import ProductList from "./List";
import * as S from ".//ProductContent.styled";
import Dropdown from "@/components/Dropdown";
import FilterSortControl from "./FilterSortControl";
import { useState } from "react";
import { FilterOption, SortOption } from "./ProductContent.type";

const 장바구니 = [
  {
    id: 5,
    quantity: 1,
    product: {
      id: 62,
      name: "짱구 파자마 세트",
      price: 19940505,
      imageUrl: "https://cdn.finomy.com/news/photo/201806/55827_40819_4617.png",
      category: "패션잡화",
    },
  },
];

const 상품 = [
  {
    id: 61,
    name: "방울토마토",
    price: 50000,
    imageUrl: "https://jjfoodmarket.co.kr/data/shop/item/1671006183_l1",
    category: "식료품",
  },
  {
    id: 62,
    name: "짱구 파자마 세트",
    price: 19940505,
    imageUrl: "https://cdn.finomy.com/news/photo/201806/55827_40819_4617.png",
    category: "패션잡화",
  },
  {
    id: 64,
    name: "앵버 굿즈",
    price: 1000000000,
    imageUrl: "https://cdn.gametoc.co.kr/news/photo/201605/39652_73255_820.JPG",
    category: "패션잡화",
  },
  {
    id: 78,
    name: "달 무드등",
    price: 13500,
    imageUrl:
      "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/794f/cecbea5bdc654a11ae02d28b4d1f4bd2a03a7389eb2b8cc4a45c1c9f7d9b.jpg",
    category: "패션잡화",
  },
  {
    id: 117,
    name: "동물 양말",
    price: 1000000000,
    imageUrl:
      "https://img.ssfshop.com/cmd/LB_750x/src/https://img.ssfshop.com/goods/8SBR/23/06/20/GM0023062061887_0_THNAIL_ORGINL_20230621163142940.jpg",
    category: "패션잡화",
  },
  {
    id: 119,
    name: "플라망고",
    price: 8130,
    imageUrl:
      "https://velog.velcdn.com/images/minsungje/post/f74f79d5-5c51-4bac-97ce-1c2b2764fb80/image.jpg",
    category: "식료품",
  },
  {
    id: 121,
    name: "밍고에게서탈취한키보드",
    price: 5000,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-13%20at%2016.25.19%402x.webp",
    category: "패션잡화",
  },
  {
    id: 122,
    name: "보리쌀",
    price: 10000,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-13%20at%2016.28.12%402x.webp",
    category: "식료품",
  },
];

function ProductContent() {
  const [filterOption, setFilterOption] = useState<FilterOption>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("낮은 가격순");

  const handleFilterSelect = (option: FilterOption) => {
    setFilterOption(option);
  };

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <FilterSortControl
        filterOption={filterOption}
        sortOption={sortOption}
        onFilterChange={handleFilterSelect}
        onSortChange={handleSortSelect}
      />
      <ProductList products={상품} cartItems={장바구니} />
    </S.Container>
  );
}

export default ProductContent;
